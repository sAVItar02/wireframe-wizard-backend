
import express from 'express';
import protect from '../middleware/authMiddleware.js';
import Snippet from '../models/Snippet.js';
import mongoose from 'mongoose';

const router = express.Router();

// @route   GET /api/snippets
// @desc    Get all snippets for the logged-in user
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const snippets = await Snippet.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(snippets);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @route   POST /api/snippets
// @desc    Save a new code snippet
// @access  Private
router.post('/', protect, async (req, res) => {
    const { title, code, language } = req.body;

    if (!title || !code) {
        return res.status(400).json({ message: 'Please provide a title and code' });
    }

    try {
        const snippet = await Snippet.create({
            user: req.user.id,
            title,
            code,
            language
        });
        res.status(201).json(snippet);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @route   DELETE /api/snippets/:id
// @desc    Delete a snippet by ID
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid snippet ID' });
    }

    try {
        const snippet = await Snippet.findById(id);

        if (!snippet) {
            return res.status(404).json({ message: 'Snippet not found' });
        }
        
        // Check if the snippet belongs to the logged-in user
        if (snippet.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to delete this snippet' });
        }

        await snippet.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Snippet removed' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default router;
