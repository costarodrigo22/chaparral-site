import axios from 'axios';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const { signIn, auth, signOut, handlers } = NextAuth({
	session: {
		strategy: 'jwt',
	},
	providers: [
		Credentials({
			authorize: async (credentials) => {
				const { success, data } = schema.safeParse(credentials);

				if (!success) return null;

				const { email, password } = data;

				const response = await axios.post(
					`${process.env.NEXT_PUBLIC_AWS_BASE_URL}/auth/sign-in`,
					{ email, password }
				);

				if (!response.data) return null;

				return {
					email: response.data.user.email,
					name: response.data.user.name,
					id: response.data.user.id,
					token: response.data.accessToken,
				};
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (user?.token) {
				token.accessToken = user.token;
			}

			return token;
		},
		session({ session, token }) {
			if (token.sub) {
				session.user.id = token.sub;
			}

			if (token.accessToken) {
				session.user.token = token.accessToken;
			}

			return session;
		},
	},
});
