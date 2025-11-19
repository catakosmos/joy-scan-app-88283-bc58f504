import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";

const MoodStep = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<number>(2); // Start at neutral (middle)
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const moods = [
    { emoji: "😠", label: "Muy Mal", value: "very-bad", color: "#ef4444" },
    { emoji: "😢", label: "Mal", value: "bad", color: "#f97316" },
    { emoji: "😐", label: "Neutral", value: "neutral", color: "#fbbf24" },
    { emoji: "😊", label: "Bien", value: "good", color: "#a3e635" },
    { emoji: "😄", label: "Muy Bien", value: "very-good", color: "#22c55e" }
  ];

  const handleSliderInteraction = (clientX: number) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const index = Math.round(percentage * (moods.length - 1));
    setSelectedMood(index);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSliderInteraction(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleSliderInteraction(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleSliderInteraction(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleSliderInteraction(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleContinue = () => {
    localStorage.setItem('checkinMood', moods[selectedMood].value);
    navigate('/checkin/sleep');
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

        {/* Question and Mood Display */}
        <div className="text-center space-y-8">
          <h2 className="text-xl font-semibold text-foreground">
            ¿Cómo describirías tu estado de ánimo?
          </h2>
          
          {/* Selected Mood Display */}
          <div className="space-y-4 animate-fade-in">
            <p className="text-lg font-medium text-muted-foreground">
              Me siento {moods[selectedMood].label}.
            </p>
            <div className="text-8xl transition-all duration-300">
              {moods[selectedMood].emoji}
            </div>
            <ChevronDown className="mx-auto text-muted-foreground animate-bounce" size={24} />
          </div>

          {/* Arc Slider */}
          <div className="relative pt-8 pb-4">
            {/* Color segments background */}
            <div 
              ref={sliderRef}
              className="relative h-32 cursor-pointer select-none"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              {/* Arc segments */}
              <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-48 rounded-t-full flex">
                  {moods.map((mood, index) => (
                    <div
                      key={mood.value}
                      className="flex-1 transition-opacity duration-200"
                      style={{
                        background: mood.color,
                        opacity: Math.abs(selectedMood - index) <= 1 ? 1 : 0.4
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Slider pointer */}
              <div
                className="absolute bottom-0 transition-all duration-200"
                style={{
                  left: `${(selectedMood / (moods.length - 1)) * 100}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-background border-4 border-foreground rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing">
                    <div className="w-3 h-3 bg-foreground rounded-full" />
                  </div>
                </div>
              </div>

              {/* Emotion labels */}
              <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-xs text-muted-foreground px-2">
                {moods.map((mood, index) => (
                  <span 
                    key={mood.value}
                    className={`transition-all ${selectedMood === index ? 'font-semibold text-foreground scale-110' : ''}`}
                  >
                    {mood.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-12">
          <Button
            onClick={handleContinue}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent/90 shadow-soft"
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
      <BottomNavigation todayCheckinCompleted={false} />
    </div>
  );
};

export default MoodStep;