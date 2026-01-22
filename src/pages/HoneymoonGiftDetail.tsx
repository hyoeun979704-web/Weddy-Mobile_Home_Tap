import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Star, Phone, Share2, ChevronRight, Gift, Truck, Tag, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { FavoriteButton } from "@/components/FavoriteButton";

type HoneymoonGift = Tables<"honeymoon_gifts">;

const HoneymoonGiftDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: gift, isLoading, error } = useQuery({
    queryKey: ["honeymoon-gift", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("honeymoon_gifts")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as HoneymoonGift;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error || !gift) {
    return (
      <div className="min-h-screen bg-background max-w-[430px] mx-auto flex flex-col items-center justify-center p-4">
        <span className="text-4xl mb-4">😢</span>
        <p className="text-muted-foreground text-center mb-4">
          혼수 정보를 찾을 수 없습니다.
        </p>
        <Button onClick={() => navigate("/honeymoon-gifts")}>목록으로 돌아가기</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto animate-fade-in">
      {/* Header Image */}
      <div className="relative">
        <div className="aspect-[4/3] bg-muted">
          {gift.thumbnail_url ? (
            <img
              src={gift.thumbnail_url}
              alt={gift.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
              <span className="text-8xl">🎁</span>
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
              itemId={gift.id}
              itemType="honeymoon_gift"
              variant="overlay"
            />
          </div>
        </div>

        {gift.is_partner && (
          <span className="absolute bottom-4 left-4 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-lg">
            파트너 브랜드
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Rating */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">{gift.brand}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{gift.name}</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-lg">{gift.rating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground text-sm">
              리뷰 {gift.review_count.toLocaleString()}개
            </span>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-card border border-border rounded-xl p-5 mb-4 shadow-sm">
          <h2 className="font-bold text-lg mb-4">가격 정보</h2>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">판매가</span>
            <span className="text-xl font-bold text-primary">{gift.price_range}</span>
          </div>
        </div>

        {/* Category Types */}
        {gift.category_types && gift.category_types.length > 0 && (
          <div className="mb-4">
            <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              카테고리
            </h2>
            <div className="flex flex-wrap gap-2">
              {gift.category_types.map((type, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Brand Options */}
        {gift.brand_options && gift.brand_options.length > 0 && (
          <div className="mb-4">
            <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" />
              관련 브랜드
            </h2>
            <div className="flex flex-wrap gap-2">
              {gift.brand_options.map((brand, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-sm">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Delivery Options */}
        {gift.delivery_options && gift.delivery_options.length > 0 && (
          <div className="mb-4">
            <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              배송 옵션
            </h2>
            <div className="bg-muted/50 rounded-xl p-4">
              <ul className="space-y-2">
                {gift.delivery_options.map((option, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Gift className="w-4 h-4 text-green-500" />
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Gallery */}
        <div className="mb-4">
          <h2 className="font-bold text-lg mb-3">상품 이미지</h2>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-2xl opacity-50">🎁</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg">구매 후기</h2>
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
                    <p className="font-medium text-sm">구매자{i}</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  품질이 정말 좋아요! 배송도 빠르고 포장도 꼼꼼하게 되어있었습니다.
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
            문의하기
          </Button>
          <Button className="flex-1 h-12">구매하기</Button>
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

export default HoneymoonGiftDetail;
