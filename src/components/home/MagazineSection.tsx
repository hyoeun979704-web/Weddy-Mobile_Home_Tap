import { ChevronRight, Music, Camera, CheckSquare, Heart, Sparkles, Lightbulb } from "lucide-react";

interface MagazineCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const MagazineCard = ({ icon: Icon, title, description, color }: MagazineCardProps) => (
  <button className="flex-shrink-0 w-40 p-4 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 text-left">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <h4 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">{title}</h4>
    <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
  </button>
);

const MagazineSection = () => {
  // Dummy data - will be replaced with Supabase data
  const articles = [
    {
      icon: Music,
      title: "2025 인기 입장곡 TOP 20",
      description: "분위기별 추천 입장곡 모음",
      color: "bg-pink-100 text-pink-500",
    },
    {
      icon: Camera,
      title: "스냅 촬영 베스트 포즈",
      description: "자연스러운 커플 포즈 가이드",
      color: "bg-violet-100 text-violet-500",
    },
    {
      icon: CheckSquare,
      title: "결혼 준비 체크리스트",
      description: "D-365부터 D-Day까지",
      color: "bg-emerald-100 text-emerald-500",
    },
    {
      icon: Heart,
      title: "예비부부 필독 꿀팁",
      description: "선배 신부가 알려주는 노하우",
      color: "bg-rose-100 text-rose-500",
    },
    {
      icon: Sparkles,
      title: "2025 웨딩 트렌드",
      description: "올해 주목할 웨딩 스타일",
      color: "bg-amber-100 text-amber-500",
    },
    {
      icon: Lightbulb,
      title: "예산 절약 꿀팁",
      description: "스마트한 웨딩 비용 관리법",
      color: "bg-sky-100 text-sky-500",
    },
  ];

  return (
    <section className="py-6">
      <div className="flex items-center justify-between px-4 mb-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">웨딩 매거진</h2>
          <p className="text-xs text-muted-foreground mt-0.5">예비부부를 위한 꿀팁</p>
        </div>
        <button className="flex items-center gap-1 text-sm text-primary font-medium">
          전체보기
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {articles.map((article, index) => (
          <MagazineCard key={index} {...article} />
        ))}
      </div>
    </section>
  );
};

export default MagazineSection;
