import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          return user; // Return user object if credentials are valid
        }
        return null; // Return null if credentials are invalid
      }
    }),
  ],
  session: {
    strategy: 'jwt', // Use JSON Web Tokens
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id; // Include user id in session
      return session;
    },
  },
});

export { handler as GET, handler as POST };