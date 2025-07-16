import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Image as ImageIcon } from 'lucide-react';
import samplePhotosphere from '@/assets/sample-photosphere.jpg';

interface Photo {
  id: string;
  url: string;
  name: string;
  type: '360' | 'panorama';
}

interface PhotoGalleryProps {
  photos: Photo[];
  onSelectPhoto: (photo: Photo) => void;
  selectedPhoto?: Photo;
}

const defaultPhotos: Photo[] = [
  {
    id: '1',
    url: samplePhotosphere,
    name: 'Space Station Interior',
    type: '360'
  },
  {
    id: '2', 
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    name: 'Mountain Panorama',
    type: 'panorama'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=800&h=400&fit=crop', 
    name: 'Ocean Sunset',
    type: '360'
  }
];

export function PhotoGallery({ photos = defaultPhotos, onSelectPhoto, selectedPhoto }: PhotoGalleryProps) {
  return (
    <Card className="absolute bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-80 p-4 bg-card/90 backdrop-blur-md border-cosmic-cyan/20 shadow-cosmic">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-cosmic-cyan" />
          <span className="text-sm font-medium text-cosmic-white">Photo Gallery</span>
          <Badge variant="secondary" className="ml-auto text-xs">
            {photos.length} items
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2 max-h-48 overflow-y-auto">
          {photos.map((photo) => (
            <Card
              key={photo.id}
              className={`p-2 cursor-pointer transition-all hover:scale-105 border ${
                selectedPhoto?.id === photo.id
                  ? 'border-cosmic-cyan shadow-glow-primary bg-cosmic-cyan/10'
                  : 'border-cosmic-purple/30 hover:border-cosmic-cyan/50'
              }`}
              onClick={() => onSelectPhoto(photo)}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg bg-cover bg-center relative overflow-hidden"
                  style={{ backgroundImage: `url(${photo.url})` }}
                >
                  <div className="absolute inset-0 bg-gradient-cosmic/20" />
                  <Play className="absolute inset-0 m-auto h-4 w-4 text-white opacity-80" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-cosmic-white truncate">
                    {photo.name}
                  </p>
                  <Badge 
                    variant={photo.type === '360' ? 'default' : 'secondary'} 
                    className="text-xs mt-1"
                  >
                    {photo.type === '360' ? '360°' : 'Panorama'}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}