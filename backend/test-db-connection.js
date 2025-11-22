require('dotenv').config();
const { Client } = require('pg');

async function testConnection() {
  console.log('Testing PostgreSQL connection...');
  const safeUrl = process.env.DATABASE_URL.replace(/:[^:@]*@/, ':****@');
  console.log('URL:', safeUrl);
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');
    const res = await client.query('SELECT NOW()');
    console.log('🕒 Server time:', res.rows[0].now);
    await client.end();
  } catch (err) {
    console.error('❌ Connection failed');
    console.error('Message:', err.message);
    if (err.code) console.error('Code:', err.code);
    if (err.stack) console.error(err.stack);
  }
}

testConnection();
