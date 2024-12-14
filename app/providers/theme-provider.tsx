'use client'

const NextThemesProvider = dynamic(
	() => import('next-themes').then((e) => e.ThemeProvider),
	{
		ssr: false,
	}
)

import { ThemeProvider as NextThemesProviderProps } from "next-themes";
import dynamic from 'next/dynamic';
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProviderProps>;
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}