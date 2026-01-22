import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Plus, Check, Trash2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ScheduleItem {
  id: number;
  title: string;
  date: string;
  completed: boolean;
}

const initialSchedule: ScheduleItem[] = [
  { id: 1, title: "웨딩홀 투어", date: "2025-02-01", completed: true },
  { id: 2, title: "스튜디오 상담", date: "2025-02-10", completed: false },
  { id: 3, title: "드레스 피팅", date: "2025-02-15", completed: false },
  { id: 4, title: "청첩장 디자인 확정", date: "2025-03-01", completed: false },
  { id: 5, title: "허니문 예약", date: "2025-03-15", completed: false },
];

const MySchedule = () => {
  const navigate = useNavigate();
  const [weddingDate, setWeddingDate] = useState("2025-06-15");
  const [schedule, setSchedule] = useState<ScheduleItem[]>(initialSchedule);
  const [newTask, setNewTask] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const daysUntilWedding = () => {
    const wedding = new Date(weddingDate);
    const today = new Date();
    const diff = Math.ceil((wedding.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const toggleComplete = (id: number) => {
    setSchedule(schedule.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addTask = () => {
    if (!newTask.trim() || !newTaskDate) {
      toast.error("일정과 날짜를 입력해주세요");
      return;
    }
    const newItem: ScheduleItem = {
      id: Date.now(),
      title: newTask,
      date: newTaskDate,
      completed: false,
    };
    setSchedule([...schedule, newItem].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setNewTask("");
    setNewTaskDate("");
    toast.success("일정이 추가되었습니다");
  };

  const deleteTask = (id: number) => {
    setSchedule(schedule.filter(item => item.id !== id));
    toast.success("일정이 삭제되었습니다");
  };

  const handleSaveWeddingDate = () => {
    setIsEditing(false);
    toast.success("결혼식 날짜가 저장되었습니다");
  };

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto relative">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center h-14 px-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center font-semibold text-lg pr-10">내 웨딩 일정</h1>
        </div>
      </header>

      <main className="pb-20">
        {/* D-Day Card */}
        <div className="p-4">
          <div className="p-6 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl border border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">결혼식까지</p>
                <p className="text-4xl font-bold text-primary">D-{daysUntilWedding()}</p>
              </div>
              <Calendar className="w-12 h-12 text-primary/50" />
            </div>
            
            {isEditing ? (
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSaveWeddingDate} size="sm">저장</Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{weddingDate}</p>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  날짜 변경
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Add Task */}
        <div className="px-4 py-2">
          <div className="p-4 bg-card rounded-2xl border border-border">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              새 일정 추가
            </h3>
            <div className="space-y-2">
              <Input
                placeholder="일정 제목"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={newTaskDate}
                  onChange={(e) => setNewTaskDate(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addTask}>추가</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule List */}
        <div className="p-4">
          <h2 className="font-bold text-foreground mb-4">웨딩 체크리스트</h2>
          <div className="space-y-2">
            {schedule.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-4 bg-card rounded-xl border border-border ${
                  item.completed ? "opacity-60" : ""
                }`}
              >
                <button
                  onClick={() => toggleComplete(item.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    item.completed
                      ? "bg-primary border-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {item.completed && <Check className="w-4 h-4 text-primary-foreground" />}
                </button>
                <div className="flex-1">
                  <p className={`font-medium text-sm ${item.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <button
                  onClick={() => deleteTask(item.id)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav activeTab="/mypage" onTabChange={(href) => navigate(href)} />
    </div>
  );
};

export default MySchedule;
