import pool from './db'

interface User{
    id:number,
    name:string,
    email:string,
    password:string
}

//create a user table 
// get user (GET)
//create user (POST

export const CreateUserTable=async()=>{
    await pool.query(
        `CREATE TABE users(
         id SERIAL primary key,
         name varchar(100),
         email varchar(100) unique not null,
         passsword varchar(100) not null
        )`
    )
}


// $1 ---will be replaced by the first item in the array (name).

// $2 ---will be replaced by the second item in the array (email).

// $3 ---will be replaced by the third item in the array (password).
 

export const findUser= async(email:string): Promise<User | null>=>{
const result = await pool.query('SELECT * FROM users where email = $1',[email]) 
return result.rows[0] || null
}

export const CreateUser = async(user : User): Promise<User>=>{
    const result =await pool.query(
        'INSERT INTO users (name, email, password) VALUES($1,$2,$3) returning id , name , email',
        [user.name, user.email , user.password]
    );
    return result.rows[0]
}
