import { Point } from "@domain/forecast/valueObjects/point";

describe("Point", () => {
  it("should create a new instance of Point with a valid point", () => {
    const value = { date: new Date(), y: 10 };
    const point = Point.create(value);
    expect(point).toBeInstanceOf(Point);
    expect(point.value).toEqual(value);
  });

  it("should throw an error when creating a point with an invalid point", () => {
    const value = { date: new Date(), y: "10" };
    // @ts-expect-error: tests errors
    expect(() => Point.create(value)).toThrowError("Invalid point");
  });

  it("should throw an error when creating a point with an invalid date", () => {
    const value = { date: "2023-01-01", y: 10 };
    // @ts-expect-error: tests errors
    expect(() => Point.create(value)).toThrowError("Invalid point");
  });

  it("should throw an error when creating a point with an invalid y", () => {
    const value = { date: new Date(), y: "10" };
    // @ts-expect-error: tests errors
    expect(() => Point.create(value)).toThrowError("Invalid point");
  });
});
