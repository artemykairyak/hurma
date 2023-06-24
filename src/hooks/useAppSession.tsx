import { protectedRoutes } from '@constants/constants';
import { Routes } from '@enums/routes';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

export const useAppSession = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      if (protectedRoutes.includes(pathname as Routes)) {
        router.replace(Routes.Login);
      }
    },
  });

  return { loading: status === 'loading' };
};
