import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  accent?: boolean;
  delay?: number;
  once?: boolean;
}

export default function AnimatedText({
  text,
  className,
  accent = false,
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  // Split text into words
  const words = text.split(" ");

  // Animation variants for container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  // Animation variants for each word
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className={cn(
            "inline-block mr-2",
            accent && index % 3 === 1 && "text-secondary"
          )}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
