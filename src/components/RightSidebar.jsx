'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import News from './News';

export default function RightSidebar() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/search/${input}`);
    setTimeout(() => {
      router.refresh();
    }, 100);
  };
  return (
    <>
      <div className='sticky top-0 bg-black py-2'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Rechercher'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='bg-black border border-neutral-900 rounded-3xl text-sm w-full px-4 py-2'
          />
        </form>
      </div>
      <News />
    </>
  );
}
