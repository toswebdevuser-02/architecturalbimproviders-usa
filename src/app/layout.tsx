import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'Top 5 Architectural BIM Service Providers Reshaping American Design Requirements',
  description: 'Discover the top 5 architectural BIM service providers transforming American design standards with cutting-edge technology, precision, and innovation in 2025.',
  google-site-verification: 'R5-G4Z02h_RxVS8TL7mvuj6GEC_mVch7EDWpk0UlGEc',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="canonical" href="https://architecturalbimproviders-usa.vercel.app /">
        <!--Article Schema-->
        <script type="application/ld+json">
          {"@context":"https://schema.org","@type":"Article","mainEntityOfPage":{"@type":"WebPage","@id":"https://architecturalbimproviders-usa.vercel.app/"},"headline":"Top 5 Architectural BIM Service Providers Reshaping American Design Requirements","description":"Discover the top 5 architectural BIM service providers transforming American design standards with cutting-edge technology, precision, and innovation in 2025.","image":"https://architecturalbimproviders-usa.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Farchitectural-bim-services.2c24078f.jpg&w=1200&q=75","datePublished":"2025-08-08","dateModified":"2025-08-08"}
        </script>

      </head>

      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
