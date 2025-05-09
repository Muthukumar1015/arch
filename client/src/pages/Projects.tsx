import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import ProjectGrid from "@/components/projects/ProjectGrid";
import ProjectFilters from "@/components/projects/ProjectFilters";
import { type Project } from "@shared/schema";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ["/api/projects"],
  });

  const filteredProjects = projects?.filter((project: Project) => {
    if (activeFilter === "all") return true;
    return project.category === activeFilter.toLowerCase();
  });

  return (
    <>
      <Helmet>
        <title>Projects | Deva Architecture | Chennai</title>
        <meta 
          name="description" 
          content="Browse our diverse portfolio of architectural and interior design projects across Chennai and South India, spanning residential, commercial, and sustainable buildings."
        />
      </Helmet>
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <header className="mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Explore our portfolio of architectural projects that showcase our commitment to innovative design, sustainability, and exceptional craftsmanship.
            </p>
          </header>
          
          <div className="mb-12">
            <ProjectFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          </div>
          
          <ProjectGrid projects={filteredProjects} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}
