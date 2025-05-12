import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MotionImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  hoverEffect?: boolean;
}

export default function MotionImage({
  src,
  alt,
  className,
  width,
  height,
  hoverEffect = false,
}: MotionImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.05
        }}
        transition={{ duration: 0.5 }}
        onLoad={() => setIsLoaded(true)}
        whileHover={hoverEffect ? { scale: 1.05 } : undefined}
        className={cn(
          "w-full h-full object-cover transition-transform duration-500",
          !isLoaded && "blur-sm"
        )}
      />
    </div>
  );
}
