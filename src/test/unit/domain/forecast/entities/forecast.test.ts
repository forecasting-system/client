import {
  Forecast,
  type ForecastProps,
} from "@domain/forecast/entities/forecast";
import { DateValueObject } from "@domain/forecast/valueObjects/date";
import { Point } from "@domain/forecast/valueObjects/point";

describe("Forecast", () => {
  it("should create a forecast", () => {
    const points = [
      { date: new Date(), y: 1 },
      { date: new Date(), y: 2 },
    ];

    const props: ForecastProps = {
      id: "1",
      created_at: new Date(),
      points: points,
    };

    const forecast = Forecast.create(props);

    expect(forecast).toBeInstanceOf(Forecast);
    expect(forecast.id.value).toBe(props.id);
    expect(forecast.created_at).toBeInstanceOf(DateValueObject);
    expect(forecast.created_at.value).toBe(props.created_at);
    expect(forecast.points).toBeInstanceOf(Array);
    expect(forecast.points[0]).toBeInstanceOf(Point);
    expect(forecast.points[0].value).toEqual(points[0]);
    expect(forecast.points[1]).toBeInstanceOf(Point);
    expect(forecast.points[1].value).toEqual(points[1]);
    expect(forecast.created_at).toBeInstanceOf(DateValueObject);
    expect(forecast.created_at.value).toBe(props.created_at);
  });

  it("should throw an error when creating a forecast with an invalid points array", () => {
    const props: ForecastProps = {
      id: "1",
      created_at: new Date(),
      // @ts-expect-error: tests errors
      points: {},
    };

    expect(() => {
      Forecast.create(props);
      // @ts-expect-error: tests errors
    }).toThrowError("Invalid points");
  });
});
