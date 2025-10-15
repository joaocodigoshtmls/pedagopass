import { User, RegisterDTO, LoginDTO, AuthResponse } from '../models/User';

class UserService {
  private users: User[] = [];

  public register(userData: RegisterDTO): AuthResponse {
    // Verificar se o email já existe
    if (this.users.some(user => user.email === userData.email)) {
      throw new Error('Email já cadastrado');
    }

    // Criar novo usuário (mock simples - sem hash de senha)
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      passwordHash: userData.password, // Mock: apenas copia a senha sem hash
      school: userData.school,
      subject: userData.subject,
      segment: userData.segment,
      city: userData.city,
      state: userData.state,
      verified: false,
      createdAt: new Date()
    };

    // Salvar no mock
    this.users.push(newUser);

    // Retornar resposta sem o hash da senha
    const { passwordHash, ...userWithoutPassword } = newUser;
    return {
      success: true,
      message: 'Usuário registrado com sucesso',
      user: userWithoutPassword
    };
  }

  public login(loginData: LoginDTO): AuthResponse {
    // Buscar usuário
    const user = this.users.find(u => u.email === loginData.email);

    // Verificar se usuário existe e senha está correta (mock simples)
    if (!user || user.passwordHash !== loginData.password) {
      throw new Error('Email ou senha inválidos');
    }

    // Retornar resposta sem o hash da senha
    const { passwordHash, ...userWithoutPassword } = user;
    return {
      success: true,
      message: 'Login realizado com sucesso',
      user: userWithoutPassword
    };
  }

  public findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  public getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }
}

export default new UserService();
