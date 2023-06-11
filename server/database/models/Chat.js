import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  chatPrompt: {
    type: String,
    required: [true, "Please provide the question"],
  },
  chatResponse: {
    type: String,
    required: [true, "Please provide the answer"],
  },
});

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
