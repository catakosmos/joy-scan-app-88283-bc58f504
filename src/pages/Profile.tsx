import { BottomNavigation } from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { User, Settings, Bell, Download, Trash2, LogOut, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleExportData = () => {
    toast({
      title: "Exportando datos",
      description: "Tus datos se descargarán en breve como archivo CSV",
    });
  };

  const handleClearData = () => {
    toast({
      title: "Datos eliminados",
      description: "Todos tus registros han sido eliminados",
    });
  };

  const profileStats = {
    totalCheckins: 45,
    currentStreak: 12,
    averageMood: 7.2,
    joinDate: "Marzo 2024"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted pb-20">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 pt-12">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-mood">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Mi Perfil
            </h1>
            <p className="text-muted-foreground">
              Usuario Invitado
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center space-y-2 shadow-soft">
            <Heart className="w-6 h-6 mx-auto text-mood-happy" />
            <div className="text-2xl font-bold text-foreground">
              {profileStats.totalCheckins}
            </div>
            <p className="text-xs text-muted-foreground">
              Check-ins Totales
            </p>
          </Card>
          
          <Card className="p-4 text-center space-y-2 shadow-soft">
            <div className="text-2xl">🔥</div>
            <div className="text-2xl font-bold text-foreground">
              {profileStats.currentStreak}
            </div>
            <p className="text-xs text-muted-foreground">
              Días Consecutivos
            </p>
          </Card>
        </div>

        {/* Settings Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Configuración</h3>
          
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-primary" />
                <div>
                  <h4 className="font-medium text-foreground">Notificaciones</h4>
                  <p className="text-sm text-muted-foreground">
                    Recordatorios de check-in
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="font-medium text-foreground">Modo Oscuro</h4>
                    <p className="text-sm text-muted-foreground">
                      Cambiar tema de la app
                    </p>
                  </div>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Data Management */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Mis Datos</h3>
          
          <Card className="p-6 space-y-4">
            <Button
              onClick={handleExportData}
              variant="outline"
              className="w-full justify-start space-x-3"
            >
              <Download className="w-5 h-5" />
              <span>Exportar mis datos</span>
            </Button>
            
            <Button
              onClick={handleClearData}
              variant="outline"
              className="w-full justify-start space-x-3 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-5 h-5" />
              <span>Eliminar todos los datos</span>
            </Button>
          </Card>
        </div>

        {/* App Info */}
        <Card className="p-6 space-y-3">
          <h3 className="font-semibold text-foreground">Información</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Versión de la app</span>
              <span className="font-medium text-foreground">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Miembro desde</span>
              <span className="font-medium text-foreground">{profileStats.joinDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Promedio de ánimo</span>
              <span className="font-medium text-foreground">{profileStats.averageMood}/10</span>
            </div>
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full justify-center space-x-3 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;