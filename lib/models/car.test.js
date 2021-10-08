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

  it("gets a car by id", async () => {
    const car = await Car.getById("1");

    expect(car).toEqual({
      id: "1",
      ...car,
    });
  });

  it("gets all cars", async () => {
    const car = await Car.getAll();

    expect(car).toEqual([
      {
        id: "1",
        make: "Pontiac",
        model: "Aztek",
        year: 2001,
      },
      {
        id: "2",
        make: "Fiat",
        model: "Yugo",
        year: 1987,
      },
    ]);
  });

  it("patches a car by id", async () => {
    const id = 1;
    const make = "GMC";
    const car = await Car.patch(id, make);

    expect(car).toEqual({
      id: "1",
      ...car,
    });
  });

  it("deletes a car by id", async () => {
    const car = await Car.delete("2");

    expect(car).toEqual({
      id: "2",
      ...car,
    });
  });

  afterAll(() => {
    return pool.end();
  });
});
