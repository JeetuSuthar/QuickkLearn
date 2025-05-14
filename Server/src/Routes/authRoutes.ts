import express from "express";
import { signup}  from '../Controllers/authController.ts';

const router = express.Router();

router.post('/signup', signup);

export default router;



