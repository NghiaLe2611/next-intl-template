'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
// import render from 'next/dynamic';

// const Layout = render(() => import('./layout'), { ssr: false });
// export const dynamic = 'force-dynamic';

type Props = {
	params: { locale: string };
};

export default function AboutPage({ params: { locale } }: Props) {
	// console.log(123, locale);
    const [text, setText] = useState('');
	const t = useTranslations('AboutPage');

    const showText = () => {
        setText(t('description'));
    };

	return (
	    <div>
            <h1>{t('title')}</h1>
            <button onClick={showText}>Show</button>
            <p>{text}</p>
        </div>
	)
}
