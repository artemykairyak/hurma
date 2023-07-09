import { ProfilePage } from "@components/pages/ProfilePage/ProfilePage";
import {
  getProfile,
  IProfile,
} from "@services/apiService/endpoints/profileApi";
import { AxiosRequestConfig } from "axios";
import { GetServerSideProps } from "next";

export interface ProfileProps {
  profile: IProfile;
}

export default function Profile(profile: IProfile) {
  return <ProfilePage profile={profile} />;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookiesHeader = { headers: { cookie: req.headers.cookie } };

  try {
    const [profile] = await getProfile({
      ...cookiesHeader,
    } as AxiosRequestConfig);
    console.log(profile);
    return { props: profile };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};
