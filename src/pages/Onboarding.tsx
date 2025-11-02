import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };

  const handleGuest = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-muted flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8 text-center">
        {/* App Title */}
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary to-accent rounded-3xl flex items-center justify-center shadow-mood">
            <span className="text-3xl">🌙</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            MoodMeter
          </h1>
          <p className="text-muted-foreground text-lg">
            Monitorea tu bienestar emocional de forma simple y rápida
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleLogin}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary shadow-soft"
            size="lg"
          >
            Inicio Sesión
          </Button>
          
          <Button
            onClick={handleGuest}
            variant="outline"
            className="w-full h-14 text-lg font-semibold border-2 hover:bg-secondary"
            size="lg"
          >
            Entrar como invitado
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-2 mt-8">
          {["💜", "🌈", "✨"].map((emoji, index) => (
            <div
              key={index}
              className="w-8 h-8 flex items-center justify-center text-xl animate-pulse"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;