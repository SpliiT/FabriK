import Post from '../../../../lib/models/post.model.js';
import { connect } from '../../../../lib/mongodb/mongoose.js';

const getPosts = async () => {
  await connect();
  return await Post.find().sort({ createdAt: -1 });
};

export const GET = async (req) => {
  try {
    const feedPosts = await getPosts();
    console.log('Found posts:', feedPosts); // Log pour voir les posts trouvés
    
    if (!feedPosts || feedPosts.length === 0) {
      console.log('No posts found in database');
    }
    
    return new Response(JSON.stringify(feedPosts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error getting posts:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const POST = async (req) => {
  try {
    const feedPosts = await getPosts();
    console.log('Found posts:', feedPosts); // Log pour voir les posts trouvés
    
    if (!feedPosts || feedPosts.length === 0) {
      console.log('No posts found in database');
    }
    
    return new Response(JSON.stringify(feedPosts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error getting posts:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
