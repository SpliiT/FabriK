'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function News() {
  const [news, setNews] = useState([]);
  const [articleNum, setArticleNum] = useState(3);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?q=tech&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok' && data.totalResults > 0) {
          const filteredArticles = data.articles.filter((article) => article.urlToImage);
          setNews(filteredArticles);
          setHasMore(filteredArticles.length > 3); 
        }
      })
      .catch((error) =>
        console.error('Erreur lors de la récupération des articles:', error)
      );
  }, []);

  const handleVoirPlus = () => {
    const newNum = articleNum + 3;
    setArticleNum(newNum);

    if (newNum >= news.length) {
      setHasMore(false);
    }
  };

  const handleVoirMoins = () => {
    setArticleNum(3);
    setHasMore(news.length > 3); 
  };

  return (
    <div className='rounded-2xl border border-neutral-900 shadow-lg p-4 w-full'>
      <h4 className='font-bold text-xl ml-2'>Ce qui se passe</h4>
      <AnimatePresence>
        {news.slice(0, articleNum).map((article, index) => (
          <motion.div
            key={article.url}
            className='my-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
            }}
          >
            <a href={article.url} target='_blank' rel='noopener noreferrer'>
              <div className='flex items-center justify-between space-x-1 rounded hover:bg-neutral-950 transition duration-200 p-2'>
                <div className='space-y-0.5'>
                  <h6 className='text-xs font-bold'>{article.title}</h6>
                  <p className='text-xs font-medium text-neutral-500'>
                    {article.source.name}
                  </p>
                </div>
                <img
                  src={article.urlToImage}
                  width={128}
                  className='rounded'
                  alt='Article'
                />
              </div>
            </a>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className='ml-2 mt-2 space-x-4'>
        {hasMore && (
          <button
            onClick={handleVoirPlus}
            className='text-blue-500 hover:text-blue-600 text-sm'
          >
            Voir plus
          </button>
        )}

        {!hasMore && articleNum > 3 && (
          <button
            onClick={handleVoirMoins}
            className='text-red-500 hover:text-red-600 text-sm'
          >
            Voir moins
          </button>
        )}
      </div>
    </div>
  );
}
