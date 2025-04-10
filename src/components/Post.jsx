import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';
import moment from 'moment';
import Icons from './Icons';

export default function Post({ post, onUpdate }) {
  return (
    <div className='flex flex-col p-3 border-b border-neutral-900 w-full'>
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
            <span className='text-xs text-neutral-500 truncate max-w-32'>@{post?.username}</span>
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
      <Link href={`/posts/${post?._id}`}>
        <img src={post?.image} className='rounded-2xl ml-2' />
      </Link>
      <Icons post={post} id={post._id} onUpdate={onUpdate} />
    </div>
  );
}
