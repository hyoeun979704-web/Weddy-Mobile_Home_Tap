import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Gift, Star, MapPin, ChevronRight } from "lucide-react";

const giftItems = [
  { id: "1", name: "삼성 비스포크 세트", location: "온라인/오프라인", priceRange: "1,200만원~", rating: 4.9, reviewCount: 892, imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400", type: "가전" },
  { id: "2", name: "LG 오브제 컬렉션", location: "온라인/오프라인", priceRange: "980만원~", rating: 4.8, reviewCount: 654, imageUrl: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400", type: "가전" },
  { id: "3", name: "시몬스 침대 세트", location: "전국 매장", priceRange: "450만원~", rating: 4.7, reviewCount: 423, imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400", type: "가구" },
  { id: "4", name: "한샘 리하우스", location: "전국 매장", priceRange: "800만원~", rating: 4.6, reviewCount: 312, imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400", type: "인테리어" },
  { id: "5", name: "에이스 침대", location: "전국 매장", priceRange: "380만원~", rating: 4.7, reviewCount: 567, imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400", type: "가구" },
  { id: "6", name: "일룸 가구 세트", location: "전국 매장", priceRange: "520만원~", rating: 4.5, reviewCount: 289, imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400", type: "가구" },
];

const HoneymoonGifts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (href: string) => {
    navigate(href);
  };

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto relative">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-lg font-bold text-foreground">혼수·골든타임</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">전국</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-amber-100/50 via-amber-50/30 to-background px-4 py-8 overflow-hidden">
          <div className="absolute top-4 right-4 w-24 h-24 bg-amber-200/30 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 rounded-full mb-3">
              <Gift className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-medium text-amber-600">혼수 골든타임</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              지금이 혼수 준비<br />
              <span className="text-amber-600">골든타임!</span> 최대 혜택 받기
            </h2>
            <p className="text-sm text-muted-foreground">
              결혼 시즌 한정 특가! 가전·가구 비교
            </p>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
          {["전체", "가전", "가구", "인테리어", "침구"].map((filter, index) => (
            <button
              key={filter}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                index === 0 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h2 className="text-lg font-bold text-foreground">혼수 특가</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              지금 가장 인기있는 혼수 상품
            </p>
          </div>
          <button className="flex items-center gap-1 text-sm text-primary font-medium">
            전체보기
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 px-4">
          {giftItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/honeymoon-gifts/${item.id}`)}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all text-left"
            >
              <div className="h-32 bg-muted overflow-hidden relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-foreground/60 text-background text-xs rounded-full">
                  {item.type}
                </span>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-foreground text-sm mb-1 truncate">{item.name}</h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary">{item.priceRange}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-xs font-medium">{item.rating}</span>
                    <span className="text-xs text-muted-foreground">({item.reviewCount})</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={location.pathname} onTabChange={handleTabChange} />
    </div>
  );
};

export default HoneymoonGifts;
