import { ProfilePage } from '@components/pages/ProfilePage/ProfilePage';
import { authInstance, handleResponse } from '@services/apiServices';
import { cookies } from 'next/headers';

export const Profile = async (props) => {
  console.log('eeee', props);

  return <ProfilePage />;
};

export async function getServerSideProps(context) {
  const res = await authInstance.get('/profile', {
    headers: { Cookie: cookies().get('token') || '' },
  });

  console.log(res);

  const [data, error] = await handleResponse(res);

  if (error) {
    return {
      redirect: '/login',
    };
  }

  return {
    props: {
      data,
    },
  };
}

export default Profile;
