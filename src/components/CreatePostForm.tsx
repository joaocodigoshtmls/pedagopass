/**
 * Componente CreatePostForm - Formulário para criar novos posts
 */
import { useState, useRef } from 'react';
import { useCreatePost } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';

export default function CreatePostForm() {
  const { user } = useAuth();
  const createPost = useCreatePost();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    // Limitar a 5 arquivos
    if (files.length + selectedFiles.length > 5) {
      alert('Máximo de 5 arquivos permitidos');
      return;
    }

    setFiles((prev) => [...prev, ...selectedFiles]);

    // Criar previews
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('Por favor, escreva algo no post');
      return;
    }

    try {
      await createPost.mutateAsync({
        postData: {
          content: content.trim(),
          tags,
        },
        files,
      });

      // Limpar formulário
      setContent('');
      setTags([]);
      setFiles([]);
      setPreviews([]);
      
      alert('Post criado com sucesso! ');
    } catch (error) {
      console.error('Erro ao criar post:', error);
      alert('Erro ao criar post. Tente novamente.');
    }
  };

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
        <p className="text-gray-600">
          <a href="/login" className="text-blue-600 hover:underline">
            Faça login
          </a>{' '}
          para criar posts
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <form onSubmit={handleSubmit}>
        {/* Área de Texto */}
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
            {user.name?.charAt(0) || 'U'}
          </div>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="No que você está pensando?"
            className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
        </div>

        {/* Preview de Imagens */}
        {previews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="Adicionar tag (pressione Enter)"
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
            >
              Adicionar
            </button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center space-x-2"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center space-x-4">
            {/* Botão de Upload */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={files.length >= 5}
            >
              <span className="text-xl">📷</span>
              <span className="text-sm font-medium">Foto/Vídeo</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <span className="text-sm text-gray-500">
              {files.length}/5 arquivos
            </span>
          </div>

          {/* Botão Publicar */}
          <button
            type="submit"
            disabled={!content.trim() || createPost.isPending}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              !content.trim() || createPost.isPending
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {createPost.isPending ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </form>
    </div>
  );
}
