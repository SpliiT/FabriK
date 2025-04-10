'use client';

import { useRecoilState } from 'recoil';
import { modalAtom, postIdAtom } from '../atom/modalAtom';
import Modal from 'react-modal';
import { HiX } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalAtom);
  const [postId, setPostId] = useRecoilState(postIdAtom);
  const [post, setPost] = useState({});
  const [postLoading, setPostLoading] = useState(false);
  const [input, setInput] = useState('');
  const [inputLength, setInputLength] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState('h-auto');
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      if (postId !== '') {
        setPostLoading(true);
        setInput('');
        const response = await fetch('/api/post/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId }),
        });
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
          setPostLoading(false);
        } else {
          setPostLoading(false);
          console.log('Failed to fetch post');
        }
      }
    };
    fetchPost();
  }, [postId]);

  const sendComment = async () => {
    if (!user) {
      return router.push('/sign-in');
    }
    try {
      const res = await fetch('/api/post/comment', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          comment: input,
          user: user.publicMetadata.userMongoId,
          name: user.name,
          username: user.username,
          profileImg: user.imageUrl,
        }),
      });
      if (res.status === 200) {
        setInput('');
        setOpen(false);
        router.push(`/posts/${postId}`);
        setTimeout(() => {
          router.refresh();
        }, 100);
      }
    } catch (error) {
      console.log('Error sending comment:', error);
    }
  };

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className='max-w-lg w-[90%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white border border-gray-700 rounded-xl shadow-lg p-4'
          overlayClassName='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center'
        >
          <div className='p-4'>
            <div className='flex justify-between items-center mb-4'>
              <div className='flex items-center space-x-2'>
                <img
                  src={postLoading ? 'https://via.placeholder.com/48' : post?.profileImg}
                  alt='user-img'
                  className='h-10 w-10 rounded-full'
                />
                <div>
                  <h4 className='font-bold text-white'>{postLoading ? 'Name' : post?.name}</h4>
                  <span className='text-sm text-gray-400'>@{postLoading ? 'username' : post?.username}</span>
                </div>
              </div>
              <button
                className='text-gray-400 hover:text-white'
                onClick={() => setOpen(false)}
              >
                <HiX className='h-6 w-6' />
              </button>
            </div>
            <p className='text-gray-300 mb-4'>{postLoading ? 'Loading...' : post?.text}</p>
            <div className='flex space-x-3'>
              <img
                src={user.imageUrl}
                alt='user-img'
                className='h-10 w-10 rounded-full'
              />
              <div className='flex-grow border-t border-gray-700 pt-4'>
                <textarea
                  className='w-full bg-transparent border-none text-gray-200 placeholder-neutral-500 outline-none resize-none'
                  placeholder='Tweetez votre réponse'
                  rows='3'
                  value={input}
                  onChange={(e) => {
                    const newHeight = `h-[${e.target.scrollHeight}px]`;
                    setTextareaHeight(newHeight);
                    if (e.target.value.length <= 180) {
                      setInput(e.target.value);
                      setInputLength(e.target.value.length);
                    }
                  }}
                  style={{ height: textareaHeight }}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                ></textarea>
                <div className='flex justify-between mt-2'>
                  <span className='text-xs text-neutral-500'>
                    {inputLength}/180
                  </span>
                  <button
                    className={`bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50 ${
                      isInputFocused ? 'border-b-2 border-blue-600' : ''
                    }`}
                    disabled={input.trim() === '' || postLoading}
                    onClick={sendComment}
                  >
                    Répondre
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
