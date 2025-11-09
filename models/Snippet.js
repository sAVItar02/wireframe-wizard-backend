
import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title for your snippet'],
        trim: true
    },
    code: {
        type: String,
        required: [true, 'Please add the code for your snippet']
    },
    language: {
        type: String,
        required: true,
        default: 'typescript'
    },
    thumbnail: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Optimize queries like: find({ user }).sort({ createdAt: -1 })
snippetSchema.index({ user: 1, createdAt: -1 });

const Snippet = mongoose.model('Snippet', snippetSchema);

export default Snippet;
