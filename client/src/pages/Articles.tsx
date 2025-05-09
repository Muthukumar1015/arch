import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import ArticleGrid from "@/components/articles/ArticleGrid";

export default function Articles() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["/api/articles"],
  });

  return (
    <>
      <Helmet>
        <title>Articles | Deva Architecture | Chennai</title>
        <meta 
          name="description" 
          content="Read our insights on South Indian architecture, local design trends, sustainability practices, and innovations in the Chennai construction industry."
        />
      </Helmet>
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <header className="mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Articles & Insights</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Explore our perspectives on architecture, design trends, sustainable practices, and industry innovations. Stay informed with our latest thoughts and discoveries.
            </p>
          </header>
          
          <ArticleGrid articles={articles} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}
