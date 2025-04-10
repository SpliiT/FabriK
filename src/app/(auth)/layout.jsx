import '.././globals.css';

import Loader from '@/components/Loader';
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: 'Fabrik',
  description: 'A social media app built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body>
          <ClerkLoading>
            <Loader />
          </ClerkLoading>
          <ClerkLoaded>{children}</ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
