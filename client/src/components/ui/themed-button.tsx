import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type ButtonProps } from "@/components/ui/button";
import { forwardRef } from "react";

interface ThemedButtonProps extends ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

const ThemedButton = forwardRef<HTMLButtonElement, ThemedButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    // Map themed variants to Shadcn variants
    const variantMap = {
      primary: "px-8 py-3 bg-secondary text-primary font-accent font-medium rounded-sm hover:bg-white transition-colors",
      secondary: "px-8 py-3 border-2 border-white text-white font-accent font-medium rounded-sm hover:bg-white hover:text-primary transition-colors",
      outline: "px-8 py-3 border border-gray-300 rounded-sm font-accent text-sm font-medium transition-colors hover:bg-secondary hover:text-white hover:border-secondary",
    };

    return (
      <Button
        ref={ref}
        className={cn(variantMap[variant], className)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

ThemedButton.displayName = "ThemedButton";

export { ThemedButton };
