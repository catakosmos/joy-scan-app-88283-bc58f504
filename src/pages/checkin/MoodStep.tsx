import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

const MoodStep = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string>("");

  const moods = [
    { emoji: "😊", label: "Feliz", value: "happy", color: "mood-happy" },
    { emoji: "😌", label: "Tranquilo", value: "calm", color: "mood-calm" },
    { emoji: "😢", label: "Triste", value: "sad", color: "mood-sad" },
    { emoji: "😠", label: "Enojado", value: "angry", color: "mood-angry" },
    { emoji: "😰", label: "Ansioso", value: "anxious", color: "mood-anxious" }
  ];

  const handleMoodSelect = (moodValue: string) => {
    setSelectedMood(moodValue);
  };

  const handleContinue = () => {
    if (selectedMood) {
      // Store the mood selection
      localStorage.setItem('checkinMood', selectedMood);
      navigate('/checkin/sleep');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
      <div className="max-w-md mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-12">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-accent rounded-3xl flex items-center justify-center shadow-mood">
            <span className="text-2xl">🎭</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Check-in Diario
            </h1>
            <p className="text-muted-foreground">
              Paso 1 de 3
            </p>
          </div>
        </div>

        {/* Question */}
        <div className="text-center space-y-6">
          <h2 className="text-xl font-semibold text-foreground">
            ¿Cómo describirías tu estado de ánimo?
          </h2>
          
          {/* Mood Selection Grid */}
          <div className="grid grid-cols-2 gap-4">
            {moods.map((mood) => (
              <Card
                key={mood.value}
                className={`
                  p-6 cursor-pointer transition-all duration-200 hover:scale-105 text-center space-y-3
                  ${selectedMood === mood.value 
                    ? `bg-${mood.color}/20 border-${mood.color} shadow-mood ring-2 ring-${mood.color}/50` 
                    : 'hover:shadow-soft'
                  }
                `}
                onClick={() => handleMoodSelect(mood.value)}
              >
                <div className="text-4xl">{mood.emoji}</div>
                <p className="font-medium text-foreground">
                  {mood.label}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-8">
          <Button
            onClick={handleContinue}
            disabled={!selectedMood}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent/90 shadow-soft disabled:opacity-50"
            size="lg"
          >
            Continuar
            <ChevronRight className="ml-2" size={20} />
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="flex space-x-2 justify-center">
          <div className="w-8 h-2 bg-primary rounded-full"></div>
          <div className="w-8 h-2 bg-muted rounded-full"></div>
          <div className="w-8 h-2 bg-muted rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default MoodStep;