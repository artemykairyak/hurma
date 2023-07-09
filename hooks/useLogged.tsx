import { Routes } from "@enums/routes";
import { getCookie } from "@utils/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useLogged = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (getCookie("hurmaLogged")) {
      setLogged(true);
      if (pathname === Routes.Login || pathname === Routes.SignUp) {
        router.replace(Routes.Links);
      }

      return;
    }

    router.replace(Routes.Login);
  }, []);

  return logged;
};
