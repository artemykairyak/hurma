import { instance } from '@services/apiServices';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const res = await instance.post('/login', { email, password });
        console.log(res);

        if (res.data.accessToken) {
          return res.data;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    signUp: '/sign-up',
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.token = user.accessToken;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.token = token.token;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
