import express from 'express';
import { submitAnswer, getAllAnswers, giveStatus, getAnswers_user, deleteAnswer, updateAnswer } from '../controllers/answerController.js';


const router = express.Router(); 

router.post('/submitAnswer/:userId', submitAnswer);
router.post('/giveStatus/:ansId', giveStatus);

router.get('/getAllAnswers/:quesId', getAllAnswers);

router.get('/getAnswer_user/:userId', getAnswers_user);

router.delete('/deleteAnswer/:ansId', deleteAnswer);
router.patch('/updateAnswer/:ansId', updateAnswer);

export default router;
