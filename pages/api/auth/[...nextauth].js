import NextAuth from 'next-auth/next';
import GoogleProvier from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvier({
      clientId: process.env.GG_ID,
      clientSecret: process.env.GG_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      return baseUrl;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
});
