// components/RouteGuard.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RouteGuard = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const isAuthenticated = false; // 替换为你的认证逻辑

    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!isAuthenticated) {
        router.push('/login'); // 未认证跳转到登录页
      }
    }, [isAuthenticated, router]);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default RouteGuard;