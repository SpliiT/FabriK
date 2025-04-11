'use client';

import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';
import moment from 'moment';
import Icons from './Icons';
import { useState } from 'react';

export default function Post({ post, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex flex-col p-3 border-b border-neutral-900 w-full relative'>
      <div className='flex items-center justify-between'>
        <Link href={`/users/${post?.username}`}>
          <img
            src={post?.profileImg}
            alt='user-img'
            className='h-11 w-11 rounded-full mr-4'
          />
        </Link>
        <div className='flex-1'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-xs truncate max-w-32'>
              {post?.name}
            </h4>
            <span className='text-xs text-neutral-500 truncate max-w-32'>
              @{post?.username}
            </span>
            <span className='text-xl text-neutral-500'>·</span>
            <span className='text-xs text-neutral-500 flex-1 truncate max-w-32'>
              {moment(post?.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <HiDotsHorizontal className='text-sm' />
      </div>

      <Link href={`/posts/${post?._id}`}>
        <p className='text-white text-sm my-3 ml-2 w-full'>{post?.text}</p>
      </Link>

      {post?.image && (
        <>
          {/* Image dans le post, avec taille raisonnable */}
          <div
            className='max-w-full max-h-96 overflow-hidden rounded-2xl ml-2 cursor-pointer'
            onClick={handleImageClick}
          >
            <img
              src={post.image}
              alt='post-img'
              className='w-full h-full object-cover rounded-2xl'
            />
          </div>

          {isModalOpen && (
            <div
              className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90 z-50 flex items-center justify-center'
              onClick={closeModal}
            >
              <img
                src={post.image}
                alt='modal-img'
                className='max-w-[calc(100vw-80px)] max-h-[calc(100vh-80px)] object-contain rounded-xl'
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </>
      )}

      <Icons post={post} id={post._id} onUpdate={onUpdate} />
    </div>
  );
}
