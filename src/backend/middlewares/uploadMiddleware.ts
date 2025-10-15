import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    // Determinar pasta baseado no tipo de upload
    const uploadType = req.path.includes('avatar') ? 'avatars' : 'posts';
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', uploadType);
    cb(null, uploadPath);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // Gerar nome único: uuid + extensão original
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  },
});

// Filtro de tipos de arquivo
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Tipos permitidos
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/quicktime',
    'video/webm',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Tipo de arquivo não permitido: ${file.mimetype}`));
  }
};

// Configuração do multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max por arquivo
    files: 5, // máximo 5 arquivos por vez
  },
});

// Middleware para upload de múltiplas imagens (posts)
export const uploadPostMedia = upload.array('media', 5);

// Middleware para upload de avatar (single)
export const uploadAvatar = upload.single('avatar');

// Middleware para processar erro de upload
export const handleUploadError = (error: any, req: Request, res: any, next: any) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Arquivo muito grande. Máximo 50MB por arquivo.',
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Máximo 5 arquivos por upload.',
      });
    }
    return res.status(400).json({
      success: false,
      message: `Erro no upload: ${error.message}`,
    });
  }

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Erro ao fazer upload',
    });
  }

  next();
};
