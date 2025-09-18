import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav 
      className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}
      aria-label="Breadcrumb"
    >
      <Link 
        to="/" 
        className="flex items-center hover:text-primary transition-colors focus-ring rounded-md px-2 py-1"
        aria-label="Go to homepage"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
          {item.current || !item.href ? (
            <span 
              className="font-medium text-foreground px-2 py-1"
              aria-current="page"
            >
              {item.label}
            </span>
          ) : (
            <Link 
              to={item.href}
              className="hover:text-primary transition-colors focus-ring rounded-md px-2 py-1"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export { Breadcrumbs, type BreadcrumbItem };
