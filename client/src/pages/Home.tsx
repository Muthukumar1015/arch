import { Helmet } from "react-helmet";
import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import AboutStudio from "@/components/home/AboutStudio";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import DesignProcess from "@/components/home/DesignProcess";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Architecture+Design | Inspiring Spaces</title>
        <meta 
          name="description" 
          content="Award-winning architecture and interior design studio creating innovative, sustainable and aesthetic solutions worldwide."
        />
      </Helmet>
      
      <Hero />
      <FeaturedProjects />
      <AboutStudio />
      <FeaturedArticles />
      <DesignProcess />
      <Newsletter />
    </>
  );
}
