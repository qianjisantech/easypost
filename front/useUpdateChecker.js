import { useEffect } from 'react';

export function useUpdateChecker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const handleUpdate = (registration) => {
        if (registration.waiting) {
          // 检测到新版本
          if (confirm('新版本已发布，是否立即更新？')) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
        }
      };

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });

      navigator.serviceWorker.register('/sw.js').then(registration => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              handleUpdate(registration);
            }
          });
        });
      });
    }
  }, []);
}