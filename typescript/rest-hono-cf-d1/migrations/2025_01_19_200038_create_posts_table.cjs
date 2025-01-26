const { Migration, sutando } = require("sutando");

module.exports = class extends Migration {
  /**
   * Run the migrations.
   */
  async up(schema) {
    await schema.createTable("posts", (table) => {
      table.uuid('id');
      table.integer("author_id").unsigned().notNullable();
      table.string("title", 30);
      table.string("content");
      table.timestamps();
      table.timestamp("published_at");
      table.integer("views_count").defaultTo(0);
    });
  }

  /**
   * Reverse the migrations.
   */
  async down(schema) {
    await schema.dropTableIfExists("posts");
  }
};
