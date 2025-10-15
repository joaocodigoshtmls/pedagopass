export interface Post {
  id: string;
  userId: string;
  author: string;
  title: string;
  content: string;
  images?: string[];
  location: string;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}
