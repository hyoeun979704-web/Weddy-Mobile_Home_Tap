import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Camera, Star, MapPin, ChevronRight } from "lucide-react";

const studioItems = [
  { id: "1", name: "라움 스튜디오", location: "서울 강남구", priceRange: "350만원~", rating: 4.9, reviewCount: 521, imageUrl: "https://images.unsplash.com/photo-1595407753234-0882f1e77954?w=400", type: "스튜디오" },
  { id: "2", name: "소렐라 드레스", location: "서울 종로구", priceRange: "200만원~", rating: 4.7, reviewCount: 312, imageUrl: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=400", type: "드레스" },
  { id: "3", name: "메이크업 바이 제니", location: "서울 마포구", priceRange: "80만원~", rating: 4.8, reviewCount: 445, imageUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400", type: "메이크업" },
  { id: "4", name: "프리미엄 스드메", location: "서울 송파구", priceRange: "500만원~", rating: 4.9, reviewCount: 678, imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400", type: "패키지" },
  { id: "5", name: "블러썸 스튜디오", location: "서울 서초구", priceRange: "280만원~", rating: 4.8, reviewCount: 389, imageUrl: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400", type: "스튜디오" },
  { id: "6", name: "그레이스 드레스", location: "서울 강남구", priceRange: "180만원~", rating: 4.6, reviewCount: 234, imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400", type: "드레스" },
];

const Studios = () => {
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
          <h1 className="text-lg font-bold text-foreground">스드메</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">서울</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-violet-100/50 via-violet-50/30 to-background px-4 py-8 overflow-hidden">
          <div className="absolute top-4 right-4 w-24 h-24 bg-violet-200/30 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-100 rounded-full mb-3">
              <Camera className="w-4 h-4 text-violet-600" />
              <span className="text-xs font-medium text-violet-600">스튜디오·드레스·메이크업</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              완벽한 웨딩 화보,<br />
              <span className="text-violet-600">스드메 패키지</span>로 한 번에
            </h2>
            <p className="text-sm text-muted-foreground">
              인기 스드메 업체 비교부터 실시간 예약까지
            </p>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
          {["전체", "스튜디오", "드레스", "메이크업", "패키지"].map((filter, index) => (
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
            <h2 className="text-lg font-bold text-foreground">인기 스드메</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              신뢰할 수 있는 파트너 업체
            </p>
          </div>
          <button className="flex items-center gap-1 text-sm text-primary font-medium">
            전체보기
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 px-4">
          {studioItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/studios/${item.id}`)}
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

export default Studios;
