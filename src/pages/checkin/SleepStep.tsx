import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const SleepStep = () => {
  const navigate = useNavigate();
  const [selectedSleep, setSelectedSleep] = useState<string>("");

  const sleepOptions = [
    { label: "Muy bien", value: "very-good", icon: "😴", color: "mood-happy" },
    { label: "Bien", value: "good", icon: "😊", color: "mood-calm" },
    { label: "Regular", value: "ok", icon: "😐", color: "primary" },
    { label: "Mal", value: "bad", icon: "😞", color: "mood-anxious" },
    { label: "Muy mal", value: "very-bad", icon: "😵", color: "mood-angry" }
  ];

  const handleSleepSelect = (sleepValue: string) => {
    setSelectedSleep(sleepValue);
  };

  const handleContinue = () => {
    if (selectedSleep) {
      // Store the sleep selection
      localStorage.setItem('checkinSleep', selectedSleep);
      navigate('/checkin/journal');
    }
  };

  const handleBack = () => {
    navigate('/checkin/mood');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
      <div className="max-w-md mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-12">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-accent rounded-3xl flex items-center justify-center shadow-mood">
            <span className="text-2xl">🌙</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Check-in Diario
            </h1>
            <p className="text-muted-foreground">
              Paso 2 de 3
            </p>
          </div>
        </div>

        {/* Question */}
        <div className="text-center space-y-6">
          <h2 className="text-xl font-semibold text-foreground">
            ¿Cómo dormiste hoy?
          </h2>
          
          {/* Sleep Quality Selection */}
          <div className="space-y-3">
            {sleepOptions.map((option) => (
              <Card
                key={option.value}
                className={`
                  p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02]
                  ${selectedSleep === option.value 
                    ? `bg-${option.color}/20 border-${option.color} shadow-mood ring-2 ring-${option.color}/50` 
                    : 'hover:shadow-soft'
                  }
                `}
                onClick={() => handleSleepSelect(option.value)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{option.icon}</div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-foreground text-lg">
                      {option.label}
                    </p>
                  </div>
                  {selectedSleep === option.value && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
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
            disabled={!selectedSleep}
            className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent/90 shadow-soft disabled:opacity-50"
            size="lg"
          >
            Continuar
            <ChevronRight className="ml-2" size={20} />
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="flex space-x-2 justify-center">
          <div className="w-8 h-2 bg-primary rounded-full"></div>
          <div className="w-8 h-2 bg-primary rounded-full"></div>
          <div className="w-8 h-2 bg-muted rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SleepStep;