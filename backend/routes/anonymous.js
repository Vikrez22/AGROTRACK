import express from 'express'
import * as anonymousController from '../controllers/anonymous.js'
import upload from '../middleware/upload.js';



const router = express.Router()


router.post('/create-report', upload.array('evidence', 10), anonymousController.createAnonymousReport)

export default router