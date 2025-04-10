import Post from '../../../../lib/models/post.model.js';
import { connect } from '../../../../lib/mongodb/mongoose.js';
import { currentUser } from '@clerk/nextjs/server';
import mongoose from 'mongoose';

export const POST = async (req) => {
  const user = await currentUser();
  try {
    await connect();
    const data = await req.json();
    console.log('Received data:', data);
    console.log('User data:', user?.publicMetadata);

    if (!user || user.publicMetadata.userMongoId !== data.userMongoId) {
      return new Response('Unauthorized', {
        status: 401,
      });
    }
    console.log('Creating post with data:', {
      user: data.userMongoId,
      name: data.name,
      username: data.username,
      text: data.text,
      profileImg: data.profileImg,
      image: data.image || null,
    });
    const newPost = await Post.create({
      user: new mongoose.Types.ObjectId(data.userMongoId),
      name: data.name,
      username: data.username,
      text: data.text,
      profileImg: data.profileImg,
      image: data.image || null,
    });
    await newPost.save();
    return new Response(JSON.stringify(newPost), {
      status: 200,
    });
  } catch (error) {
    console.log('Error creating post:', error);
    return new Response('Error creating post', {
      status: 500,
    });
  }
};
