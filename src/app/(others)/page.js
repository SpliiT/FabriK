'use client'; // Indique que c'est un composant client

import { useState, useEffect } from 'react';
import Feed from '@/components/Feed';
import Input from '@/components/Input';

export default function Home() {
  const [posts, setPosts] = useState([]);

  // Fonction pour supprimer un post de la liste
  const removePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  // Fonction pour récupérer les posts depuis l'API
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/post/all', {
        method: 'GET',
        cache: 'no-store',
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(); // Charge les posts au montage du composant
  }, []);

  // Fonction pour ajouter un nouveau post
  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className='min-h-screen max-w-xl mx-auto border border-neutral-900'>
      <div className='py-2 px-3 sticky top-0 z-50 bg-black border-b border-l border-neutral-900'>
        <h2 className='text-lg sm:text-xl font-bold'>Accueil</h2>
      </div>
      <Input addPost={addPost} />
      <Feed 
        data={posts} 
        onRemovePost={removePost} 
      />
    </div>
  );
}
