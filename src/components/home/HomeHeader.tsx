import { useState } from "react";
import { Search, Bell, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const HomeHeader = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log("Searching for:", searchQuery);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    /* Note: top-0 and z-50 ensure header stays above CategoryTabBar */
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-1"
        >
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">W</span>
          </div>
          <span className="text-lg font-bold text-foreground">웨딩플래너</span>
        </button>

        {/* Right Icons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
          <button 
            onClick={() => navigate("/notifications")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors relative"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </button>
          <button 
            onClick={() => navigate("/mypage")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <User className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-0 h-14 bg-card z-10 flex items-center px-4 gap-2">
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <Input
              type="text"
              placeholder="웨딩홀, 스튜디오, 드레스 등 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
              autoFocus
            />
          </form>
          <button 
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      )}
    </header>
  );
};

export default HomeHeader;
