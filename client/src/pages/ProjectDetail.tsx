import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet";
import { formatDate, capitalize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function ProjectDetail() {
  const { slug } = useParams();
  
  const { data: project, isLoading, error } = useQuery({
    queryKey: [`/api/projects/${slug}`],
  });

  if (isLoading) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-6 w-1/3 mb-6" />
          <Skeleton className="h-[500px] w-full mb-10 rounded-md" />
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-6 w-full mb-3" />
            <Skeleton className="h-6 w-full mb-3" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Project not found</h1>
          <p className="text-gray-600 mb-8">The project you're looking for doesn't exist or has been removed.</p>
          <Link href="/projects">
            <Button>Browse all projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Architecture+Design</title>
        <meta name="description" content={project.description} />
      </Helmet>
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link href="/projects" className="inline-flex items-center text-gray-600 hover:text-accent mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">{project.title}</h1>
          <p className="text-lg text-gray-600 mb-8">
            {capitalize(project.category)} | {project.location} | {formatDate(project.publishedDate)}
          </p>
          
          <div className="mb-12">
            <img 
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto max-h-[700px] object-cover rounded-md"
            />
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-xl font-semibold mb-6">{project.description}</p>
            
            <div className="prose prose-lg max-w-none">
              {project.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
