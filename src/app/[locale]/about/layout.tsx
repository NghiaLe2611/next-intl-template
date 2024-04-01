import clsx from 'clsx';
import { locales } from '../../../config';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

type Props = {
	children: ReactNode;
	params: { locale: string };
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

// export async function generateMetadata({ params: { locale } }: Omit<Props, 'children'>) {
// 	return {
// 		title: 'About page',
// 	};
// }

export default async function AboutLayout({ children, params: { locale } }: Props) {
	// Enable static rendering
	unstable_setRequestLocale(locale);

	let messages;

	try {
		// const defaultMessages = (await import(`../../../../messages/en.json`)).default;
		// const translatedMessages = (await import(`../../../../messages/${locale}.json`)).default;

		messages =
			locale === 'en'
				? (await import(`../../../../messages/en.json`)).default
				: (await import(`../../../../messages/${locale}.json`)).default;

		// messages = deepmerge(defaultMessages, translatedMessages);
	} catch (error) {
		notFound();
	}

	console.log(222, locale, messages);

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			{/* {children} */}
			<div>{children}</div>
		</NextIntlClientProvider>
	);
}
