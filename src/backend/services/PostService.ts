import { Post } from '../models/Post';
import { v4 as uuidv4 } from 'uuid';

export interface CreatePostData {
  title: string;
  content: string;
  location: string;
  images?: string[];
  userId: string;
}

export class PostService {
  private posts: Post[] = [
    {
      id: '1',
      userId: 'user-1',
      author: 'Prof. Ana Maria',
      title: 'Viagem incrível para Paris!',
      content: 'Acabei de voltar de uma viagem educacional amazing para Paris. Visitamos o Louvre e foi uma experiência transformadora para minha prática pedagógica!',
      images: ['https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=400'],
      location: 'Paris, França',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 dias atrás
      likes: 24,
      comments: 8,
      isLiked: false
    },
    {
      id: '2',
      userId: 'user-2',
      author: 'Prof. Carlos Silva',
      title: 'Museus de História em Roma',
      content: 'Compartilhando algumas dicas de museus imperdíveis em Roma para professores de História. A experiência no Coliseu foi inesquecível!',
      images: ['https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg?auto=compress&cs=tinysrgb&w=400'],
      location: 'Roma, Itália',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 dias atrás
      likes: 31,
      comments: 12,
      isLiked: false
    },
    {
      id: '3',
      userId: 'user-3',
      author: 'Profa. Mariana Costa',
      title: 'Intercâmbio Cultural no Japão',
      content: 'Que experiência única! Participar do programa de intercâmbio no Japão abriu minha mente para novas metodologias de ensino.',
      images: [],
      location: 'Tóquio, Japão',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 semana atrás
      likes: 45,
      comments: 15,
      isLiked: false
    }
  ];

  // Simular storage de likes por usuário
  private userLikes: { [postId: string]: string[] } = {
    '1': [],
    '2': [],
    '3': []
  };

  async getAllPosts(): Promise<Post[]> {
    // Ordenar por data de criação (mais recentes primeiro)
    return this.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getPostById(id: string): Promise<Post | null> {
    const post = this.posts.find(p => p.id === id);
    return post || null;
  }

  async createPost(postData: CreatePostData): Promise<Post> {
    const newPost: Post = {
      id: uuidv4(),
      userId: postData.userId,
      author: 'Você', // Em produção, buscar nome do usuário
      title: postData.title,
      content: postData.content,
      images: postData.images || [],
      location: postData.location,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      isLiked: false
    };

    this.posts.unshift(newPost); // Adicionar no início da lista
    this.userLikes[newPost.id] = []; // Inicializar array de likes
    
    return newPost;
  }

  async toggleLikePost(postId: string, userId: string): Promise<{ liked: boolean; likesCount: number }> {
    const post = this.posts.find(p => p.id === postId);
    if (!post) {
      throw new Error('Post não encontrado');
    }

    if (!this.userLikes[postId]) {
      this.userLikes[postId] = [];
    }

    const userLikedPost = this.userLikes[postId].includes(userId);
    
    if (userLikedPost) {
      // Remover like
      this.userLikes[postId] = this.userLikes[postId].filter(id => id !== userId);
      post.likes = Math.max(0, post.likes - 1);
      post.isLiked = false;
    } else {
      // Adicionar like
      this.userLikes[postId].push(userId);
      post.likes += 1;
      post.isLiked = true;
    }

    return {
      liked: !userLikedPost,
      likesCount: post.likes
    };
  }

  async getPostsByUser(userId: string): Promise<Post[]> {
    return this.posts
      .filter(post => post.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}