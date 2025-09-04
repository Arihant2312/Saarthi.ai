import { neon } from '@neondatabase/serverless'

const sql = neon(`${process.env.DATABASE_URL}`);
console.log('Connecting to:', process.env.DATABASE_URL.replace(/:\/\/.*@/, '://***@'));


export default sql;