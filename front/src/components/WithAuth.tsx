// components/withAuth.js
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const WithAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      // 检查登录状态（示例使用 localStorage）
      const isAuthenticated = localStorage.getItem('token');

      if (!isAuthenticated) {
        // 可以存储原始目标路径，登录后跳转回来
        sessionStorage.setItem('redirectPath', router.asPath);
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  // 复制静态方法（如果需要）
  if (WrappedComponent.getInitialProps) {
    Wrapper.getInitialProps = WrappedComponent.getInitialProps;
  }

  return Wrapper;
};

export default WithAuth;