// Update with your config settings.

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './example.db'
  },
  useNullAsDefault: true,
  migrations: {
    table: 'migrations',
    path: './sutando/migrations',
  },
  models: {
    path: './models'
  }
};
