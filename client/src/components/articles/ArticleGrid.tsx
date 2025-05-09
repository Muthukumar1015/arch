import { type Article } from "@shared/schema";
import ArticleCard from "./ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ArticleGridProps {
  articles: Article[] | undefined;
  isLoading: boolean;
}

export default function ArticleGrid({ articles, isLoading }: ArticleGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="space-y-3 border-b pb-6">
            <Skeleton className="h-[240px] w-full rounded-md" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!articles?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
