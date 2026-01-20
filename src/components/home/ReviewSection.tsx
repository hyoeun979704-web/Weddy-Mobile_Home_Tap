import { ChevronRight, Star, Quote } from "lucide-react";

interface ReviewCardProps {
  rating: number;
  review: string;
  vendorName: string;
  vendorType: string;
  userName: string;
  date: string;
}

const ReviewCard = ({ rating, review, vendorName, vendorType, userName, date }: ReviewCardProps) => (
  <div className="flex-shrink-0 w-72 p-4 bg-card rounded-2xl border border-border">
    <div className="flex items-center gap-2 mb-3">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted'}`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">{date}</span>
    </div>
    
    <div className="relative mb-3">
      <Quote className="absolute -top-1 -left-1 w-4 h-4 text-primary/20" />
      <p className="text-sm text-foreground leading-relaxed line-clamp-3 pl-3">
        {review}
      </p>
    </div>
    
    <div className="flex items-center justify-between pt-3 border-t border-border">
      <div>
        <p className="text-xs font-medium text-foreground">{vendorName}</p>
        <p className="text-xs text-muted-foreground">{vendorType}</p>
      </div>
      <p className="text-xs text-muted-foreground">{userName}</p>
    </div>
  </div>
);

const ReviewSection = () => {
  // Dummy data - will be replaced with Supabase data
  const reviews = [
    {
      rating: 5,
      review: "처음부터 끝까지 정말 만족스러웠어요. 특히 담당 플래너분이 꼼꼼하게 챙겨주셔서 너무 감사했습니다!",
      vendorName: "더채플앳청담",
      vendorType: "웨딩홀",
      userName: "김**님",
      date: "2025.01.15",
    },
    {
      rating: 5,
      review: "드레스가 정말 다양하고 예뻤어요. 피팅 때마다 친절하게 도와주셔서 좋은 선택할 수 있었습니다.",
      vendorName: "라움스튜디오",
      vendorType: "스튜디오",
      userName: "이**님",
      date: "2025.01.12",
    },
    {
      rating: 4,
      review: "음식이 정말 맛있었다고 하객분들께서 많이 칭찬해주셨어요. 서비스도 전반적으로 좋았습니다.",
      vendorName: "그랜드힐튼",
      vendorType: "웨딩홀",
      userName: "박**님",
      date: "2025.01.10",
    },
    {
      rating: 5,
      review: "메이크업 너무 자연스럽게 해주셨어요. 어머니들 메이크업도 같이 해주셨는데 다들 만족하셨습니다.",
      vendorName: "블러썸뷰티",
      vendorType: "메이크업",
      userName: "최**님",
      date: "2025.01.08",
    },
  ];

  return (
    <section className="py-6 bg-accent/30">
      <div className="flex items-center justify-between px-4 mb-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">예비부부 리얼 후기</h2>
          <p className="text-xs text-muted-foreground mt-0.5">실제 결혼 준비 경험담</p>
        </div>
        <button className="flex items-center gap-1 text-sm text-primary font-medium">
          더보기
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
