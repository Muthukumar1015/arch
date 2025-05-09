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
        <title>Deva Architecture | Chennai's Premier Architectural Studio</title>
        <meta 
          name="description" 
          content="Award-winning architecture and interior design studio in Chennai creating innovative, sustainable and aesthetic solutions across South India."
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
