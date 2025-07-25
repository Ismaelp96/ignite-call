import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

import '../lib/dayjs';
import { globalStyles } from '@/styles/global';
import { queryClient } from '@/lib/react-query';

globalStyles();

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</QueryClientProvider>
	);
}
