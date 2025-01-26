module.exports = {
    client: require('knex-cloudflare-d1'),
    connection: {
      database: "test-sutando", // From Wrangler Binding, Defaults to first D1 Database in Wrangler.
      wranglerPath: ".", // Default as "."
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