// src/pages/checkin/SleepStep.tsx

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider"; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";

// Mapeo de valores del Slider (0-4) a categorías de sueño
const sleepCategories = [
    { value: 0, label: "Pésima", range: "<3 horas", emoji: "😵" }, // Índice 0
    { value: 1, label: "Mala", range: "3-4 horas", emoji: "😞" },
    { value: 2, label: "Regular", range: "5 horas", emoji: "😐" },
    { value: 3, label: "Buena", range: "6-7 horas", emoji: "😊" },
    { value: 4, label: "Excelente", range: "7-9 horas", emoji: "🤩" }, // Índice 4
];

const SleepStep = () => {
  const navigate = useNavigate();
  const [sleepIndex, setSleepIndex] = useState<number>(4); 
  const currentSleep = sleepCategories[sleepIndex];

  const handleContinue = () => {
    localStorage.setItem('checkinSleepQuality', currentSleep.label);
    navigate('/checkin/journal');
  };

  const handleBack = () => {
    navigate('/checkin/mood');
  };

  // Sincronizado con el width: 400px del index.css.
  const visualHeight = 400; 
  // Altura del contenedor para que ocupe una gran parte de la vista (550px).
  // 400px de recorrido + 150px para márgenes y espacio
  const containerHeight = 500; 

  // Margen superior e inferior. (15% para que 'Excellent' y 'Worst' estén más cerca de los bordes).
  const verticalMarginPercent = 5; 
  const activeRangePercent = 100 - 2 * verticalMarginPercent; // 70%

  // Función para obtener la posición vertical (en %) de un índice
  const getTopPosition = (index: number) => {
    const maxIndex = sleepCategories.length - 1;
    // La fórmula usa el 70% central del espacio.
    const invertedIndex = maxIndex - index;
    // Excelente (4) = 15%, Worst (0) = 85%
    return (invertedIndex / maxIndex) * activeRangePercent + verticalMarginPercent;
  };

  // Calcular la posición Y exacta del centro del label "Worst" (índice 0)
  // El label "Worst" está en el (100% - 15%) = 85% de la altura.
  const topWorstPercent = 100 - verticalMarginPercent; // 85%
  // Posición Y de Worst en píxeles. 85% de 550px = 467.5px
  const topWorstInPixels = (topWorstPercent / 100) * containerHeight; 
  
  // Posición final para el 'top' del Slider rotado.
  const sliderTopPosition = topWorstInPixels;


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
      <div className="max-w-md mx-auto p-6 space-y-8 pb-32">
        
        {/* Header y Pregunta */}
        <div className="text-center space-y-6 pt-12">
            <h1 className="text-2xl font-bold text-foreground">
              Check-in Diario
            </h1>
            <p className="text-muted-foreground">Paso 2 de 3</p>
            <h2 className="text-xl font-semibold text-foreground">
              ¿Cómo calificarías tu calidad de sueño?
            </h2>
        </div>

        {/* --- CONTENEDOR PRINCIPAL: ALINEACIÓN VERTICAL --- */}
        <div className="flex justify-center relative" style={{ height: `${containerHeight}px` }}>
          <div className="flex w-full max-w-sm h-full relative justify-between">
            {/* 1. Columna de Etiquetas (Texto y Horas) */}
            <div className="flex-1 h-full relative"> 
              {sleepCategories.map((cat, index) => (
                <div 
                  key={cat.value}
                  className="absolute text-right w-full pr-1"
                  style={{ top: `${getTopPosition(index)}%`, transform: 'translateY(-50%)' }} 
                >
                  <p className="text-lg font-semibold text-foreground leading-none">{cat.label}</p>
                  <span className="text-sm font-normal text-muted-foreground">{cat.range}</span>
                </div>
            ))}
          </div>

          {/* 2. Contenedor para el Slider Termómetro (CENTRO) */}
          <div className="w-8 h-full relative mx-4"> 
            <Slider
              orientation="vertical"
              className="h-full" 
              defaultValue={[sleepCategories.length-1]} 
              max={sleepCategories.length - 1} 
              min={0} 
              step={1} 
              onValueChange={(value) => setSleepIndex(value[0])} 
            />
          </div>

          {/* 3. Columna de Emojis */}
          <div className="flex-1 h-full relative text-left"> 
            {sleepCategories.map((cat, index) => (
              <span 
                key={cat.value}
                role="img" 
                className="text-3xl absolute"
                style={{ top: `${getTopPosition(index)}%`, transform: 'translateY(-50%)' }}
              >
                {cat.emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
          
      {/* Valor Seleccionado y Estado */}
      <div className="mt-8 text-center">
        <h3 className="text-3xl font-extrabold text-primary">
          {currentSleep.range}
        </h3>
        <p className="text-lg text-muted-foreground mt-2">
          (Calidad: {currentSleep.label})
        </p>
      </div>
      
      {/* Progress Indicator */}
      <div className="flex gap-2 justify-center mt-8">
        <div className="w-12 h-2 bg-primary rounded-full"></div>
        <div className="w-12 h-2 bg-primary rounded-full"></div>
        <div className="w-12 h-2 bg-muted rounded-full"></div>
      </div>          

      {/* Footer de navegación: centrar y limitar ancho igual que JournalStep */}
      
          <div className="flex space-x-4 pt-8">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 h-14 text-lg font-semibold"
                size="lg"
              >
              <ChevronLeft className="mr-2" size={20} />
                Atrás
              </Button>

              <Button
                onClick={handleContinue}
                className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary-hover shadow-soft"
                size="lg"
              >
              <Check className="mr-2" size={20} />
                Continuar
              </Button>
              </div>
            </div>
        <BottomNavigation todayCheckinCompleted={false} />     
      </div>
  );
};

export default SleepStep;