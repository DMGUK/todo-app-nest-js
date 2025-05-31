const { DataSource } = require('typeorm');

module.exports = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root_mysql123@@@345',
  database: 'todo_app',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  synchronize: false,
});
