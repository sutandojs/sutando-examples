// Update with your config settings.

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './example.db'
  },
  useNullAsDefault: true,
  migrations: {
    table: 'migrations',
    path: './migrations',
  },
  models: {
    path: './models'
  }
};
