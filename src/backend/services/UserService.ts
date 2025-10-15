import { User, UserDTO, LoginDTO, AuthResponse } from '../models/User';

class UserService {
  private users: User[] = [];

  public register(userData: UserDTO): AuthResponse {
    // Verificar se o email já existe
    if (this.users.some(user => user.email === userData.email)) {
      throw new Error('Email já cadastrado');
    }

    // Criar novo usuário
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9), // ID aleatório simples
      ...userData,
      createdAt: new Date()
    };

    // Salvar no mock
    this.users.push(newUser);

    // Gerar token mock
    const token = Buffer.from(newUser.email).toString('base64');

    // Retornar resposta sem a senha
    const { password, ...userWithoutPassword } = newUser;
    return {
      token,
      user: userWithoutPassword
    };
  }

  public login(loginData: LoginDTO): AuthResponse {
    // Buscar usuário
    const user = this.users.find(u => u.email === loginData.email);

    // Verificar se usuário existe e senha está correta
    if (!user || user.password !== loginData.password) {
      throw new Error('Email ou senha inválidos');
    }

    // Gerar token mock
    const token = Buffer.from(user.email).toString('base64');

    // Retornar resposta sem a senha
    const { password, ...userWithoutPassword } = user;
    return {
      token,
      user: userWithoutPassword
    };
  }

  public findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }
}

export default new UserService();
