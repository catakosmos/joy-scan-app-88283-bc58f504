import { BottomNavigation } from "@/components/BottomNavigation";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, TrendingUp, Calendar, Heart } from "lucide-react";
import { useState, useEffect } from "react";

const Home = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [todayCheckinCompleted, setTodayCheckinCompleted] = useState(false);

  // Mock data - in real app this would come from state management
  const mockData = {
    currentMood: "😊",
    moodScore: 7.5,
    weeklyAverage: 6.8,
    streak: 12,
    lastCheckin: "Hoy, 14:30"
  };

  useEffect(() => {
    // Mock alert logic for 3 consecutive low days
    const shouldShowAlert = Math.random() > 0.7; // 30% chance for demo
    setShowAlert(shouldShowAlert);
    
    // Check if today's checkin is completed
    const checkinCompleted = localStorage.getItem('todayCheckinCompleted') === 'true';
    setTodayCheckinCompleted(checkinCompleted);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted pb-20">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <h1 className="text-2xl font-bold text-foreground">
            ¡Hola! 👋
          </h1>
          <p className="text-muted-foreground">
            ¿Cómo te sientes hoy?
          </p>
        </div>

        {/* Alert for consecutive low mood days */}
        {showAlert && (
          <Alert className="border-amber-200 bg-amber-50 shadow-soft">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              Hemos notado que tu ánimo ha estado bajo los últimos 3 días. ¿Te gustaría probar algunos ejercicios de bienestar?
            </AlertDescription>
          </Alert>
        )}

        {/* Current Status Card */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 shadow-soft">
          <div className="text-center space-y-4">
            <div className="text-6xl">{mockData.currentMood}</div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-foreground">
                Estado Actual
              </h3>
              <p className="text-sm text-muted-foreground">
                Último check-in: {mockData.lastCheckin}
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-primary">
              <TrendingUp size={16} />
              <span className="font-semibold">{mockData.moodScore}/10</span>
            </div>
          </div>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center space-y-2 shadow-soft hover:shadow-mood transition-shadow">
            <Heart className="w-6 h-6 mx-auto text-mood-happy" />
            <div className="text-2xl font-bold text-foreground">
              {mockData.weeklyAverage}
            </div>
            <p className="text-xs text-muted-foreground">
              Promedio Semanal
            </p>
          </Card>
          
          <Card className="p-4 text-center space-y-2 shadow-soft hover:shadow-mood transition-shadow">
            <Calendar className="w-6 h-6 mx-auto text-accent" />
            <div className="text-2xl font-bold text-foreground">
              {mockData.streak}
            </div>
            <p className="text-xs text-muted-foreground">
              Días Consecutivos
            </p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Acciones Rápidas</h3>
          
          <div className="space-y-3">
            <Card className="p-4 bg-gradient-to-r from-mood-calm/10 to-mood-calm/5 border-mood-calm/30 hover:shadow-mood transition-all cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🧘‍♀️</div>
                <div>
                  <h4 className="font-medium text-foreground">Ejercicio de Respiración</h4>
                  <p className="text-sm text-muted-foreground">5 minutos de calma</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-gradient-to-r from-mood-happy/10 to-mood-happy/5 border-mood-happy/30 hover:shadow-mood transition-all cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">📝</div>
                <div>
                  <h4 className="font-medium text-foreground">Reflexión Rápida</h4>
                  <p className="text-sm text-muted-foreground">Expresa tus pensamientos</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <BottomNavigation todayCheckinCompleted={todayCheckinCompleted} />
    </div>
  );
};

export default Home;