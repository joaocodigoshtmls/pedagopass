// Serviço para interagir com a API de Posts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

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

export interface CreatePostData {
  title: string;
  content: string;
  location: string;
  images?: string[];
}

// Interface para resposta da API
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  total?: number;
}

// Buscar todos os posts do feed
export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Post[]> = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || 'Erro ao buscar posts');
    }
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
}

// Buscar post por ID
export async function getPostById(id: string): Promise<Post> {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Post> = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || 'Erro ao buscar post');
    }
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    throw error;
  }
}

// Criar novo post
export async function createPost(postData: CreatePostData): Promise<Post> {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Post> = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || 'Erro ao criar post');
    }
  } catch (error) {
    console.error('Erro ao criar post:', error);
    throw error;
  }
}

// Curtir/descurtir post
export async function toggleLikePost(postId: string): Promise<{ liked: boolean; likesCount: number }> {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/posts/${postId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<{ liked: boolean; likesCount: number }> = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || 'Erro ao curtir post');
    }
  } catch (error) {
    console.error('Erro ao curtir post:', error);
    throw error;
  }
}

// Buscar posts por usuário
export async function getPostsByUser(userId: string): Promise<Post[]> {
  try {
    const response = await fetch(`${API_URL}/posts/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Post[]> = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || 'Erro ao buscar posts do usuário');
    }
  } catch (error) {
    console.error('Erro ao buscar posts do usuário:', error);
    throw error;
  }
}
