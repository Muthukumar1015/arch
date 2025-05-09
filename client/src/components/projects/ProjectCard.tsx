import { Link } from "wouter";
import { type Project } from "@shared/schema";
import { capitalize } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="group cursor-pointer">
        <div className="overflow-hidden mb-4">
          <img 
            src={project.imageUrl}
            alt={project.title} 
            className="w-full h-[300px] object-cover transition-all hover-scale"
          />
        </div>
        <h3 className="font-display text-xl font-bold mb-1">{project.title}</h3>
        <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
          {capitalize(project.category)} | {project.location}
        </p>
        <p className="text-gray-600 line-clamp-2">{project.description}</p>
      </div>
    </Link>
  );
}
