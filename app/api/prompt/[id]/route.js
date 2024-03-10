import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

//GET(read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');
    if (!prompt)
      return new Response(JSON.stringify('prompt not found'), { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify('Failed to fetch all the prompts'), {
      status: 500,
    });
  }
};

//PATCH (update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existingPrompts = await Prompt.findById(params.id);
    if (!existingPrompts)
      return new Response(JSON.stringify('no prompt found'), { status: 404 });
    existingPrompts.prompt = prompt;
    existingPrompts.tag = tag;
    await existingPrompts.save();
    return new Response(JSON.stringify(existingPrompts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify('Failed to update the prompt'), {
      status: 500,
    });
  }
};

//DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findOneAndDelete(params.id);
    return new Response('Prompt deleted successfully', { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify('Failed to delete the prompt'), {
      status: 500,
    });
  }
};
