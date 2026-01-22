import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Star, MapPin, Phone, Share2, ChevronRight, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { FavoriteButton } from "@/components/FavoriteButton";

type Hanbok = Tables<"hanbok">;

const HanbokDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: hanbok, isLoading, error } = useQuery({
    queryKey: ["hanbok", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hanbok")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as Hanbok;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error || !hanbok) {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto flex flex-col items-center justify-center p-4">
        <span className="text-4xl mb-4">😢</span>
        <p className="text-muted-foreground text-center mb-4">
          한복 정보를 찾을 수 없습니다.
        </p>
        <Button onClick={() => navigate("/hanbok")}>목록으로 돌아가기</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto animate-fade-in">
      {/* Header Image */}
      <div className="relative">
        <div className="aspect-[4/3] bg-muted">
          {hanbok.thumbnail_url ? (
            <img
              src={hanbok.thumbnail_url}
              alt={hanbok.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-rose-200 to-pink-300 flex items-center justify-center">
              <span className="text-8xl">👗</span>
            </div>
          )}
        </div>

        {/* Fixed Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
              <Share2 className="w-5 h-5" />
            </button>
            <FavoriteButton
              itemId={hanbok.id}
              itemType="hanbok"
              variant="overlay"
            />
          </div>
        </div>

        {hanbok.is_partner && (
          <span className="absolute bottom-4 left-4 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-lg">
            파트너 한복점
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Rating */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground mb-2">{hanbok.name}</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-lg">{hanbok.rating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground text-sm">
              리뷰 {hanbok.review_count.toLocaleString()}개
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3 p-4 bg-secondary rounded-xl mb-4">
          <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-foreground">{hanbok.address}</p>
            <button className="text-primary text-sm mt-1 flex items-center gap-1">
              지도에서 보기
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-card border border-border rounded-xl p-5 mb-4 shadow-sm">
          <h2 className="font-bold text-lg mb-4">가격 정보</h2>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">한복 가격</span>
            <span className="text-xl font-bold text-primary">{hanbok.price_range}</span>
          </div>
        </div>

        {/* Hanbok Types */}
        {hanbok.hanbok_types && hanbok.hanbok_types.length > 0 && (
          <div className="mb-4">
            <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              한복 종류
            </h2>
            <div className="flex flex-wrap gap-2">
              {hanbok.hanbok_types.map((type, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Style Options */}
        {hanbok.style_options && hanbok.style_options.length > 0 && (
          <div className="mb-4">
            <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              스타일
            </h2>
            <div className="flex flex-wrap gap-2">
              {hanbok.style_options.map((style, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-sm">
                  {style}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Service Options */}
        {hanbok.service_options && hanbok.service_options.length > 0 && (
          <div className="mb-4">
            <h2 className="font-bold text-lg mb-3">서비스 옵션</h2>
            <div className="flex flex-wrap gap-2">
              {hanbok.service_options.map((service, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-sm">
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        <div className="mb-4">
          <h2 className="font-bold text-lg mb-3">한복 갤러리</h2>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-2xl opacity-50">👗</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg">후기</h2>
            <button className="text-primary text-sm flex items-center gap-1">
              전체보기
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-secondary rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-muted rounded-full" />
                  <div>
                    <p className="font-medium text-sm">신부{i}</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  한복이 정말 예쁘고 색감이 화사해요! 사장님도 친절하시고 좋은 경험이었습니다.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 max-w-[430px] mx-auto">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 h-12 gap-2">
            <Phone className="w-4 h-4" />
            전화 문의
          </Button>
          <Button className="flex-1 h-12">예약하기</Button>
        </div>
      </div>
    </div>
  );
};

const DetailSkeleton = () => (
  <div className="min-h-screen bg-background max-w-[430px] mx-auto">
    <Skeleton className="aspect-[4/3] w-full" />
    <div className="p-5 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-20 w-full rounded-xl" />
      <Skeleton className="h-40 w-full rounded-xl" />
    </div>
  </div>
);

export default HanbokDetail;
