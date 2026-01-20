import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import HomeHeader from "@/components/home/HomeHeader";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import RecommendedVenues from "@/components/home/RecommendedVenues";
import StudioGallery from "@/components/home/StudioGallery";
import MagazineSection from "@/components/home/MagazineSection";
import ReviewSection from "@/components/home/ReviewSection";
import Footer from "@/components/home/Footer";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (href: string) => {
    navigate(href);
  };

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto relative">
      {/* Header */}
      <HomeHeader />

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Section */}
        <HeroSection />

        {/* Category Grid */}
        <CategoryGrid />

        {/* Recommended Venues - Horizontal Scroll */}
        <RecommendedVenues />

        {/* Studio Gallery */}
        <StudioGallery />

        {/* Magazine Section */}
        <MagazineSection />

        {/* Review Section */}
        <ReviewSection />

        {/* Footer */}
        <Footer />
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={location.pathname} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;
