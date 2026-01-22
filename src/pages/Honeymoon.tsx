import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Plane, Star, MapPin, ChevronRight } from "lucide-react";

const honeymoonItems = [
  { id: "1", name: "몰디브 5박 7일", location: "몰디브", priceRange: "650만원~", rating: 4.9, reviewCount: 234, imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400", type: "리조트" },
  { id: "2", name: "발리 럭셔리 투어", location: "인도네시아", priceRange: "380만원~", rating: 4.8, reviewCount: 567, imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400", type: "투어" },
  { id: "3", name: "유럽 로맨틱 투어", location: "프랑스/이탈리아", priceRange: "520만원~", rating: 4.7, reviewCount: 345, imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400", type: "투어" },
  { id: "4", name: "하와이 올인클루시브", location: "미국 하와이", priceRange: "480만원~", rating: 4.8, reviewCount: 421, imageUrl: "https://images.unsplash.com/photo-1507876466758-bc54f384809c?w=400", type: "리조트" },
  { id: "5", name: "산토리니 6박 8일", location: "그리스", priceRange: "590만원~", rating: 4.9, reviewCount: 289, imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400", type: "리조트" },
  { id: "6", name: "푸켓 프리미엄", location: "태국", priceRange: "280만원~", rating: 4.6, reviewCount: 456, imageUrl: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400", type: "투어" },
];

const Honeymoon = () => {
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
          <h1 className="text-lg font-bold text-foreground">허니문</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">전세계</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-sky-100/50 via-sky-50/30 to-background px-4 py-8 overflow-hidden">
          <div className="absolute top-4 right-4 w-24 h-24 bg-sky-200/30 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-100 rounded-full mb-3">
              <Plane className="w-4 h-4 text-sky-600" />
              <span className="text-xs font-medium text-sky-600">허니문 여행</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              신혼여행,<br />
              <span className="text-sky-600">어디로 갈까?</span> 맞춤 추천
            </h2>
            <p className="text-sm text-muted-foreground">
              발리, 몰디브, 유럽 등 인기 허니문 패키지
            </p>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
          {["전체", "리조트", "투어", "동남아", "유럽", "미주"].map((filter, index) => (
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
            <h2 className="text-lg font-bold text-foreground">인기 허니문</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              예비부부가 가장 많이 선택한 여행지
            </p>
          </div>
          <button className="flex items-center gap-1 text-sm text-primary font-medium">
            전체보기
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 px-4">
          {honeymoonItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/honeymoon/${item.id}`)}
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

export default Honeymoon;
