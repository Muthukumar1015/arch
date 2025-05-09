import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function ArticleDetail() {
  const { slug } = useParams();
  
  const { data: article, isLoading, error } = useQuery({
    queryKey: [`/api/articles/${slug}`],
  });

  if (isLoading) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-6 w-1/3 mb-6" />
          <Skeleton className="h-[400px] w-full mb-10 rounded-md" />
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-6 w-full mb-3" />
            <Skeleton className="h-6 w-full mb-3" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Article not found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/articles">
            <Button>Browse all articles</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} | Architecture+Design</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Link href="/articles" className="inline-flex items-center text-gray-600 hover:text-accent mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-4">
              <span className="text-sm text-accent uppercase font-semibold">{article.category}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-gray-500">{formatDate(article.publishedDate)}</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
            
            <p className="text-xl text-gray-600 mb-8">{article.excerpt}</p>
            
            <div className="mb-10">
              <img 
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-md"
              />
            </div>
            
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={idx} className="text-2xl font-display font-bold mt-8 mb-4">{paragraph.substring(3)}</h2>;
                } else {
                  return <p key={idx}>{paragraph}</p>;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
