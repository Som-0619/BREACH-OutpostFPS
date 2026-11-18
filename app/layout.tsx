import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'BREACH — Outpost', description: 'Private six-player co-op. One outpost. An endless siege.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
