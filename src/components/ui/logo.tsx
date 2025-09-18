import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ className, size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl"
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {/* Enhanced Logo Icon */}
      <div className={cn(
        "flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-medium",
        sizeClasses[size]
      )}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5/6 w-5/6 text-primary-foreground"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized Sifnos Island Shape */}
          <path
            d="M12 2C8.5 2 5.5 4.5 4 8C2.5 11.5 3 15.5 5 18.5C7 21.5 10 22 12 22C14 22 17 21.5 19 18.5C21 15.5 21.5 11.5 20 8C18.5 4.5 15.5 2 12 2Z"
            fill="currentColor"
            opacity="0.3"
          />
          {/* Pottery/Culture Symbol */}
          <path
            d="M12 6C10 6 9 7 9 8.5V15C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 15V8.5C15 7 14 6 12 6Z"
            fill="currentColor"
          />
          <circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.7" />
        </svg>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <span className={cn(
          "logo-text font-bold text-primary",
          textSizeClasses[size]
        )}>
          TravelSifnos.gr
        </span>
      )}
    </div>
  );
};

export { Logo };
