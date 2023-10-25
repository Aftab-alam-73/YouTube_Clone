import mysql from 'mysql'

export const db=mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: 'aftaB@48',
       database: 'youtube'
})