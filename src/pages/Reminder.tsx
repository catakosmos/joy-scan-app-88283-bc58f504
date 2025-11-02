import { BottomNavigation } from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Bell, Clock, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reminder = () => {
  const { toast } = useToast();
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [frequency, setFrequency] = useState("daily");

  const timeOptions = [
    "08:00", "09:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"
  ];

  const frequencyOptions = [
    { label: "Diario", value: "daily", icon: "📅" },
    { label: "Cada 2 días", value: "every-2-days", icon: "📊" },
    { label: "Semanal", value: "weekly", icon: "📰" }
  ];

  const handleSave = () => {
    // Save reminder settings
    localStorage.setItem('reminderEnabled', reminderEnabled.toString());
    localStorage.setItem('reminderTime', selectedTime);
    localStorage.setItem('reminderFrequency', frequency);
    
    toast({
      title: "Recordatorio configurado",
      description: `Recibirás notificaciones ${frequency === 'daily' ? 'diariamente' : frequency === 'every-2-days' ? 'cada 2 días' : 'semanalmente'} a las ${selectedTime}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted pb-20">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 pt-12">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-accent rounded-3xl flex items-center justify-center shadow-mood">
            <Bell className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Fijar Recordatorio
            </h1>
            <p className="text-muted-foreground">
              Configura cuándo quieres recibir tu recordatorio de check-in
            </p>
          </div>
        </div>

        {/* Enable/Disable Reminder */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">Activar Recordatorios</h3>
              <p className="text-sm text-muted-foreground">
                Recibe notificaciones para no olvidar tu check-in
              </p>
            </div>
            <Switch
              checked={reminderEnabled}
              onCheckedChange={setReminderEnabled}
            />
          </div>
        </Card>

        {reminderEnabled && (
          <>
            {/* Time Selection */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Hora del Recordatorio</h3>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {timeOptions.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`
                      p-3 rounded-xl text-sm font-medium transition-all
                      ${selectedTime === time
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </Card>

            {/* Frequency Selection */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Frecuencia</h3>
              </div>
              
              <div className="space-y-3">
                {frequencyOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFrequency(option.value)}
                    className={`
                      w-full p-4 rounded-xl text-left transition-all flex items-center space-x-3
                      ${frequency === option.value
                        ? 'bg-primary/20 border-primary text-primary ring-2 ring-primary/50'
                        : 'bg-muted hover:bg-muted/80 border-border'
                      }
                    `}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Quick Setup Options */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Configuración Rápida</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setSelectedTime("09:00");
                    setFrequency("daily");
                  }}
                  className="p-4 bg-mood-happy/20 hover:bg-mood-happy/30 rounded-xl text-center space-y-2 transition-colors"
                >
                  <div className="text-2xl">🌅</div>
                  <div className="text-sm font-medium text-foreground">
                    Mañanas 9:00
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    setSelectedTime("20:00");
                    setFrequency("daily");
                  }}
                  className="p-4 bg-mood-calm/20 hover:bg-mood-calm/30 rounded-xl text-center space-y-2 transition-colors"
                >
                  <div className="text-2xl">🌙</div>
                  <div className="text-sm font-medium text-foreground">
                    Noches 8:00
                  </div>
                </button>
              </div>
            </Card>
          </>
        )}

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent/90 shadow-soft"
          size="lg"
        >
          Guardar Configuración
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Reminder;