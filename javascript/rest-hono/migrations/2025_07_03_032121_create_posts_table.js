const { Migration, sutando } = require('sutando');

module.exports = class extends Migration {
  /**
    * Run the migrations.
    */
  async up(schema) {
    await schema.createTable('posts', (table) => {
      table.increments('id').primary();
      table.integer('author_id');
      table.string('title');
      table.string('content');
      table.boolean('published').defaultTo(false);
      table.integer('views_count').defaultTo(0);
      table.timestamps();
    });
  }

  /**
    * Reverse the migrations.
    */
  async down(schema) {
    await schema.dropTableIfExists('posts');
  }
};