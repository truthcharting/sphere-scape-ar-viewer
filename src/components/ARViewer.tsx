import { useState, useCallback } from 'react';
import { PhotosphereViewer } from './PhotosphereViewer';
import { ARControls } from './ARControls';
import { PhotoGallery } from './PhotoGallery';
import { useToast } from '@/hooks/use-toast';
import samplePhotosphere from '@/assets/sample-photosphere.jpg';

interface Photo {
  id: string;
  url: string;
  name: string;
  type: '360' | 'panorama';
}

export function ARViewer() {
  const [isARMode, setIsARMode] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo>({
    id: '1',
    url: samplePhotosphere,
    name: 'Space Station Interior',
    type: '360'
  });
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { toast } = useToast();

  const handleToggleAR = useCallback(() => {
    setIsARMode(prev => !prev);
    toast({
      title: isARMode ? "AR Mode Disabled" : "AR Mode Enabled",
      description: isARMode 
        ? "Switched back to standard viewing mode" 
        : "Experience your photosphere in augmented reality",
    });
  }, [isARMode, toast]);

  const handlePhotoUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const newPhoto: Photo = {
      id: Date.now().toString(),
      url,
      name: file.name,
      type: '360'
    };
    
    setPhotos(prev => [newPhoto, ...prev]);
    setCurrentPhoto(newPhoto);
    
    toast({
      title: "Photo uploaded successfully",
      description: `${file.name} is ready for viewing`,
    });
  }, [toast]);

  const handleSelectPhoto = useCallback((photo: Photo) => {
    setCurrentPhoto(photo);
    toast({
      title: "Photo selected",
      description: `Now viewing: ${photo.name}`,
    });
  }, [toast]);

  const handleReset = useCallback(() => {
    setCurrentPhoto({
      id: '1',
      url: samplePhotosphere,
      name: 'Space Station Interior',
      type: '360'
    });
    setIsARMode(false);
    toast({
      title: "View reset",
      description: "Returned to default photosphere",
    });
  }, [toast]);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gradient-cosmic">
      {/* Background stars effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(193 76% 50% / 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, hsl(271 76% 53% / 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, hsl(315 72% 63% / 0.05) 0%, transparent 50%)`
        }} />
      </div>

      {/* Main photosphere viewer */}
      <div className="absolute inset-0">
        <PhotosphereViewer 
          imageUrl={currentPhoto.url} 
          isAR={isARMode}
        />
      </div>

      {/* AR overlay effects */}
      {isARMode && (
        <div className="absolute inset-0 pointer-events-none">
          {/* AR grid overlay */}
          <div className="w-full h-full opacity-20" style={{
            backgroundImage: `linear-gradient(hsl(193 76% 50% / 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(193 76% 50% / 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
          
          {/* AR corner indicators */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cosmic-cyan" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cosmic-cyan" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cosmic-cyan" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cosmic-cyan" />
          
          {/* AR center crosshair */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 border border-cosmic-cyan rounded-full animate-pulse" />
          </div>
        </div>
      )}

      {/* Controls */}
      <ARControls
        isARMode={isARMode}
        onToggleAR={handleToggleAR}
        onPhotoUpload={handlePhotoUpload}
        onReset={handleReset}
      />

      {/* Photo gallery */}
      <PhotoGallery
        photos={photos}
        onSelectPhoto={handleSelectPhoto}
        selectedPhoto={currentPhoto}
      />

      {/* App title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-card/80 backdrop-blur-md px-4 py-2 rounded-full border border-cosmic-cyan/20 shadow-cosmic">
          <h1 className="text-lg font-bold bg-gradient-nebula bg-clip-text text-transparent">
            AR Photosphere Viewer
          </h1>
        </div>
      </div>
    </div>
  );
}