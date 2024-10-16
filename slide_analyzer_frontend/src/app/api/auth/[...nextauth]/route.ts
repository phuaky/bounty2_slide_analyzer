import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.username === "admin" && credentials?.password === "password") {
          return { id: "1", name: "admin", email: "admin@example.com" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
});

export { handler as GET, handler as POST };