import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve(__dirname, '..', 'data', 'suggestions.json');

class SuggestionsController {
  public static async create(req: Request, res: Response) {
    try {
      const { name, email, message } = req.body;

      // Validação simples
      const errors: Record<string, string> = {};

      if (!message || typeof message !== 'string' || message.trim().length < 10) {
        errors.message = 'A mensagem é obrigatória e deve ter ao menos 10 caracteres.';
      } else if (message.trim().length > 2000) {
        errors.message = 'A mensagem pode ter no máximo 2000 caracteres.';
      }

      if (name && typeof name === 'string' && name.trim().length > 100) {
        errors.name = 'O nome pode ter no máximo 100 caracteres.';
      }

      if (email && typeof email === 'string') {
        if (email.trim().length > 200) {
          errors.email = 'O e-mail pode ter no máximo 200 caracteres.';
        } else {
          // simple email regex
          const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
          if (!re.test(email.trim())) {
            errors.email = 'Formato de e-mail inválido.';
          }
        }
      }

      if (Object.keys(errors).length > 0) {
        return res.status(400).json({ message: 'Erro de validação', errors });
      }

      // Ler arquivo existente
      let suggestions: Array<any> = [];
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        suggestions = raw ? JSON.parse(raw) : [];
      }

      const newItem = {
        id: Date.now(),
        name: name || 'Anônimo',
        email: email || null,
        message: message.trim(),
        createdAt: new Date().toISOString()
      };

      suggestions.push(newItem);

      fs.writeFileSync(DATA_FILE, JSON.stringify(suggestions, null, 2), 'utf-8');

      console.log('📝 Nova sugestão recebida:', newItem);

      return res.status(201).json({ message: 'Sugestão recebida', suggestion: newItem });
    } catch (err) {
      console.error('Erro ao salvar sugestão:', err);
      return res.status(500).json({ message: 'Erro ao salvar sugestão' });
    }
  }

  public static async list(req: Request, res: Response) {
    try {
      const adminToken = process.env.ADMIN_TOKEN || 'dev-token';
      const provided = req.header('x-admin-token');

      if (!provided || provided !== adminToken) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      let suggestions: Array<any> = [];
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        suggestions = raw ? JSON.parse(raw) : [];
      }

      return res.json({ suggestions });
    } catch (err) {
      console.error('Erro ao listar sugestões:', err);
      return res.status(500).json({ message: 'Erro interno' });
    }
  }
}

export default SuggestionsController;
