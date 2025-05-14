import express from "express";
import dotenv from 'dotenv';
import authRoutes from './Routes/authRoutes.ts'
dotenv.config()
const app = express();

app.use(express.json());
app.use('/api/auth',authRoutes)
app.get("/", (req, res) => {
  res.send("Hello from TypeScript Express backend!");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
