import Feed from '@/components/Feed';
import Input from '@/components/Input';
import { headers } from 'next/headers';

export default async function Home() {
  let data = null;
  try {
    const headersList = headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const result = await fetch(`${protocol}://${host}/api/post/all`, {
      method: 'GET',
      cache: 'no-store',
    });
    data = await result.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
  return (
    <div className='min-h-screen max-w-xl mx-auto border border-neutral-900'>
      <div className='py-2 px-3 sticky top-0 z-50 bg-black border-b border-l border-neutral-900'>
        <h2 className='text-lg sm:text-xl font-bold'>Accueil</h2>
      </div>
      <Input />
      <Feed data={data} />
    </div>
  );
}
