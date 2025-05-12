import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  className?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  label,
  className,
  center = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={cn(
      "mb-16",
      center && "text-center",
      className
    )}>
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={cn(
            "text-secondary font-accent uppercase tracking-widest text-sm font-medium inline-block",
          )}
        >
          {label}
        </motion.span>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className={cn(
          "text-4xl font-heading font-bold mb-4 mt-2",
          light && "text-white"
        )}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className={cn(
            "max-w-2xl",
            center && "mx-auto",
            light ? "text-gray-300" : "text-gray-700"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
