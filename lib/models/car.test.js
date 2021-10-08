const fs = require("fs");
const pool = require("../utils/pool");
const Car = require("./car");

describe("Car model", () => {
  beforeEach(() => {
    return pool.query(
      fs.readFileSync(__dirname + "/../../sql/setup.sql", "utf-8")
    );
  });

  it("creates a car", async () => {
    const car = await Car.insert({
      make: "Ford",
      model: "Pinto",
      year: 1971,
    });

    expect(car).toEqual({
      id: "3",
      ...car,
    });
  });

  afterAll(() => {
    return pool.end();
  });
});
