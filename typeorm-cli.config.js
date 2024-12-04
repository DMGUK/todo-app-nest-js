const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
  type: 'mysql', // or 'postgres'
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root_mysql123@@@345',
  database: 'todo_app',
  entities: ['dist/**/*.entity.js'], // Point to compiled .js files
  migrations: ['dist/migrations/*.js'], // Point to compiled .js files
  synchronize: false,
  logging: true,
});

module.exports = AppDataSource;
