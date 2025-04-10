import Comment from './Comment';

export default function Comments({ comments = [] }) {
  if (!comments || comments.length === 0) {
    return (
      <div className='p-4 text-white text-center'>
        Aucun commentaire pour le moment
      </div>
    );
  }

  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className='space-y-4'>
      {sortedComments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
}
