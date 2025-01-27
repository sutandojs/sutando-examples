module.exports = {
    client: require('knex-cloudflare-d1'),
    connection: {
      database: "test-sutando", // From Wrangler Binding
      local: true, // Toggles `--local` flag on `wrangler d1 exec` command (Default as false)
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