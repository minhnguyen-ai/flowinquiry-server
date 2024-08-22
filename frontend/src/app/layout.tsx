import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {ThemeProvider} from '@/components/providers/ThemeProvider';
import AuthProvider from "./AuthProvider";
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Flexwork',
    description: 'Flexwork dashboard',
};

export default async function RootLayout({
                                             children
                                         }: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <html lang='en'>
        <body className={inter.className}>
        <AuthProvider>
            <ThemeProvider
                attribute='class'
                defaultTheme='light'
                enableSystem={true}
                storageKey='dashboard-theme'
            >
                {children}
                <Toaster/>
            </ThemeProvider>
        </AuthProvider>
        </body>
        </html>
    );
}