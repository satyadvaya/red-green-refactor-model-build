const fs = require('fs');
const pool = require('../utils/pool');
const Car = require('./car');

describe('Car model', () => {
  beforeEach(() => {
    return pool.query(
      fs.readFileSync(__dirname + '/../../sql/setup.sql', 'utf-8')
    );
  });

  afterAll(() => {
    return pool.end();
  });

  it('inserts a car into the database', async () => {
    const car = await Car.insert({ make: '1', model: 'R8', year: 2021 });

    expect(car).toEqual({
      id: expect.any(String),
      make: '1',
      model: 'R8',
      year: 2021,
    });
  });

  it('gets a car by ID from the database', async () => {
    await Car.insert({ make: '1', model: 'R8', year: 2021 });
    const car = await Car.findById('1');

    expect(car).toEqual({
      id: expect.any(String),
      make: 'Audi',
      model: 'R8',
      year: 2021,
    });
  });

  it('gets all cars', async () => {
    await Promise.all([
      Car.insert({ make: '1', model: 'R8', year: 2021 }),
      Car.insert({ make: '2', model: 'M4', year: 2021 }),
      Car.insert({ make: '3', model: 'Escalade', year: 2021 }),
    ]);

    const cars = await Car.find();

    expect(cars).toEqual(
      expect.arrayContaining([
        { id: expect.any(String), make: 'Audi', model: 'R8', year: 2021 },
        { id: expect.any(String), make: 'BMW', model: 'M4', year: 2021 },
        {
          id: expect.any(String),
          make: 'Cadillac',
          model: 'Escalade',
          year: 2021,
        },
      ])
    );
  });

  it('updates a car by ID', async () => {
    const car = await Car.insert({ make: '1', model: 'R8', year: 2021 });

    const updatedCar = await Car.updateById(car.id, { year: 2022 });

    expect(updatedCar).toEqual({
      id: expect.any(String),
      make: '1',
      model: 'R8',
      year: 2022,
    });
  });

  it('deletes a car by ID', async () => {
    const car = await Car.insert({ make: '1', model: 'R8', year: 2021 });

    const deletedCar = await Car.deleteById(car.id);

    const carNotFound = await Car.findById(car.id);

    expect(deletedCar).toEqual({
      id: expect.any(String),
      make: '1',
      model: 'R8',
      year: 2021,
    });

    expect(carNotFound).toBeNull();
  });
});
