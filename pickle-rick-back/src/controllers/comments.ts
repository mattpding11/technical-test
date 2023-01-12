import { Request, Response } from 'express';

const Comment = require("../models/comment")

const getCommentsByid = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        let comments = await Comment.find({ characterId: id });
    
        comments = comments.map((characterComment:{ [key: string]: any }) => {
            const {characterId:id, author, characterName, comment} = characterComment
            return {
                id,
                characterName,
                author,
                comment,
            }
        })

        res.status(200).json({comments});

    } catch (err: any) {
        res.status(400).json({
            error: err.name,
            messagge: err.message
        });
    }

}


const createComment = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;
        const { characterName, author, comment } = req.body;

        const data = {
            characterId: id,
            characterName,
            author,
            comment,
        }

        const newComment = new Comment(data);

        await newComment.save();

        res.status(201).json({
            ...data
        });

    } catch (err: any) {
        res.status(400).json({
            error: err.name,
            messagge: err.message
        });
    }

}

module.exports = {
    getCommentsByid,
    createComment,
}

