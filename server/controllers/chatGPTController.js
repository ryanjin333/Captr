import { StatusCodes } from "http-status-codes";
import { Configuration, OpenAIApi } from "openai";

import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const chatCompletion = async (req, res) => {
  const { chatPrompt } = req.body;
  if (!chatPrompt) {
    throw BadRequestError;
  }
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: chatPrompt }],
  });
  res.status(StatusCodes.CREATED).json({
    chatResponse: completion.data.choices[0].message.content,
  });
};

export { chatCompletion };
