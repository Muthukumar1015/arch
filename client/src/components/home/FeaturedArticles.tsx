import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ArticleCard from "@/components/articles/ArticleCard";
import { type Article } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedArticles() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["/api/articles/featured"],
  });

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Latest Articles</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-3 border-b pb-6">
                <Skeleton className="h-[240px] w-full rounded-md" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))
          ) : articles?.length ? (
            articles.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No articles found.</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/articles" className="btn-outline">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
