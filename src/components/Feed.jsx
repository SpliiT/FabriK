import Post from './Post';

export default function Feed({ data, onRemovePost }) {
  if (!data || data.length === 0) {
    return (
      <div className='flex justify-center items-center h-32 text-neutral-500'>
        Aucun post à afficher
      </div>
    );
  }

  return (
    <div>
      {data.map((post) => (
        <Post 
          key={post._id} 
          post={post} 
          onUpdate={() => onRemovePost(post._id)}
        />
      ))}
    </div>
  );
}
