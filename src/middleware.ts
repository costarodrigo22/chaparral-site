import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

export default auth((request) => {
	const isLogged = !!request.auth;

	const pathUserTryAccess = request.nextUrl.pathname;

	const privateRoutes = ['/cart', '/Delivery', '/Payment', '/TrackOrder'];

	if (!isLogged && privateRoutes.includes(pathUserTryAccess)) {
		return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
	}

	if (
		isLogged &&
		(pathUserTryAccess === '/sign-in' || pathUserTryAccess === '/sign-up')
	) {
		return NextResponse.redirect(new URL('/cart', request.nextUrl));
	}
});

export const config = {
	matcher: [
		'/sign-in',
		'/cart',
		'/Delivery',
		'/Payment',
		'/TrackOrder',
		'/',
		'/sobre',
		'/recipes',
	],
};
