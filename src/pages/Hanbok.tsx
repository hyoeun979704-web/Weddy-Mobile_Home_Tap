import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Sparkles, Star, MapPin, ChevronRight } from "lucide-react";

const hanbokItems = [
  { id: "1", name: "차이킴 한복", location: "서울 북촌", priceRange: "180만원~", rating: 4.9, reviewCount: 345, imageUrl: "https://images.unsplash.com/photo-1580547945467-d0c29c12b1c4?w=400", type: "맞춤" },
  { id: "2", name: "금단 한복", location: "서울 종로", priceRange: "250만원~", rating: 4.8, reviewCount: 234, imageUrl: "https://images.unsplash.com/photo-1591017403286-fd8493524e1e?w=400", type: "맞춤" },
  { id: "3", name: "리슬 한복", location: "서울 강남", priceRange: "150만원~", rating: 4.7, reviewCount: 189, imageUrl: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400", type: "대여" },
  { id: "4", name: "담연재 한복", location: "서울 인사동", priceRange: "120만원~", rating: 4.8, reviewCount: 278, imageUrl: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400", type: "대여" },
  { id: "5", name: "한복린", location: "서울 종로", priceRange: "200만원~", rating: 4.9, reviewCount: 167, imageUrl: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400", type: "맞춤" },
  { id: "6", name: "모던한복", location: "서울 홍대", priceRange: "95만원~", rating: 4.6, reviewCount: 312, imageUrl: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400", type: "대여" },
];

const Hanbok = () => {
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
          <h1 className="text-lg font-bold text-foreground">한복</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">서울</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-rose-100/50 via-rose-50/30 to-background px-4 py-8 overflow-hidden">
          <div className="absolute top-4 right-4 w-24 h-24 bg-rose-200/30 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 rounded-full mb-3">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span className="text-xs font-medium text-rose-600">한복</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              아름다운 전통,<br />
              <span className="text-rose-600">현대적인 한복</span>으로 특별하게
            </h2>
            <p className="text-sm text-muted-foreground">
              전통 혼례부터 폐백까지 맞춤 한복 컨설팅
            </p>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
          {["전체", "맞춤", "대여", "신부", "신랑", "폐백"].map((filter, index) => (
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
            <h2 className="text-lg font-bold text-foreground">인기 한복샵</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              전통과 현대가 어우러진 한복
            </p>
          </div>
          <button className="flex items-center gap-1 text-sm text-primary font-medium">
            전체보기
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 px-4">
          {hanbokItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/hanbok/${item.id}`)}
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

export default Hanbok;
