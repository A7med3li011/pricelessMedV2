import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials as { email: string; password: string };

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,

            
            {
              email,
              password,
              roleId: 2,
            }
          );

          if (res?.data?.success) {
            return res?.data?.data;
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user.id || user._id) as string;
        token.fullName = user?.fullName || "";
        token.firstName = user?.firstName || "";
        token.countryCode = user?.countryCode || "";
        token.email = user?.email || "";
        token.roleId = user?.roleId || 0;
        token.stateId = user?.stateId || "";
        token.accessToken = user?.token || "";
      }

      return token;
    },

    async session({ session, token }) {
      // Expose token data in session
      if (token) {
        session.user = {
          id: token.id,
          fullName: token.fullName,
          firstName: token.firstName,
          countryCode: token.countryCode,
          email: token.email,
          roleId: token.roleId,
          stateId: token.stateId,
        };
        session.accessToken = token.accessToken;
      }

      return session;
    },
  },
};
