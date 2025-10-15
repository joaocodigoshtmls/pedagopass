import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { User, RegisterDTO, LoginDTO, JWTPayload } from '../models/User';

// Armazenamento em memória (mock) - substituir por banco depois
const usersDB: User[] = [];

class AuthService {
  private readonly SALT_ROUNDS = 10;
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'pedagopass-secret-key-change-in-production';
  private readonly JWT_EXPIRES_IN = '7d';

  /**
   * Hash de senha usando bcrypt
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Comparar senha com hash
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Gerar token JWT
   */
  generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN,
    });
  }

  /**
   * Validar token JWT
   */
  validateToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as JWTPayload;
      return decoded;
    } catch (error) {
      console.error('Token inválido:', error);
      return null;
    }
  }

  /**
   * Registrar novo usuário
   */
  async register(data: RegisterDTO): Promise<{ user: Omit<User, 'passwordHash'>; token: string }> {
    // Validações
    if (!data.email || !data.password || !data.name) {
      throw new Error('Nome, e-mail e senha são obrigatórios');
    }

    // Validar formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('E-mail inválido');
    }

    // Validar tamanho mínimo da senha
    if (data.password.length < 6) {
      throw new Error('A senha deve ter no mínimo 6 caracteres');
    }

    // Verificar se usuário já existe
    const existingUser = usersDB.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (existingUser) {
      throw new Error('E-mail já cadastrado');
    }

    // Hash da senha
    const passwordHash = await this.hashPassword(data.password);

    // Criar usuário
    const newUser: User = {
      id: uuidv4(),
      name: data.name,
      email: data.email.toLowerCase(),
      passwordHash,
      avatarUrl: undefined,
      school: data.school,
      subject: data.subject,
      segment: data.segment,
      city: data.city,
      state: data.state,
      bio: undefined,
      verified: false,
      createdAt: new Date(),
    };

    // Salvar no "banco" (memória)
    usersDB.push(newUser);

    // Gerar token
    const token = this.generateToken({
      userId: newUser.id,
      email: newUser.email,
    });

    // Retornar usuário sem o hash da senha
    const { passwordHash: _, ...userWithoutPassword } = newUser;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  /**
   * Login de usuário
   */
  async login(data: LoginDTO): Promise<{ user: Omit<User, 'passwordHash'>; token: string }> {
    // Validações
    if (!data.email || !data.password) {
      throw new Error('E-mail e senha são obrigatórios');
    }

    // Buscar usuário
    const user = usersDB.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await this.comparePassword(data.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar token
    const token = this.generateToken({
      userId: user.id,
      email: user.email,
    });

    // Retornar usuário sem o hash da senha
    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  /**
   * Buscar usuário por ID
   */
  getUserById(userId: string): Omit<User, 'passwordHash'> | null {
    const user = usersDB.find(u => u.id === userId);
    if (!user) {
      return null;
    }

    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Buscar usuário por e-mail
   */
  getUserByEmail(email: string): Omit<User, 'passwordHash'> | null {
    const user = usersDB.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return null;
    }

    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Listar todos os usuários (para debug/admin)
   */
  getAllUsers(): Omit<User, 'passwordHash'>[] {
    return usersDB.map(user => {
      const { passwordHash: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
}

export default new AuthService();
