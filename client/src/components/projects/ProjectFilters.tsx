import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function ProjectFilters({
  activeFilter,
  setActiveFilter,
}: ProjectFiltersProps) {
  const filters = [
    { id: "all", label: "All" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "interior", label: "Interior" },
    { id: "sustainable", label: "Sustainable" },
  ];

  return (
    <div className="flex space-x-4 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant="ghost"
          size="sm"
          onClick={() => setActiveFilter(filter.id)}
          className={cn(
            "px-4 py-2 whitespace-nowrap transition-all rounded-sm",
            activeFilter === filter.id
              ? "bg-accent text-white"
              : "hover:bg-gray-100"
          )}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
