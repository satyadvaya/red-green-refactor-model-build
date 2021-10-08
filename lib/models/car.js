const pool = require('../utils/pool');

class Car {
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
      'INSERT INTO cars (make, model, year) VALUES ($1, $2, $3) RETURNING *',
      [make, model, year]
    );

    return new Car(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        cars.id,
        manufacturers.name AS make,
        cars.model,
        cars.year
      FROM cars
      INNER JOIN manufacturers
      ON cars.make = manufacturers.id
      WHERE cars.id=$1`,
      [id]
    );

    if (!rows[0]) return null;

    return new Car(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`
      SELECT
        cars.id,
        manufacturers.name AS make,
        cars.model,
        cars.year
      FROM cars
      INNER JOIN manufacturers
      ON cars.make = manufacturers.id`);

    return rows.map((row) => new Car(row));
  }

  static async updateById(id, { make, model, year }) {
    const car = await Car.findById(id);
    const results = await pool.query(
      `
      SELECT
        id
      FROM manufacturers
      WHERE name=$1`,
      [car.make]
    );
    const newMake = make ?? results.rows[0].id;
    const newModel = model ?? car.model;
    const newYear = year ?? car.year;
    const { rows } = await pool.query(
      `
      UPDATE cars
      SET
        make=$1,
        model=$2,
        year=$3
      WHERE id=$4
      RETURNING *`,
      [newMake, newModel, newYear, id]
    );

    if (!rows[0]) return null;

    return new Car(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM cars WHERE id=$1 RETURNING *',
      [id]
    );

    if (!rows[0]) return null;

    return new Car(rows[0]);
  }
}

module.exports = Car;
