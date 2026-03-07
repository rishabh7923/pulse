import knex from "knex";

const connection = knex({
  client: 'mysql2',
  connection: {
    host: process.env.SQL_HOST!,
    port: Number(process.env.SQL_PORT!),
    user: process.env.SQL_USERNAME!,
    password: process.env.SQL_PASSWORD!,
    database: process.env.SQL_DATABASE!,
    timezone:'Z'
  },
});

export default connection;