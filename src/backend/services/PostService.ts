import { v4 as uuidv4 } from 'uuid';
import ImageService from './ImageService';
import UserService from './UserService';
import path from 'path';
import {
  Post,
  CreatePostDTO,
  UpdatePostDTO,
  PostFilters,
  Comment,
  Media,
  MediaType,
} from '../../shared/types';

class PostService {
  private posts: Post[] = [];
  private comments: Comment[] = [];
  private userLikes: { [postId: string]: Set<string> } = {};

  constructor() {
    this.initializeMockPosts();
  }

  private initializeMockPosts(): void {
    const post1: Post = {
      id: '1',
      authorId: 'user-1',
      author: {
        id: 'user-1',
        name: 'Prof. Ana Maria',
        verified: true,
      },
      content: 'Acabei de voltar de uma viagem educacional incrível para Paris! Visitamos o Louvre e foi uma experiência transformadora! 🗼✨',
      media: [],
      communityId: undefined,
      destinationId: 'dest-paris',
      tags: ['paris', 'história', 'arte'],
      likesCount: 127,
      commentsCount: 34,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    };

    this.posts = [post1];
  }

  async createPost(
    authorId: string,
    data: CreatePostDTO,
    files?: Express.Multer.File[]
  ): Promise<Post> {
    const postId = uuidv4();
    const media: Media[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const fileUrl = `/uploads/posts/${file.filename}`;
        const filePath = path.join(process.cwd(), 'public', 'uploads', 'posts', file.filename);

        const mediaItem: Media = {
          id: uuidv4(),
          postId,
          type: file.mimetype.startsWith('video/') ? MediaType.VIDEO : MediaType.IMAGE,
          url: fileUrl,
          createdAt: new Date().toISOString(),
        };

        if (mediaItem.type === MediaType.IMAGE) {
          try {
            const thumbnailUrl = await ImageService.createThumbnail(filePath);
            mediaItem.thumbnail = thumbnailUrl;

            const dimensions = await ImageService.getImageDimensions(filePath);
            mediaItem.width = dimensions.width;
            mediaItem.height = dimensions.height;
          } catch (error) {
            console.error('Erro ao processar imagem:', error);
          }
        }

        media.push(mediaItem);
      }
    }

    // Buscar dados reais do autor
    const author = UserService.getUserById(authorId);

    const post: Post = {
      id: postId,
      authorId,
      author: author ? {
        id: author.id,
        name: author.name,
        avatarUrl: author.avatarUrl,
        school: author.school,
        subject: author.subject,
        segment: author.segment,
        verified: author.verified || false,
      } : undefined,
      content: data.content,
      media,
      communityId: data.communityId,
      destinationId: data.destinationId,
      tags: data.tags || [],
      likesCount: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.posts.unshift(post);
    return post;
  }

  async getPosts(filters: PostFilters): Promise<{
    posts: Post[];
    total: number;
    hasMore: boolean;
  }> {
    let filtered = [...this.posts];

    if (filters.communityId) {
      filtered = filtered.filter((p) => p.communityId === filters.communityId);
    }

    if (filters.destinationId) {
      filtered = filtered.filter((p) => p.destinationId === filters.destinationId);
    }

    if (filters.authorId) {
      filtered = filtered.filter((p) => p.authorId === filters.authorId);
    }

    if (filters.tag) {
      filtered = filtered.filter((p) => p.tags.includes(filters.tag!));
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((p) => p.content.toLowerCase().includes(searchLower));
    }

    if (filters.sortBy === 'popular') {
      filtered.sort((a, b) => b.likesCount - a.likesCount);
    } else {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const total = filtered.length;
    const offset = filters.offset || 0;
    const limit = filters.limit || 20;
    const paginated = filtered.slice(offset, offset + limit);
    const hasMore = offset + limit < total;

    return {
      posts: paginated,
      total,
      hasMore,
    };
  }

  async getPostById(postId: string): Promise<Post | null> {
    const post = this.posts.find((p) => p.id === postId);
    return post || null;
  }

  async updatePost(postId: string, authorId: string, data: UpdatePostDTO): Promise<Post | null> {
    const post = this.posts.find((p) => p.id === postId);

    if (!post || post.authorId !== authorId) {
      return null;
    }

    if (data.content !== undefined) {
      post.content = data.content;
    }

    if (data.tags !== undefined) {
      post.tags = data.tags;
    }

    post.updatedAt = new Date().toISOString();
    return post;
  }

  async deletePost(postId: string, authorId: string): Promise<boolean> {
    const index = this.posts.findIndex((p) => p.id === postId);

    if (index === -1) {
      return false;
    }

    const post = this.posts[index];

    if (post.authorId !== authorId) {
      return false;
    }

    if (post.media && post.media.length > 0) {
      for (const media of post.media) {
        const mediaPath = path.join(process.cwd(), 'public', media.url);
        try {
          await ImageService.deleteImageWithThumbnail(mediaPath);
        } catch (error) {
          console.error('Erro ao deletar mídia:', error);
        }
      }
    }

    this.posts.splice(index, 1);
    this.comments = this.comments.filter((c) => c.postId !== postId);
    delete this.userLikes[postId];

    return true;
  }

  async toggleLike(postId: string, userId: string): Promise<{ liked: boolean; likesCount: number }> {
    const post = this.posts.find((p) => p.id === postId);

    if (!post) {
      throw new Error('Post não encontrado');
    }

    if (!this.userLikes[postId]) {
      this.userLikes[postId] = new Set();
    }

    const userLikedPost = this.userLikes[postId].has(userId);

    if (userLikedPost) {
      this.userLikes[postId].delete(userId);
      post.likesCount = Math.max(0, post.likesCount - 1);
    } else {
      this.userLikes[postId].add(userId);
      post.likesCount++;
    }

    return {
      liked: !userLikedPost,
      likesCount: post.likesCount,
    };
  }

  async addComment(postId: string, authorId: string, content: string, parentCommentId?: string): Promise<Comment | null> {
    const post = this.posts.find((p) => p.id === postId);

    if (!post) {
      return null;
    }

    // Buscar dados reais do autor
    const author = UserService.getUserById(authorId);

    const comment: Comment = {
      id: uuidv4(),
      postId,
      authorId,
      author: author ? {
        id: author.id,
        name: author.name,
        avatarUrl: author.avatarUrl,
        school: author.school,
        subject: author.subject,
        segment: author.segment,
        verified: author.verified || false,
      } : undefined,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.comments.push(comment);
    post.commentsCount++;

    return comment;
  }

  async getComments(postId: string): Promise<Comment[]> {
    return this.comments
      .filter((c) => c.postId === postId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async deleteComment(commentId: string, authorId: string): Promise<boolean> {
    const index = this.comments.findIndex((c) => c.id === commentId);

    if (index === -1) {
      return false;
    }

    const comment = this.comments[index];

    if (comment.authorId !== authorId) {
      return false;
    }

    const post = this.posts.find((p) => p.id === comment.postId);
    if (post) {
      post.commentsCount = Math.max(0, post.commentsCount - 1);
    }

    this.comments.splice(index, 1);
    return true;
  }

  hasUserLiked(postId: string, userId: string): boolean {
    return this.userLikes[postId]?.has(userId) || false;
  }
}

export default new PostService();
