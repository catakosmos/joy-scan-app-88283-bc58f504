import { BottomNavigation } from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { Bell, Clock, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reminder = () => {
  const { toast } = useToast();
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [frequency, setFrequency] = useState("daily");
  const [customFrequencyDays, setCustomFrequencyDays] = useState(3);

  const [showNativeTimeInput, setShowNativeTimeInput] = useState(false);


  const frequencyOptions = [
    { label: "Diario", value: "daily", icon: "📅" },
    { label: "Semanal", value: "weekly", icon: "📰" },
    { label: "Personalizada", value: "custom", icon: "📊" }
  ];

  const handleSave = () => {
    // Save reminder settings
    localStorage.setItem('reminderEnabled', reminderEnabled.toString());
    localStorage.setItem('reminderTime', selectedTime);
    localStorage.setItem('reminderFrequency', frequency);
    if (frequency === 'custom') {
      localStorage.setItem('reminderFrequencyCustomDays', String(customFrequencyDays));
    }

    const freqText = frequency === 'daily'
      ? 'diariamente'
      : frequency === 'every-2-days'
      ? 'cada 2 días'
      : frequency === 'weekly'
      ? 'semanalmente'
      : `cada ${customFrequencyDays} días`;

    toast({
      title: "Recordatorio configurado",
      description: `Recibirás notificaciones ${freqText} a las ${selectedTime}`,
    });
  };

  // Load saved settings on mount
  useEffect(() => {
    try {
      const re = localStorage.getItem('reminderEnabled');
      if (re !== null) setReminderEnabled(re === 'true');
      const rt = localStorage.getItem('reminderTime');
      if (rt) setSelectedTime(rt);
      const rf = localStorage.getItem('reminderFrequency');
      if (rf) setFrequency(rf);
      const rfd = localStorage.getItem('reminderFrequencyCustomDays');
      if (rfd) setCustomFrequencyDays(Number(rfd) || 3);
    } catch (e) {
      // ignore
    }
  }, []);

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
              
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center space-x-4 bg-muted p-3 rounded-2xl">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => {
                        const [h, m] = selectedTime.split(":").map(Number);
                        const nh = (h + 1) % 24;
                        setSelectedTime(`${String(nh).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
                      }}
                      className="p-1 rounded-md bg-muted/60 hover:bg-muted/80"
                      aria-label="Aumentar hora"
                    >
                      ▲
                    </button>
                    <div className="text-3xl font-mono w-14 text-center">{selectedTime.split(":")[0]}</div>
                    <button
                      onClick={() => {
                        const [h, m] = selectedTime.split(":").map(Number);
                        const nh = (h - 1 + 24) % 24;
                        setSelectedTime(`${String(nh).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
                      }}
                      className="p-1 rounded-md bg-muted/60 hover:bg-muted/80"
                      aria-label="Disminuir hora"
                    >
                      ▼
                    </button>
                  </div>

                  <div className="text-4xl font-mono font-semibold">:</div>

                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => {
                        const [h, m] = selectedTime.split(":").map(Number);
                        const nm = (m + 5) % 60;
                        setSelectedTime(`${String(h).padStart(2, "0")}:${String(nm).padStart(2, "0")}`);
                      }}
                      className="p-1 rounded-md bg-muted/60 hover:bg-muted/80"
                      aria-label="Aumentar minutos"
                    >
                      ▲
                    </button>
                    <div className="text-3xl font-mono w-14 text-center">{selectedTime.split(":")[1]}</div>
                    <button
                      onClick={() => {
                        const [h, m] = selectedTime.split(":").map(Number);
                        const nm = (m - 5 + 60) % 60;
                        setSelectedTime(`${String(h).padStart(2, "0")}:${String(nm).padStart(2, "0")}`);
                      }}
                      className="p-1 rounded-md bg-muted/60 hover:bg-muted/80"
                      aria-label="Disminuir minutos"
                    >
                      ▼
                    </button>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center">
                  <div className="w-full flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">Toca los botones para ajustar hora/minutos</div>
                    <button
                      onClick={() => setShowNativeTimeInput(true)}
                      className="text-xs text-primary underline flex items-center space-x-2"
                      aria-label="Editar hora"
                    >
                      <span>✏️</span>
                      <span>Editar</span>
                    </button>
                  </div>

                  {showNativeTimeInput && (
                    <div className="w-full pt-2">
                      <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full p-3 rounded-xl bg-muted text-foreground"
                        autoFocus
                        onBlur={() => setShowNativeTimeInput(false)}
                      />
                    </div>
                  )}
                </div>
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

                {frequency === 'custom' && (
                  <div className="pt-2 space-y-2">
                    <label className="text-sm text-muted-foreground">Repetir cada (días)</label>
                    <input
                      type="number"
                      min={1}
                      value={customFrequencyDays}
                      onChange={(e) => setCustomFrequencyDays(Math.max(1, Number(e.target.value || 1)))}
                      className="w-full p-3 rounded-xl bg-muted text-foreground"
                    />
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Setup Options */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Configuración Rápida</h3>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    setSelectedTime("09:00");
                    setFrequency("daily");
                  }}
                  className="p-4 bg-mood-happy/20 hover:bg-mood-happy/30 rounded-xl text-center space-y-2 transition-colors"
                >
                  <div className="text-2xl">🌅</div>
                  <div className="text-sm font-medium text-foreground">
                    Mañana 9:00
                  </div>
                </button>

                <button
                  onClick={() => {
                    setSelectedTime("13:00");
                    setFrequency("daily");
                  }}
                  className="p-4 bg-mood-happy/10 hover:bg-mood-happy/20 rounded-xl text-center space-y-2 transition-colors"
                >
                  <div className="text-2xl">🍽️</div>
                  <div className="text-sm font-medium text-foreground">
                    Mediodía 13:00
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
                    Noche 20:00
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