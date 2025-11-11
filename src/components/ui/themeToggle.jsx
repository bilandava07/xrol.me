import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <Button
      onClick={() => setDarkMode(!darkMode)}
      size="sm"
      variant="ghost"
      className="cursor-pointer p-2 group" 
    >
      {/* The icon container */}
      <div className="transition-transform duration-300 group-hover:scale-110">
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </div>
    </Button>
  );
}

export default ThemeToggle;
