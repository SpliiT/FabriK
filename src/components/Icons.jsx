'use client';

import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from 'react-icons/hi';
import { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { modalAtom, postIdAtom } from '@/atom/modalAtom';
import { useRecoilState } from 'recoil';

export default function Icons({ post, id, onUpdate }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || []);
  const [open, setOpen] = useRecoilState(modalAtom);
  const [postId, setPostId] = useRecoilState(postIdAtom);
  const { user } = useUser();
  const router = useRouter();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const modalRef = useRef(null);

  const likePost = async () => {
    if (!user) return router.push('/sign-in');
    try {
      const res = await fetch('/api/post/like', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: post._id }),
      });

      if (!res.ok) throw new Error('Failed to like post');

      if (isLiked) {
        setLikes(likes.filter((like) => like !== user.publicMetadata.userMongoId));
      } else {
        setLikes([...likes, user.publicMetadata.userMongoId]);
      }

    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  useEffect(() => {
    if (user && likes?.includes(user.publicMetadata.userMongoId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likes, user]);

  const deletePost = async () => {
    try {
      const res = await fetch('/api/post/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: post._id }),
      });

      if (!res.ok) throw new Error('Failed to delete post');

      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // 🔁 Fermer la modale si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowDeleteModal(false);
      }
    };

    if (showDeleteModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDeleteModal]);

  return (
    <>
      <div className='flex justify-start gap-5 p-2 text-neutral-500'>
        <div className='flex items-center'>
          <HiOutlineChat
            className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100'
            onClick={() => {
              if (!user) {
                router.push('/sign-in');
              } else {
                setOpen(!open);
                setPostId(post._id);
              }
            }}
          />
          {post.comments.length > 0 && (
            <span className='text-xs'>{post.comments.length}</span>
          )}
        </div>
        <div className='flex items-center'>
          {isLiked ? (
            <HiHeart
              onClick={likePost}
              className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100'
            />
          ) : (
            <HiOutlineHeart
              onClick={likePost}
              className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
            />
          )}
          {likes.length > 0 && (
            <span className={`text-xs ${isLiked && 'text-red-600'}`}>
              {likes.length}
            </span>
          )}
        </div>
        {user && user.publicMetadata.userMongoId === post.user && (
          <HiOutlineTrash
            onClick={() => setShowDeleteModal(true)}
            className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
          />
        )}
      </div>

      {showDeleteModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div
            ref={modalRef}
            className='bg-black border border-gray-700 rounded-xl shadow-lg p-12 w-full max-w-sm text-center'
          >
            <h2 className='text-xl font-semibold mb-4'>
              Voulez vous vraiment supprimer ce post ?
            </h2>
            <div className='flex justify-center gap-4'>
              <button
                onClick={() => setShowDeleteModal(false)}
                className='px-4 py-2 text-black bg-gray-200 rounded hover:bg-gray-300 text-sm'
              >
                Annuler
              </button>
              <button
                onClick={deletePost}
                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm'
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
