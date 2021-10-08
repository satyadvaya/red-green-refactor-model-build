const pool = require("../utils/pool");

module.exports = class Car {
  id;
  make;
  model;
  year;

  constructor(row) {
    this.id = row.id;
    this.make = row.make;
    this.model = row.model;
    this.year = row.year;
  }

  static async insert({ make, model, year }) {
    const { rows } = await pool.query(
      "INSERT INTO cars (make, model, year) VALUES ($1, $2, $3) RETURNING *",
      [make, model, year]
    );
    return new Car(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query("SELECT * FROM cars WHERE id = ($1)", [
      id,
    ]);
    return new Car(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query("SELECT * FROM cars");
    return rows.map((row) => {
      return new Car(row);
    });
  }

  static async patch(id, make) {
    const { rows } = await pool.query(
      "UPDATE cars SET make = ($2) WHERE id = ($1) RETURNING *",
      [id, make]
    );
    return new Car(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      "DELETE FROM cars WHERE id = ($1) RETURNING *",
      [id]
    );
    return new Car(rows[0]);
  }
};
