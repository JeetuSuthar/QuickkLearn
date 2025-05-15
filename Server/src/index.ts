import express from "express";
import dotenv from 'dotenv';
import authRoutes from './Routes/authRoutes.ts'
import { authenticationToken } from "./Middleware/middleware.ts";
dotenv.config()
const app = express();


app.use(express.json());
app.use('/api/auth',authRoutes)
app.get("/secret", authenticationToken,(req, res) => {
  //@ts-ignore
    console.log(req.user); // 👈 this works because middleware added `req.user`
 //@ts-ignore
  res.send(`Hello user with ID: ${req.user.id}`);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
