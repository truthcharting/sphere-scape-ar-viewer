import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Camera, Upload, RotateCcw } from 'lucide-react';

interface ARControlsProps {
  isARMode: boolean;
  onToggleAR: () => void;
  onPhotoUpload: (file: File) => void;
  onReset: () => void;
}

export function ARControls({ isARMode, onToggleAR, onPhotoUpload, onReset }: ARControlsProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onPhotoUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onPhotoUpload(file);
    }
  };

  return (
    <Card className="absolute top-4 right-4 p-4 bg-card/80 backdrop-blur-md border-cosmic-cyan/20 shadow-cosmic">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-cosmic-cyan" />
          <span className="text-sm font-medium text-cosmic-white">AR Controls</span>
        </div>
        
        <Button
          variant={isARMode ? "ar" : "glow"}
          size="sm"
          onClick={onToggleAR}
          className="w-full"
        >
          {isARMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {isARMode ? 'Exit AR' : 'Enter AR'}
        </Button>

        <div
          className={`border-2 border-dashed rounded-lg p-3 transition-colors ${
            isDragging 
              ? 'border-cosmic-cyan bg-cosmic-cyan/10' 
              : 'border-cosmic-purple/50 hover:border-cosmic-cyan/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="photo-upload"
          />
          <label 
            htmlFor="photo-upload" 
            className="cursor-pointer flex flex-col items-center gap-1 text-xs text-cosmic-white/70 hover:text-cosmic-cyan transition-colors"
          >
            <Upload className="h-4 w-4" />
            Drop photo or click
          </label>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="w-full text-cosmic-white/70 hover:text-cosmic-cyan"
        >
          <RotateCcw className="h-4 w-4" />
          Reset View
        </Button>
      </div>
    </Card>
  );
}