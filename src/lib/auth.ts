import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		CognitoProvider({
			clientId: process.env.AUTH_COGNITO_ID!,
			clientSecret: process.env.AUTH_COGNITO_SECRET!,
			issuer: process.env.AUTH_COGNITO_ISSUER!,
		}),
	],
});
