import express from "express";
import { createPost,getAllPost,getPost,deletePost,updatePost } from "../controllers/postController.js";



const router = express.Router();



router.post('/createPost',createPost);
router.get('/getAllPost',getAllPost);

router.get('/getPost/:postId',getPost);


router.delete('/deletePost/:postId',deletePost);

router.patch('/updatePost/:postId',updatePost);

export default router;
