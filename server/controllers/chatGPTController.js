import { StatusCodes } from "http-status-codes";
import { Configuration, OpenAIApi } from "openai";

import Chat from "../database/models/Chat.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const chatCompletion = async (req, res) => {
  const { chatPrompt } = req.body;
  if (!chatPrompt) {
    throw BadRequestError("Please provide all values");
  }
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: chatPrompt }],
  });

  const chatResponse = completion.data.choices[0].message.content;
  const userId = req.user.userId;
  const chat = await Chat.create({ userId, chatPrompt, chatResponse });
  res.status(StatusCodes.CREATED).json({
    chatResponse: chat.chatResponse,
  });
};

export { chatCompletion };
