import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  uid: String,
  email: String,
  history: [
    {
      symptoms: [String],
      result: mongoose.Schema.Types.Mixed, // Allow both String and Object
      timestamp: { type: Date, default: Date.now }
    }
  ],
  chatHistory: [
    {
      role: String, // 'user' or 'assistant'
      content: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  chatSessions: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      title: String,
      messages: [
        {
          role: String, // 'user' or 'assistant'
          content: String,
          timestamp: { type: Date, default: Date.now }
        }
      ],
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model('User', UserSchema);
