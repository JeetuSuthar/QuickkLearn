// controllers/authController.ts
import { Request, Response } from 'express';
import pool from '../Models/db.ts';
import bcrypt from 'bcrypt';
import { User } from '../Models/models.ts'

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      res.status(400).json({ message: 'Email already registered' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query<User>(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    const user = result.rows[0];
    res.status(201).json(user);

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const existingUser = await pool.query('Select * from users where email =$1', [email]);
    const user = existingUser.rows[0]
    if (!user) {
      res.status(400).json({ msg: "User dont exist" })
      return;
    }
    const isEqualpassword = await bcrypt.compare(password, user.password)
    if (!isEqualpassword) {
      res.status(401).json({ msg: 'Invalid Credentials' })
    }
    res.status(201).json({msg:"Signin success", user:user})
    
  } catch (error) {
    console.log("Error in signin ", error)
    res.status(500).json({ msg: "Internal server error in signin" })
  }


}