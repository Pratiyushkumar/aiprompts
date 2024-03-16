import { connectToDB } from '@utils/database';
import User from '@models/user';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const user = await User.findById(params.id);
    return new Response(user, {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch prompts created by user', {
      status: 500,
    });
  }
};
