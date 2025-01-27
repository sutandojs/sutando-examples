const { Migration } = require("sutando");

module.exports = class extends Migration {
  /**
   * Run the migrations.
   */
  async up(schema) {
    await schema.createTable("users", (table) => {
      table.increments("id");
      table.string("first_name");
      table.string("last_name");
      table.string("email");
      table.timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  async down(schema) {
    await schema.dropTableIfExists("users");
  }
};
