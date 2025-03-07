
import React, { useCallback } from 'react';
import { Upload, File, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  image: string | null;
  setImage: (image: string | null) => void;
  maxSizeMB?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  image, 
  setImage, 
  maxSizeMB = 5 
}) => {
  const { toast } = useToast();
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);
  
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG or PNG image",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > maxSizeBytes) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSizeMB}MB`,
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div className="w-full">
      {!image ? (
        <div
          className="border-2 border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:border-primary/30 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <input
            id="file-upload"
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={handleFileInput}
          />
          <Upload className="h-10 w-10 text-primary/60 mb-3" />
          <p className="text-center font-medium">Drag & drop or click to upload</p>
          <p className="text-xs text-muted-foreground mt-1">JPG, PNG (max {maxSizeMB}MB)</p>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-white/10">
          <img
            src={image}
            alt="Chart preview"
            className="w-full h-auto object-contain max-h-[300px]"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-black/70 rounded-full p-1 hover:bg-black/90 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
