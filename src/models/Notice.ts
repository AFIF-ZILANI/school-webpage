import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['ACADEMIC', 'EVENT', 'ANNOUNCEMENT', 'OTHER'],
    default: 'OTHER',
  },
  attachments: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    enum: ["ACTIVE", "COMMING", "DEACTIVATED", "PENDING", "SNOOSE"]
  }
});

export const NoticeModel = mongoose.models.Notice || mongoose.model('Notice', noticeSchema);