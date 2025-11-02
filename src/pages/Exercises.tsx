import { BottomNavigation } from "@/components/BottomNavigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Heart, Zap } from "lucide-react";

const Exercises = () => {
  const featuredExercise = {
    title: "Respiración 4-7-8",
    subtitle: "Técnica de relajación profunda",
    duration: "8 min",
    difficulty: "Fácil",
    icon: "🌬️"
  };

  const exercises = [
    {
      title: "Meditación Mindfulness",
      subtitle: "Atención plena",
      duration: "10 min",
      difficulty: "Principiante",
      icon: "🧘‍♀️",
      category: "Meditación"
    },
    {
      title: "Gratitud Diaria",
      subtitle: "3 cosas positivas",
      duration: "5 min",
      difficulty: "Fácil",
      icon: "🙏",
      category: "Gratitud"
    },
    {
      title: "Visualización Guiada",
      subtitle: "Lugar seguro",
      duration: "12 min",
      difficulty: "Intermedio",
      icon: "🌈",
      category: "Visualización"
    },
    {
      title: "Relajación Muscular",
      subtitle: "Tensión y relajación",
      duration: "15 min",
      difficulty: "Fácil",
      icon: "💪",
      category: "Relajación"
    },
    {
      title: "Afirmaciones Positivas",
      subtitle: "Refuerza tu autoestima",
      duration: "7 min",
      difficulty: "Principiante",
      icon: "✨",
      category: "Afirmaciones"
    },
    {
      title: "Caminata Consciente",
      subtitle: "Movimiento mindful",
      duration: "20 min",
      difficulty: "Fácil",
      icon: "🚶‍♀️",
      category: "Movimiento"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-mood-happy/20 text-mood-happy";
      case "Principiante": return "bg-mood-calm/20 text-mood-calm";
      case "Intermedio": return "bg-primary/20 text-primary";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted pb-20">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Bienestar Emocional
          </h1>
          <p className="text-muted-foreground">
            Ejercicios para nutrir tu mente y alma
          </p>
        </div>

        {/* Featured Exercise */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-mood-calm/10 border-primary/30 shadow-mood">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">{featuredExercise.icon}</div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {featuredExercise.title}
                </h3>
                <p className="text-muted-foreground">
                  {featuredExercise.subtitle}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>{featuredExercise.duration}</span>
                  </div>
                  <Badge className={getDifficultyColor(featuredExercise.difficulty)}>
                    {featuredExercise.difficulty}
                  </Badge>
                </div>
                
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-soft cursor-pointer hover:scale-105 transition-transform">
                  <Play size={16} className="text-primary-foreground ml-1" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Todos los Ejercicios
          </h3>
          
          <div className="grid gap-4">
            {exercises.map((exercise, index) => (
              <Card 
                key={index} 
                className="p-4 hover:shadow-mood transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl group-hover:scale-110 transition-transform">
                    {exercise.icon}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">
                        {exercise.title}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {exercise.category === "Meditación" && <Heart size={14} className="text-mood-calm" />}
                        {exercise.category === "Gratitud" && <Zap size={14} className="text-mood-happy" />}
                        {(exercise.category === "Visualización" || exercise.category === "Afirmaciones") && <Heart size={14} className="text-primary" />}
                        {(exercise.category === "Relajación" || exercise.category === "Movimiento") && <Zap size={14} className="text-accent" />}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {exercise.subtitle}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock size={12} />
                          <span>{exercise.duration}</span>
                        </div>
                        <Badge 
                          className={getDifficultyColor(exercise.difficulty)}
                        >
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      
                      <Badge variant="outline" className="text-xs">
                        {exercise.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Exercises;