import { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { toast } from '@/components/ui/use-toast';

export const PWAUpdatePrompt = () => {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered:', r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      toast({
        title: "새로운 버전이 있습니다",
        description: "앱을 업데이트하시겠습니까?",
        action: (
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={() => updateServiceWorker(true)}
          >
            업데이트
          </button>
        ),
        duration: 10000,
      });
    }
  }, [needRefresh, updateServiceWorker]);

  return null;
};
