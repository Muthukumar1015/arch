import { Link } from "wouter";
import { type Article } from "@shared/schema";
import { formatShortDate } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <div className="group cursor-pointer border-b pb-6">
        <div className="overflow-hidden mb-4">
          <img 
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-[240px] object-cover transition-all hover-scale"
          />
        </div>
        <div className="flex items-center mb-2">
          <span className="text-xs text-accent uppercase font-semibold">{article.category}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-xs text-gray-500">{formatShortDate(article.publishedDate)}</span>
        </div>
        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-accent transition-all">
          {article.title}
        </h3>
        <p className="text-gray-600 line-clamp-2">{article.excerpt}</p>
      </div>
    </Link>
  );
}
