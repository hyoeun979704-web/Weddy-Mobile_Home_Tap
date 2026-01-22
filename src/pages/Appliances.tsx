import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Tv, Star, MapPin, ChevronRight } from "lucide-react";

const applianceItems = [
  { id: "1", name: "까르띠에 러브링", location: "서울 청담", priceRange: "350만원~", rating: 4.9, reviewCount: 234, imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400", type: "예물" },
  { id: "2", name: "티파니 웨딩밴드", location: "서울 강남", priceRange: "280만원~", rating: 4.8, reviewCount: 189, imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400", type: "예물" },
  { id: "3", name: "삼성 TV 패키지", location: "온라인", priceRange: "450만원~", rating: 4.7, reviewCount: 567, imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400", type: "가전" },
  { id: "4", name: "LG 생활가전 세트", location: "온라인", priceRange: "620만원~", rating: 4.8, reviewCount: 432, imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", type: "가전" },
  { id: "5", name: "불가리 비제로원", location: "서울 청담", priceRange: "420만원~", rating: 4.9, reviewCount: 178, imageUrl: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400", type: "예물" },
  { id: "6", name: "다이슨 홈케어 세트", location: "온라인", priceRange: "180만원~", rating: 4.6, reviewCount: 678, imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400", type: "가전" },
];

const Appliances = () => {
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
          <h1 className="text-lg font-bold text-foreground">가전·예물</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">전국</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-emerald-100/50 via-emerald-50/30 to-background px-4 py-8 overflow-hidden">
          <div className="absolute top-4 right-4 w-24 h-24 bg-emerald-200/30 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 rounded-full mb-3">
              <Tv className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-600">가전·예물</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              가전·예물 준비,<br />
              <span className="text-emerald-600">최저가 비교</span>로 똑똑하게
            </h2>
            <p className="text-sm text-muted-foreground">
              삼성, LG 가전 특가부터 예물 브랜드 할인까지
            </p>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
          {["전체", "예물", "가전", "시계", "명품"].map((filter, index) => (
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
            <h2 className="text-lg font-bold text-foreground">인기 가전·예물</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              예비부부가 가장 많이 선택한 상품
            </p>
          </div>
          <button className="flex items-center gap-1 text-sm text-primary font-medium">
            전체보기
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 px-4">
          {applianceItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/appliances/${item.id}`)}
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

export default Appliances;
