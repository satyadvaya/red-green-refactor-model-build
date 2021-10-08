DROP TABLE IF EXISTS cars CASCADE;
DROP TABLE IF EXISTS manufacturers CASCADE;

CREATE TABLE manufacturers (
  id BIGINT GENERATED ALWAYS AS IDENTITY UNIQUE,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE cars (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  make BIGINT NOT NULL,
  model TEXT NOT NULL,
  year INT CHECK (year > 999 AND year < 10000),
  FOREIGN KEY (make) REFERENCES manufacturers(id) ON DELETE CASCADE
);

INSERT INTO manufacturers (name) VALUES 
  ('Audi'),
  ('BMW'),
  ('Cadillac'),
  ('Chevrolet'),
  ('Dodge'),
  ('Ferrari'),
  ('Ford'),
  ('GMC'),
  ('Honda'),
  ('Infiniti'),
  ('Jeep'),
  ('Lexus'),
  ('Mazda'),
  ('Mitsubishi'),
  ('Nissan'),
  ('Porsche'),
  ('Saab'),
  ('Subaru'),
  ('Tesla'),
  ('Toyota'),
  ('Volkswagen'),
  ('Volvo');
