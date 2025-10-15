import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

class ImageService {
  /**
   * Criar thumbnail de uma imagem
   */
  async createThumbnail(
    imagePath: string,
    width: number = 400,
    height: number = 400
  ): Promise<string> {
    try {
      const ext = path.extname(imagePath);
      const filename = path.basename(imagePath, ext);
      const thumbnailFilename = `${filename}_thumb${ext}`;
      const thumbnailPath = path.join(
        process.cwd(),
        'public',
        'uploads',
        'thumbnails',
        thumbnailFilename
      );

      await sharp(imagePath)
        .resize(width, height, {
          fit: 'cover',
          position: 'center',
        })
        .jpeg({ quality: 80 })
        .toFile(thumbnailPath);

      // Retornar URL relativa
      return `/uploads/thumbnails/${thumbnailFilename}`;
    } catch (error) {
      console.error('Erro ao criar thumbnail:', error);
      throw error;
    }
  }

  /**
   * Otimizar imagem (reduzir tamanho sem perder muita qualidade)
   */
  async optimizeImage(imagePath: string): Promise<void> {
    try {
      const ext = path.extname(imagePath).toLowerCase();
      const tempPath = `${imagePath}.temp`;

      if (ext === '.jpg' || ext === '.jpeg') {
        await sharp(imagePath)
          .jpeg({ quality: 85, progressive: true })
          .toFile(tempPath);
      } else if (ext === '.png') {
        await sharp(imagePath)
          .png({ quality: 85, compressionLevel: 9 })
          .toFile(tempPath);
      } else if (ext === '.webp') {
        await sharp(imagePath)
          .webp({ quality: 85 })
          .toFile(tempPath);
      } else {
        // Não otimizar outros formatos
        return;
      }

      // Substituir arquivo original pelo otimizado
      await fs.unlink(imagePath);
      await fs.rename(tempPath, imagePath);
    } catch (error) {
      console.error('Erro ao otimizar imagem:', error);
      // Tentar limpar arquivo temporário se existir
      try {
        await fs.unlink(`${imagePath}.temp`);
      } catch {}
      throw error;
    }
  }

  /**
   * Obter dimensões da imagem
   */
  async getImageDimensions(imagePath: string): Promise<{ width: number; height: number }> {
    try {
      const metadata = await sharp(imagePath).metadata();
      return {
        width: metadata.width || 0,
        height: metadata.height || 0,
      };
    } catch (error) {
      console.error('Erro ao obter dimensões:', error);
      return { width: 0, height: 0 };
    }
  }

  /**
   * Deletar arquivo
   */
  async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error);
    }
  }

  /**
   * Deletar imagem e seu thumbnail
   */
  async deleteImageWithThumbnail(imageUrl: string): Promise<void> {
    try {
      // Extrair nome do arquivo da URL
      const filename = path.basename(imageUrl);
      const ext = path.extname(filename);
      const basename = path.basename(filename, ext);

      // Deletar imagem original
      const imagePath = path.join(process.cwd(), 'public', imageUrl);
      await this.deleteFile(imagePath);

      // Deletar thumbnail se existir
      const thumbnailPath = path.join(
        process.cwd(),
        'public',
        'uploads',
        'thumbnails',
        `${basename}_thumb${ext}`
      );
      await this.deleteFile(thumbnailPath);
    } catch (error) {
      console.error('Erro ao deletar imagem com thumbnail:', error);
    }
  }
}

export default new ImageService();
