
import { Router } from "express";
const { getCommentsByid, createComment } = require("../controllers/comments")

const router = Router();

router.get('/:id/comments', getCommentsByid)

router.post('/:id/comments', createComment);

module.exports = router;


