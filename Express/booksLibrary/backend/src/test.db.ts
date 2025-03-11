import pool from './db'

const testDbConnection = async () => {
    try{
        const client = await pool.connect();
        console.log("Connected to database");
        client.release();
    } catch (error){
        console.error("Error connecting to database", error);
    }
}

testDbConnection();