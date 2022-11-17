
exports.up = function(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.text('comments').notNullable();
    table.string('post_id',255).notNullable();
    table.string('user_id',255).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
