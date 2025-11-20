import { BottomNavigation } from "@/components/BottomNavigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Clock, BarChart, Pause, RotateCcw, Send } from "lucide-react"; 
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea"; 

// --- Configuración de Tiempos y Pasos (Mindfulness) ---
const STEP_DURATION_MS = 90000; // 90 segundos

const mindfulnessSteps = [
  { text: "Encuentra una postura cómoda. Cierra suavemente los ojos o baja la mirada. Tómate un momento para simplemente estar aquí." },
  { text: "Lleva tu atención al ancla: tu respiración. Siente el aire entrar y salir por tu abdomen. Siente cada inhalación y cada exhalación, sin intentar cambiarlas." },
  { text: "Si tu mente divaga (pensamientos, planes, recuerdos), obsérvalo sin juicio. Simplemente nombra esa distracción ('pensando') y redirige tu atención suavemente de vuelta a la respiración." },
  { text: "Expande tu atención a las sensaciones de tu cuerpo: el contacto con la silla o el suelo, la temperatura de la piel. Permite que todas las sensaciones existan." },
  { text: "Ahora, escucha. Permite que todos los sonidos a tu alrededor entren en tu conciencia, sin necesidad de nombrarlos o seguirlos. Solo obsérvalos." },
  { text: "A punto de finalizar. Vuelve a enfocar toda tu atención en tu respiración. Tómate tres respiraciones profundas y lentas." },
  { text: "Fin del ejercicio. Mueve suavemente tus dedos de manos y pies. Cuando estés listo, abre los ojos lentamente y lleva esta atención al resto de tu día." }
];

// Placeholders específicos para la Gratitud
const gratitudePlaceholders = [
    "Ej. Una persona a la que aprecies, o alguien que te ayudó hoy.", 
    "Ej. Una pequeña alegría del día, un logro o algo que salió bien.", 
    "Ej. Algo en tu entorno físico (el clima, tu casa, la naturaleza, etc.)."
];

// --- Definiciones de Ejercicio ---
interface Exercise {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: string;
  icon: string;
  description: string;
}

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
  'gratitud-diaria': {
    id: 'gratitud-diaria',
    title: "Gratitud Diaria",
    subtitle: "3 cosas positivas",
    duration: "5 min",
    difficulty: "Fácil",
    icon: "🙏",
    description: "Piensa en tres cosas por las que estás agradecido hoy y anótalas. Esta práctica ayuda a cambiar el foco hacia lo positivo y mejora el estado de ánimo."
  }
};

