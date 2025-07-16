import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { Mesh, BackSide } from 'three';
import { useTexture } from '@react-three/drei';

interface PhotosphereViewerProps {
  imageUrl: string;
  isAR?: boolean;
}

function PhotosphereMesh({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(imageUrl);

  return (
    <Sphere ref={meshRef} args={[500, 60, 40]}>
      <meshBasicMaterial map={texture} side={BackSide} />
    </Sphere>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-cosmic-cyan animate-pulse text-lg">
        Loading immersive experience...
      </div>
    </div>
  );
}

export function PhotosphereViewer({ imageUrl, isAR = false }: PhotosphereViewerProps) {
  return (
    <div className={`w-full h-full ${isAR ? 'opacity-90' : ''}`}>
      <Canvas
        camera={{ position: [0, 0, 0.1], fov: 75 }}
        gl={{ antialias: true, alpha: isAR }}
        style={{ background: isAR ? 'transparent' : '#0f1419' }}
      >
        <Suspense fallback={null}>
          <PhotosphereMesh imageUrl={imageUrl} />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={-0.5}
            minDistance={0.1}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
      {!isAR && (
        <div className="absolute top-4 left-4 text-cosmic-cyan text-sm opacity-70">
          Drag to explore • Scroll to zoom
        </div>
      )}
    </div>
  );
}