import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BottomNavigation } from "@/components/BottomNavigation";

const JournalStep = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [journalText, setJournalText] = useState("");

  const handleComplete = () => {
    // Store the journal entry
    localStorage.setItem('checkinJournal', journalText);
    localStorage.setItem('todayCheckinCompleted', 'true');
    localStorage.setItem('checkinDate', new Date().toISOString().split('T')[0]);
    
    // Show success toast
    toast({
      title: "¡Check-in completado!",
      description: "Gracias por registrar tu estado de ánimo hoy.",
    });
    
    navigate('/home');
  };

  const handleBack = () => {
    navigate('/checkin/sleep');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted">
      <div className="max-w-md mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-12">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-accent rounded-3xl flex items-center justify-center shadow-mood">
            <span className="text-2xl">📝</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Check-in Diario
            </h1>
            <p className="text-muted-foreground">
              Paso 3 de 3
            </p>
          </div>
        </div>

        {/* Question */}
        <div className="text-center space-y-6">
          <h2 className="text-xl font-semibold text-foreground">
            Expresa brevemente cómo te sientes
          </h2>
          
          {/* Journal Textarea */}
          <div className="space-y-4">
            <Textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Escribe aquí tus pensamientos, sentimientos o cualquier cosa que quieras registrar sobre tu día..."
              className="min-h-[200px] text-base p-4 bg-card border-border focus:border-primary resize-none"
              maxLength={500}
            />
            
            <div className="text-right text-sm text-muted-foreground">
              {journalText.length}/500 caracteres
            </div>
            
            {/* Helpful prompts */}
            <div className="text-left space-y-2">
              <p className="text-sm text-muted-foreground font-medium">
                Puedes escribir sobre:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                <li>• Lo mejor de tu día</li>
                <li>• Algo que te preocupa</li>
                <li>• Cómo te sientes físicamente</li>
                <li>• Tus planes para mañana</li>
              </ul>
            </div>
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
            onClick={handleComplete}
            className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary-hover shadow-soft"
            size="lg"
          >
            <Check className="mr-2" size={20} />
            Completar
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="flex space-x-2 justify-center">
          <div className="w-8 h-2 bg-primary rounded-full"></div>
          <div className="w-8 h-2 bg-primary rounded-full"></div>
          <div className="w-8 h-2 bg-primary rounded-full"></div>
        </div>
      </div>
      <BottomNavigation todayCheckinCompleted={false} />
    </div>
  );
};

export default JournalStep;
