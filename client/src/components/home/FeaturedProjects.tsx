import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilters from "@/components/projects/ProjectFilters";
import { useState } from "react";
import { type Project } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ["/api/projects/featured"],
  });

  const filteredProjects = projects?.filter((project: Project) => {
    if (activeFilter === "all") return true;
    return project.category === activeFilter.toLowerCase();
  });

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Featured Projects</h2>
          <div className="flex mt-4 md:mt-0 overflow-x-auto">
            <ProjectFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {isLoading ? (
            // Loading skeletons
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-[300px] w-full rounded-md" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))
          ) : filteredProjects?.length ? (
            filteredProjects.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No projects found for this category.</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/projects" className="btn-outline">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
