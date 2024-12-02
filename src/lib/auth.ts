import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { signIn, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { success, data } = schema.safeParse(credentials);

        if (!success) return null;

        const { email, password } = data;

        const response = await axios.post(
          "https://676w95ytfl.execute-api.us-east-1.amazonaws.com/auth/sign-in",
          { email, password }
        );

        if (!response.data) return null;

        return {
          email: response.data.AccessToken,
          name: response.data.AccessToken,
          id: response.data.AccessToken,
        };
      },
    }),
  ],
});
