import { BottomNavigation } from "@/components/BottomNavigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, Heart, Moon } from "lucide-react";

const CheckinResults = () => {
  const navigate = useNavigate();
  
  // Get today's checkin data from localStorage
  const mood = localStorage.getItem('checkinMood') || 'happy';
  const sleep = localStorage.getItem('checkinSleep') || 'good';
  const journal = localStorage.getItem('checkinJournal') || '';
  const checkinDate = localStorage.getItem('checkinDate') || new Date().toISOString().split('T')[0];

  const getMoodData = (moodValue: string) => {
    const moods = {
      happy: { emoji: "😊", label: "Feliz", color: "mood-happy" },
      calm: { emoji: "😌", label: "Tranquilo", color: "mood-calm" },
      sad: { emoji: "😢", label: "Triste", color: "mood-sad" },
      angry: { emoji: "😠", label: "Enojado", color: "mood-angry" },
      anxious: { emoji: "😰", label: "Ansioso", color: "mood-anxious" }
    };
    return moods[moodValue as keyof typeof moods] || moods.happy;
  };

  const getSleepData = (sleepValue: string) => {
    const sleepOptions = {
      "very-good": { label: "Muy bien", icon: "😴", color: "mood-happy" },
      "good": { label: "Bien", icon: "😊", color: "mood-calm" },
      "ok": { label: "Regular", icon: "😐", color: "primary" },
      "bad": { label: "Mal", icon: "😞", color: "mood-anxious" },
      "very-bad": { label: "Muy mal", icon: "😵", color: "mood-angry" }
    };
    return sleepOptions[sleepValue as keyof typeof sleepOptions] || sleepOptions.good;
  };

  const moodData = getMoodData(mood);
  const sleepData = getSleepData(sleep);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted pb-20">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 pt-12">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-accent rounded-3xl flex items-center justify-center shadow-mood">
            <Calendar className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Tu Check-in de Hoy
            </h1>
            <p className="text-muted-foreground">
              {formatDate(checkinDate)}
            </p>
          </div>
        </div>

        {/* Mood Card */}
        <Card className={`p-6 bg-${moodData.color}/10 border-${moodData.color}/30 shadow-soft`}>
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{moodData.emoji}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Heart className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Estado de Ánimo</h3>
              </div>
              <p className="text-lg font-medium text-foreground">
                {moodData.label}
              </p>
            </div>
          </div>
        </Card>

        {/* Sleep Card */}
        <Card className={`p-6 bg-${sleepData.color}/10 border-${sleepData.color}/30 shadow-soft`}>
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{sleepData.icon}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Moon className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Calidad del Sueño</h3>
              </div>
              <p className="text-lg font-medium text-foreground">
                {sleepData.label}
              </p>
            </div>
          </div>
        </Card>

        {/* Journal Card */}
        {journal && (
          <Card className="p-6 shadow-soft">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center space-x-2">
                <span className="text-xl">📝</span>
                <span>Tu Reflexión</span>
              </h3>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-foreground leading-relaxed">
                  {journal}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Summary Card */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 shadow-mood">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-center">
              ¡Excelente trabajo! 🎉
            </h3>
            <p className="text-muted-foreground text-center text-sm">
              Has completado tu check-in diario. Recuerda que cada registro te ayuda a entender mejor tus patrones emocionales.
            </p>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/exercises')}
            className="w-full h-12 bg-gradient-to-r from-mood-calm to-mood-calm/80 hover:from-mood-calm/90 hover:to-mood-calm/70"
          >
            Explorar Ejercicios de Bienestar
          </Button>
          
          <Button
            onClick={() => navigate('/home')}
            variant="outline"
            className="w-full h-12"
          >
            Volver al Inicio
          </Button>
        </div>
      </div>

      <BottomNavigation todayCheckinCompleted={true} />
    </div>
  );
};

export default CheckinResults;