const ExerciseDetail = () => {
  const params = useParams<{ id?: string; slug?: string }>();
  const key = params.id ?? params.slug ?? "";
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | undefined>();
  const [isStarted, setIsStarted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [remainingTime, setRemainingTime] = useState(STEP_DURATION_MS / 1000); 
  const [stepStartTime, setStepStartTime] = useState(Date.now()); 
  
  // Estado para guardar las 3 entradas de gratitud
  const [gratitudeEntries, setGratitudeEntries] = useState(['', '', '']);


  const isMindfulness = exercise?.id === 'meditacion-mindfulness';
  const isGratitude = exercise?.id === 'gratitud-diaria';
  const isBreathing = exercise?.id === 'respiracion-4-7-8';


  // --- Funciones de Utilidad y Control (Temporizador) ---
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStopExercise = useCallback(() => {
      setIsStarted(false);
      setCurrentStepIndex(0); 
      setRemainingTime(STEP_DURATION_MS / 1000); 
      setStepStartTime(Date.now());
      setGratitudeEntries(['', '', '']); // Reinicia las entradas de gratitud
  }, []);
  
  const advanceStep = useCallback(() => {
    setCurrentStepIndex(prevIndex => {
        if (prevIndex < mindfulnessSteps.length - 1) {
            setRemainingTime(STEP_DURATION_MS / 1000);
            setStepStartTime(Date.now());
            return prevIndex + 1;
        } else {
            handleStopExercise(); 
            return prevIndex;
        }
    });
  }, [handleStopExercise]);

  // --- Funciones de Control (Botones) ---
  
  const handleStartExercise = useCallback(() => {
    if (isMindfulness) {
        setStepStartTime(Date.now() - (STEP_DURATION_MS - remainingTime * 1000));
    }
    setIsStarted(true);
  }, [isMindfulness, remainingTime]);
  
  const handlePauseExercise = useCallback(() => {
    setIsStarted(false);
  }, []);
  
  const handleSaveGratitude = () => {
      // Lógica para guardar gratitudeEntries.
      console.log('Guardando Gratitud:', gratitudeEntries);
      
      alert('¡Gratitud guardada con éxito! ✅');

      // ✅ CAMBIO: Al guardar gratitud, también vamos al home
      handleStopExercise();
      navigate('/home');
  };

  // --- Lógica del Temporizador (Mindfulness) ---
  useEffect(() => {
    let stepTimer: NodeJS.Timeout | undefined;
    let clockTimer: NodeJS.Timeout | undefined;

    if (isStarted && isMindfulness) {
        // Temporizador para la vista (decrementa cada segundo)
        clockTimer = setInterval(() => {
            setRemainingTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        // Temporizador para avanzar de paso
        const elapsedSinceStart = Date.now() - stepStartTime;
        const timeToNextStep = STEP_DURATION_MS - elapsedSinceStart;

        if (timeToNextStep <= 0) {
             advanceStep();
             return; 
        }

        stepTimer = setTimeout(advanceStep, timeToNextStep);
    } 
    
    return () => {
        if (stepTimer) clearTimeout(stepTimer);
        if (clockTimer) clearInterval(clockTimer);
    };
  }, [isStarted, isMindfulness, currentStepIndex, advanceStep, stepStartTime]);


  // --- Inicialización del Componente (Al cargar o cambiar de ejercicio) ---
  useEffect(() => {
    if (key && allExercises[key]) {
      setExercise(allExercises[key]);
      setIsStarted(false); 
      setCurrentStepIndex(0);
      setRemainingTime(STEP_DURATION_MS / 1000);
      setStepStartTime(Date.now());
      setGratitudeEntries(['', '', '']); 
    } else {
      navigate('/404', { replace: true });
    }
  }, [key, navigate]);


  if (!exercise) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background via-secondary/20 to-muted">
        <Card className="p-6 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold">No found</h2>
          <p className="text-sm text-muted-foreground mt-2">
            El ejercicio solicitado no está disponible.
          </p>
          <div className="mt-4">
            <Link to="/ejercicios" className="text-primary underline">
              Volver a la lista de ejercicios
            </Link>
          </div>
        </Card>
        <BottomNavigation />
      </div>
    );
  }

  // Define la ruta a tu GIF.
  const breathingAnimationGif = '/breathing-animation.gif'; 
  
  // --- Lógica de Botón y Contenido Dinámico ---
  let buttonText = "Comenzar Ejercicio";
  let buttonHandler = handleStartExercise;
  let buttonIcon = <Play size={16} className="mr-2" />;

  if (isStarted) {
      if (isGratitude) {
          buttonText = "Guardar Gratitud";
          buttonHandler = handleSaveGratitude;
          buttonIcon = <Send size={16} className="mr-2" />;
      } else { // Mindfulness o Respiración
          buttonText = "Pausar Ejercicio";
          buttonHandler = handlePauseExercise;
          buttonIcon = <Pause size={16} className="mr-2" />;
      }
  }

  const restartIcon = <RotateCcw size={16} className="mr-2" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted pb-20">
      <div className="max-w-md mx-auto p-6 space-y-6">
        <div className="flex items-center space-x-4 pt-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            {exercise.title}
          </h1>
        </div>

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

            {/* Renderizado condicional para la ANIMACIÓN DE RESPIRACIÓN */}
            {isStarted && isBreathing && (
              <div className="mt-6 text-center">
                <h4 className="text-lg font-bold mb-2">¡Sigue la animación!</h4>
                <img 
                  src={breathingAnimationGif} 
                  alt="Animación de Respiración 4-7-8" 
                  className="w-full max-w-xs mx-auto rounded-xl shadow-lg"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Inhala 4 - Sostén 7 - Exhala 8
                </p>
              </div>
            )}
            
            {/* Renderizado condicional para el TEXTO GUIADO DE MINDFULNESS */}
            {isStarted && isMindfulness && (
              <div className="mt-6 text-center p-4 border rounded-xl bg-secondary/20">
                <h4 className="text-xl font-bold mb-3 text-primary">
                    Paso {currentStepIndex + 1} / {mindfulnessSteps.length}
                </h4>
                <p className="text-lg font-semibold text-foreground/95 italic min-h-[100px] flex items-center justify-center">
                  {mindfulnessSteps[currentStepIndex].text}
                </p>
                <div className="mt-4 flex flex-col items-center">
                    <p className="text-2xl font-mono font-bold text-accent">
                        {formatTime(remainingTime)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                        Tiempo restante en este paso
                    </p>
                </div>
              </div>
            )}
            
            {/* Renderizado condicional para el FORMULARIO DE GRATITUD */}
            {isStarted && isGratitude && (
              <div className="mt-6 space-y-4">
                <h4 className="text-xl font-bold text-center text-primary">
                    Escribe 3 cosas por las que estés agradecido hoy.
                </h4>
                
                {gratitudeEntries.map((entry, index) => (
                    <div key={index}>
                        <label htmlFor={`gratitud-${index + 1}`} className="text-sm font-medium block mb-1">
                            Gratitud #{index + 1}
                        </label>
                        <Textarea 
                            id={`gratitud-${index + 1}`}
                      
                            placeholder={gratitudePlaceholders[index]}
                            value={entry}
                            onChange={(e) => {
                                const newEntries = [...gratitudeEntries];
                                newEntries[index] = e.target.value;
                                setGratitudeEntries(newEntries);
                            }}
                            rows={2}
                            className="resize-none"
                        />
                    </div>
                ))}
                <p className="text-xs text-muted-foreground text-center pt-2">
                    Tómate tu tiempo. El ejercicio está diseñado para 5 minutos.
                </p>
              </div>
            )}
            
            {/* Botones de Control */}
            <div className="space-y-3">
                <Button 
                size="lg" 
                className={`w-full text-lg font-bold ${isStarted ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : 'shadow-mood'}`} 
                onClick={buttonHandler}
                >
                {buttonIcon}
                {buttonText}
                </Button>
                
                {/* Botón de Terminar/Reiniciar */}
                {(isStarted || (!isStarted && currentStepIndex > 0)) && (isMindfulness || isBreathing) && (
                    <Button 
                        variant="ghost" 
                        className="w-full text-sm text-muted-foreground"
                        onClick={() => {
                            // ✅ CAMBIO: Si está corriendo, TERMINAR y navegar a HOME
                            if (isStarted) {
                                handleStopExercise();
                                navigate('/home');
                            } else {
                                // Si está pausado o terminado (sin navegar), solo reiniciar
                                handleStopExercise();
                            }
                        }}
                    >
                        {(isMindfulness && !isStarted) ? <RotateCcw size={16} className="mr-2" /> : null}
                        {isStarted ? "Terminar Ejercicio" : "Reiniciar Meditación"}
                    </Button>
                )}
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ExerciseDetail;