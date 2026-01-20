import { ChevronRight } from "lucide-react";

interface GalleryItemProps {
  imageUrl: string;
  label: string;
}

const GalleryItem = ({ imageUrl, label }: GalleryItemProps) => (
  <button className="relative aspect-[3/4] rounded-xl overflow-hidden group">
    <img 
      src={imageUrl} 
      alt={label}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      onError={(e) => {
        e.currentTarget.src = "/placeholder.svg";
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    <span className="absolute bottom-2 left-2 text-xs font-medium text-white">{label}</span>
  </button>
);

const StudioGallery = () => {
  // Dummy data - will be replaced with Supabase data
  const galleryItems = [
    {
      imageUrl: "https://images.unsplash.com/photo-1595407753234-0882f1e77954?w=300",
      label: "스튜디오A",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=300",
      label: "드레스샵B",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=300",
      label: "메이크업C",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300",
      label: "스튜디오D",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300",
      label: "드레스샵E",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=300",
      label: "메이크업F",
    },
  ];

  return (
    <section className="py-6 bg-muted/30">
      <div className="flex items-center justify-between px-4 mb-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">실시간 스드메 화보</h2>
          <p className="text-xs text-muted-foreground mt-0.5">스튜디오·드레스·메이크업</p>
        </div>
        <button className="flex items-center gap-1 text-sm text-primary font-medium">
          더보기
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-2 px-4">
        {galleryItems.map((item, index) => (
          <GalleryItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default StudioGallery;
