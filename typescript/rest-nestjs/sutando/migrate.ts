
import { sutando } from 'sutando';

sutando.addConnection({
  client: 'sqlite3',
  connection: {
    filename: './example.db'
  },
  useNullAsDefault: true,
});

const Schema = sutando.connection().schema;

const init = {
  up: async () => {
    await Schema.createTable('posts', (table) => {
      table.increments('id').primary();
      table.integer('author_id').defaultTo(0);
      table.string('title');
      table.string('content');
      table.boolean('published').defaultTo(false);
      table.integer('views_count').defaultTo(0);
      table.timestamps();
    })
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('email');
      table.timestamps();
    });
  },
  down: async () => {
    await Schema.dropTableIfExists('posts').dropTableIfExists('users');
  }
};

const main = async () => {
  if (process.argv[2] === 'rollback') {
    await init.down();
  } else {
    console.log('Creating tables...');
    await init.up();
  }

  const connection = sutando.connection() as any;
  await connection.destroy();
}

main();
