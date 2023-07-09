import { getCookie } from "@utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useLogged = () => {
  const router = useRouter();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (getCookie("hurmaLogged")) {
      setLogged(true);
      router.push("/links");
      return;
    }

    router.replace("/login");
  }, []);

  return logged;
};
