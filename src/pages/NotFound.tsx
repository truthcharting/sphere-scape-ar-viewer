import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-cosmic">
      <div className="text-center space-y-6 max-w-md mx-auto p-8">
        <div className="space-y-4">
          <div className="text-8xl font-bold bg-gradient-nebula bg-clip-text text-transparent">
            404
          </div>
          <h1 className="text-2xl font-bold text-cosmic-white">
            Lost in Space
          </h1>
          <p className="text-cosmic-white/70">
            The photosphere you're looking for has drifted into the void.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="ar">
            <Link to="/">
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </Button>
          <Button variant="glow" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
