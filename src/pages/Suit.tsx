import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Shirt, Star, MapPin, ChevronRight } from "lucide-react";

const suitItems = [
  { id: "1", name: "보스 수트 강남", location: "서울 강남구", priceRange: "150만원~", rating: 4.8, reviewCount: 234, imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400", type: "수트" },
  { id: "2", name: "제니아 맞춤정장", location: "서울 청담", priceRange: "280만원~", rating: 4.9, reviewCount: 178, imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400", type: "맞춤" },
  { id: "3", name: "턱시도 하우스", location: "서울 종로", priceRange: "80만원~", rating: 4.6, reviewCount: 312, imageUrl: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400", type: "렌탈" },
  { id: "4", name: "그룸스 스타일", location: "서울 마포", priceRange: "120만원~", rating: 4.7, reviewCount: 245, imageUrl: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=400", type: "수트" },
  { id: "5", name: "아르마니 웨딩", location: "서울 청담", priceRange: "350만원~", rating: 4.9, reviewCount: 156, imageUrl: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400", type: "맞춤" },
  { id: "6", name: "클래식 턱시도", location: "서울 강남", priceRange: "95만원~", rating: 4.5, reviewCount: 289, imageUrl: "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=400", type: "렌탈" },
];

const Suit = () => {
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
          <h1 className="text-lg font-bold text-foreground">예복</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">서울</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-slate-100/50 via-slate-50/30 to-background px-4 py-8 overflow-hidden">
          <div className="absolute top-4 right-4 w-24 h-24 bg-slate-200/30 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full mb-3">
              <Shirt className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-medium text-slate-600">예복</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              신랑 예복,<br />
              <span className="text-slate-600">스타일부터 맞춤까지</span> 한 번에
            </h2>
            <p className="text-sm text-muted-foreground">
              턱시도, 수트 렌탈 및 맞춤 인기 예복샵 비교
            </p>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
          {["전체", "수트", "턱시도", "맞춤", "렌탈"].map((filter, index) => (
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
            <h2 className="text-lg font-bold text-foreground">인기 예복샵</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              신뢰할 수 있는 파트너 예복샵
            </p>
          </div>
          <button className="flex items-center gap-1 text-sm text-primary font-medium">
            전체보기
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 px-4">
          {suitItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/suit/${item.id}`)}
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

export default Suit;
