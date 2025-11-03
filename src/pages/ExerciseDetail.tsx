import { BottomNavigation } from "@/components/BottomNavigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Clock, BarChart } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Tipo para la información del ejercicio (puedes moverlo a un archivo .types.ts luego)
interface Exercise {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: string;
  icon: string;
  description: string;
}

// Mock DB de ejercicios. En una app real, esto vendría de una API.
// Nos basamos en los datos de tu archivo Exercises.tsx
const allExercises: Record<string, Exercise> = {
  'respiracion-4-7-8': {
    id: 'respiracion-4-7-8',
    title: "Respiración 4-7-8",
    subtitle: "Técnica de relajación profunda",
    duration: "8 min",
    difficulty: "Fácil",
    icon: "🌬️",
    description: "La respiración 4-7-8 es una técnica simple que puede ayudar a reducir la ansiedad y a conciliar el sueño. Inhala durante 4 segundos, sostén la respiración durante 7 y exhala durante 8."
  },
  'meditacion-mindfulness': {
    id: 'meditacion-mindfulness',
    title: "Meditación Mindfulness",
    subtitle: "Atención plena",
    duration: "10 min",
    difficulty: "Principiante",
    icon: "🧘‍♀️",
    description: "Centra tu atención en el presente. Observa tus pensamientos y sensaciones sin juzgarlos. Esta práctica te ayudará a reducir el estrés y aumentar tu autoconciencia."
  },
  'reflexion-rapida': {
    id: 'reflexion-rapida',
    title: "Reflexión Rápida",
    subtitle: "Expresa tus pensamientos",
    duration: "5 min",
    difficulty: "Fácil",
    icon: "📝",
    description: "Tómate 5 minutos para escribir libremente sobre cómo te sientes. No te preocupes por la gramática o la estructura, solo deja fluir tus pensamientos."
  },
  // ... (puedes agregar el resto de ejercicios de Exercises.tsx aquí)
};

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>(); // Obtiene el :id de la URL
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | undefined>();

  useEffect(() => {
    if (id && allExercises[id]) {
      setExercise(allExercises[id]);
    } else {
      // Opcional: navegar a 404 si el ID no existe
      // navigate('/404'); 
      // Por ahora, usamos un fallback
      setExercise(allExercises['respiracion-4-7-8']);
    }
  }, [id, navigate]);

  if (!exercise) {
    return <div>Cargando...</div>; // O un componente Skeleton
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted pb-20">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header con botón de volver */}
        <div className="flex items-center space-x-4 pt-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            {exercise.title}
          </h1>
        </div>

        {/* Tarjeta principal del ejercicio */}
        <Card className="p-6 bg-card shadow-soft">
          <CardHeader className="p-0 text-center space-y-4">
            <div className="text-6xl">{exercise.icon}</div>
            <div className="space-y-1">
              <CardTitle className="text-xl">{exercise.title}</CardTitle>
              <CardDescription>{exercise.subtitle}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0 mt-6 space-y-6">
            <div className="flex items-center justify-around text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span className="font-semibold">{exercise.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart size={16} />
                <span className="font-semibold">{exercise.difficulty}</span>
              </div>
            </div>
            
            <p className="text-center text-foreground/90">
              {exercise.description}
            </p>
            
            <Button size="lg" className="w-full text-lg font-bold shadow-mood">
              <Play size={16} className="mr-2" />
              Comenzar Ejercicio
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ExerciseDetail;