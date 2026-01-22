import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Clock, CheckCircle, XCircle } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const orders = [
  { 
    id: 1, 
    name: "더채플앳청담 웨딩홀", 
    category: "웨딩홀",
    date: "2025-06-15", 
    status: "confirmed",
    price: "3,500,000원",
    orderDate: "2025-01-15"
  },
  { 
    id: 2, 
    name: "루미에르 스튜디오", 
    category: "스튜디오",
    date: "2025-05-20", 
    status: "pending",
    price: "1,200,000원",
    orderDate: "2025-01-18"
  },
  { 
    id: 3, 
    name: "몰디브 허니문 패키지", 
    category: "허니문",
    date: "2025-06-20", 
    status: "confirmed",
    price: "4,500,000원",
    orderDate: "2025-01-20"
  },
];

const statusConfig = {
  confirmed: { label: "예약확정", icon: CheckCircle, color: "text-green-500" },
  pending: { label: "대기중", icon: Clock, color: "text-amber-500" },
  cancelled: { label: "취소됨", icon: XCircle, color: "text-destructive" },
};

const Orders = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto relative">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center h-14 px-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center font-semibold text-lg pr-10">주문내역</h1>
        </div>
      </header>

      <main className="pb-20">
        {orders.length > 0 ? (
          <div className="p-4 space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              
              return (
                <div key={order.id} className="bg-card rounded-2xl border border-border p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs text-muted-foreground">{order.category}</span>
                      <h3 className="font-bold text-foreground">{order.name}</h3>
                    </div>
                    <div className={`flex items-center gap-1 ${status.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{status.label}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">예약일</span>
                      <span className="text-foreground">{order.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">결제금액</span>
                      <span className="font-bold text-primary">{order.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">주문일</span>
                      <span className="text-foreground">{order.orderDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 py-2 bg-muted text-muted-foreground rounded-xl text-sm font-medium">
                      상세보기
                    </button>
                    <button className="flex-1 py-2 bg-primary/10 text-primary rounded-xl text-sm font-medium">
                      문의하기
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <Package className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">주문 내역이 없습니다</p>
          </div>
        )}
      </main>

      <BottomNav activeTab="/mypage" onTabChange={(href) => navigate(href)} />
    </div>
  );
};

export default Orders;
