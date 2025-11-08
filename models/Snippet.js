
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
    }
}, {
    timestamps: true
});

const Snippet = mongoose.model('Snippet', snippetSchema);

export default Snippet;
