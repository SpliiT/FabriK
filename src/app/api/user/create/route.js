import User from '../../../../lib/models/user.model';
import { connect } from '../../../../lib/mongodb/mongoose';
import { auth } from '@clerk/nextjs';

export const POST = async (req) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    await connect();
    const data = await req.json();

    const newUser = await User.create({
      clerkId: userId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      avatar: data.avatar,
    });

    await newUser.save();

    return new Response(JSON.stringify(newUser), {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response('Error creating user', {
      status: 500,
    });
  }
};
