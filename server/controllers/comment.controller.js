import mongoose from "mongoose";
import Comment from "../models/comment.model.js";

export const getComments = async (req, res) => {
    const { ticketId } = req.params;

    try {

        if (!mongoose.Types.ObjectId.isValid(ticketId)) {
            return res.status(403).json({ message: "Invalid ticket id" });
        }

        const comments = await Comment.find({ ticketId });

        return res.json({ comments });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const createComment = async (req, res) => {
    const { ticketId } = req.params;
    const { text } = req.body;

    try {
        const userId = req.user._id;

        const newComment = await Comment.create({ ticketId, userId, text });

        return res.json({ comment: newComment });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { text } = req.body;

    try {

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(403).json({ message: "Invalid comment id" });
        }

        const updatedComment = await Comment.findOneAndUpdate({ _id: commentId }, { text });

        return res.json({ comment: updatedComment });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(403).json({ message: "Invalid comment id" });
        }

        await Comment.findOneAndDelete({ _id: commentId });

        return res.sendStatus(200);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};




