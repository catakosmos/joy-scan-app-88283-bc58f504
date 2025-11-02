import { Cloud, Calendar, Home, Clock, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  todayCheckinCompleted?: boolean;
}

export const BottomNavigation = ({ todayCheckinCompleted = false }: BottomNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const today = new Date().getDate();

  const handleCalendarClick = () => {
    if (todayCheckinCompleted) {
      navigate("/checkin-results");
    } else {
      navigate("/checkin/mood");
    }
  };

  const navItems = [
    {
      icon: Cloud,
      onClick: () => navigate("/exercises"),
      isActive: location.pathname === "/exercises"
    },
    {
      icon: Calendar,
      onClick: handleCalendarClick,
      isActive: location.pathname.includes("/checkin"),
      showDayNumber: true,
      dayNumber: today
    },
    {
      icon: Home,
      onClick: () => navigate("/home"),
      isActive: location.pathname === "/home" || location.pathname === "/",
      isCenter: true
    },
    {
      icon: Clock,
      onClick: () => navigate("/reminder"),
      isActive: location.pathname === "/reminder"
    },
    {
      icon: User,
      onClick: () => navigate("/profile"),
      isActive: location.pathname === "/profile"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.onClick}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200",
                item.isCenter 
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-mood scale-110" 
                  : item.isActive 
                    ? "bg-secondary text-secondary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <div className="relative">
                <Icon size={item.isCenter ? 28 : 24} />
                {item.showDayNumber && (
                  <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {item.dayNumber}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};