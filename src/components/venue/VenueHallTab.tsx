import { useState } from "react";
import { Users, Utensils, Star, Sparkles, Building2, DollarSign, Flower2, Wine, ChevronLeft, ChevronRight } from "lucide-react";

interface HallInfo {
  name: string;
  type: string;
  ceremonyInterval: string;
  minCapacity: number;
  seatCapacity: number;
  maxCapacity: number;
  menuType: string;
  priceMin: number;
  priceMax: number;
  rentalFee: number | null;
  productionFee: number;
  flowerType: string;
  flowerPrice: number;
  drinkType: string;
}

interface VenueHallTabProps {
  hallTypes?: string[] | null;
  mealOptions?: string[] | null;
  eventOptions?: string[] | null;
  pricePerPerson: number;
  minGuarantee: number;
}

const formatKoreanWon = (price: number): string => {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(0)}천만원`;
  }
  if (price >= 10000) {
    return `${(price / 10000).toLocaleString()}만원`;
  }
  return `${price.toLocaleString()}원`;
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const InfoCard = ({ icon, title, children }: InfoCardProps) => (
  <div className="bg-background border border-border rounded-xl p-4 flex flex-col items-center text-center">
    <div className="text-muted-foreground mb-2">{icon}</div>
    <h4 className="text-sm font-bold text-foreground mb-2">{title}</h4>
    <div className="text-sm text-muted-foreground space-y-0.5">{children}</div>
  </div>
);

const VenueHallTab = ({ 
  hallTypes = [], 
  mealOptions = [], 
  eventOptions = [],
  pricePerPerson,
  minGuarantee
}: VenueHallTabProps) => {
  const [currentHallIndex, setCurrentHallIndex] = useState(0);
  
  const halls = hallTypes || [];
  const meals = mealOptions || [];
  const events = eventOptions || [];

  // Generate mock hall data based on hallTypes
  const hallNames = halls.length > 0 
    ? halls 
    : ["그랜드볼룸", "크리스탈홀", "가든홀"];

  const hallsData: HallInfo[] = hallNames.map((name, index) => {
    const baseCapacity = minGuarantee + (index * 50);
    const basePriceVariation = index * 10000;
    
    return {
      name,
      type: index === 0 ? "호텔" : index === 1 ? "컨벤션" : "가든",
      ceremonyInterval: index === 0 ? "동시/240분" : "순차/180분",
      minCapacity: Math.max(100, baseCapacity - 100),
      seatCapacity: baseCapacity,
      maxCapacity: baseCapacity + Math.round(baseCapacity * 0.2),
      menuType: meals.length > 0 ? meals[0] : "양식",
      priceMin: pricePerPerson + basePriceVariation,
      priceMax: pricePerPerson + basePriceVariation + 40000,
      rentalFee: index === 0 ? null : 5000000 + (index * 1000000),
      productionFee: (pricePerPerson + basePriceVariation) * baseCapacity * 0.05,
      flowerType: "생화",
      flowerPrice: 15000000 + (index * 3000000),
      drinkType: "당일소모량"
    };
  });

  const currentHall = hallsData[currentHallIndex];

  const handlePrev = () => {
    setCurrentHallIndex((prev) => (prev === 0 ? hallsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentHallIndex((prev) => (prev === hallsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="p-4 space-y-6">
      {/* Price Summary Card - TOP */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-5">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          예상 비용
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">식대 (1인)</p>
            <p className="text-xl font-bold text-primary">
              {formatKoreanWon(currentHall.priceMin)}
            </p>
          </div>
          <div className="bg-background rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">최소 보증인원</p>
            <p className="text-xl font-bold text-foreground">
              {currentHall.minCapacity}명
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">예상 최소 비용</span>
            <span className="text-lg font-bold">
              {formatKoreanWon(currentHall.priceMin * currentHall.minCapacity)}
            </span>
          </div>
        </div>
      </div>

      {/* Hall Carousel */}
      <div className="space-y-4">
        {/* Hall Selector Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            홀 상세정보
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{currentHallIndex + 1} / {hallsData.length}</span>
          </div>
        </div>

        {/* Hall Tab Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {hallsData.map((hall, index) => (
            <button
              key={index}
              onClick={() => setCurrentHallIndex(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                index === currentHallIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {hall.name}
            </button>
          ))}
        </div>

        {/* Hall Detail Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border">
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentHallIndex * 100}%)` }}
            >
              {hallsData.map((hall, index) => (
                <div key={index} className="min-w-full p-4 bg-background">
                  {/* Hall Name Badge */}
                  <div className="text-center mb-4">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full">
                      {hall.name}
                    </span>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* 홀타입/예식 형태/간격 */}
                    <InfoCard 
                      icon={<Building2 className="w-6 h-6" />}
                      title="홀타입/예식 형태/간격"
                    >
                      <p>{hall.type}</p>
                      <p>{hall.ceremonyInterval}</p>
                    </InfoCard>

                    {/* 수용 인원 */}
                    <InfoCard 
                      icon={<Users className="w-6 h-6" />}
                      title="수용 인원"
                    >
                      <p>최소 {hall.minCapacity}명</p>
                      <p>좌석 {hall.seatCapacity}명</p>
                      <p>최대 {hall.maxCapacity}명</p>
                    </InfoCard>

                    {/* 메뉴/식대 */}
                    <InfoCard 
                      icon={<Utensils className="w-6 h-6" />}
                      title="메뉴/식대"
                    >
                      <p>{hall.menuType}</p>
                      <p>{formatKoreanWon(hall.priceMin)}</p>
                      <p>~{formatKoreanWon(hall.priceMax)}</p>
                    </InfoCard>

                    {/* 대관료/연출료 */}
                    <InfoCard 
                      icon={<DollarSign className="w-6 h-6" />}
                      title="대관료/연출료"
                    >
                      <p>대관료 {hall.rentalFee ? formatKoreanWon(hall.rentalFee) : "없음"}</p>
                      <p>연출료 있음</p>
                      <p>{formatKoreanWon(hall.productionFee)}</p>
                    </InfoCard>

                    {/* 꽃장식 */}
                    <InfoCard 
                      icon={<Flower2 className="w-6 h-6" />}
                      title="꽃장식"
                    >
                      <p>{hall.flowerType}</p>
                      <p>{formatKoreanWon(hall.flowerPrice)}</p>
                    </InfoCard>

                    {/* 음주류 */}
                    <InfoCard 
                      icon={<Wine className="w-6 h-6" />}
                      title="음주류"
                    >
                      <p>{hall.drinkType}</p>
                    </InfoCard>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {hallsData.length > 1 && (
            <>
              <button 
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-background transition-colors border border-border"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-background transition-colors border border-border"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {hallsData.length > 1 && (
          <div className="flex justify-center gap-1.5">
            {hallsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHallIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentHallIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Meal Options */}
      {meals.length > 0 && (
        <div>
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-primary" />
            식사 옵션
          </h3>
          <div className="flex flex-wrap gap-2">
            {meals.map((option, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-secondary rounded-full text-sm font-medium"
              >
                {option}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Event Options */}
      {events.length > 0 && (
        <div>
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            이벤트 옵션
          </h3>
          <div className="flex flex-wrap gap-2">
            {events.map((option, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-secondary rounded-full text-sm font-medium"
              >
                {option}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueHallTab;