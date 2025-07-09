import {
  Id,
  DateValueObject,
  Point,
  type PointData,
} from "@domain/forecast/valueObjects";

export interface ForecastData {
  id: Id;
  created_at: DateValueObject;
  points: Point[];
}

export interface ForecastProps {
  id: string;
  created_at: Date;
  points: PointData[];
}

export class Forecast {
  public readonly id: Id;
  public readonly created_at: DateValueObject;
  public readonly points: Point[];

  protected constructor(props: ForecastData) {
    this.id = props.id;
    this.created_at = props.created_at;
    this.points = props.points;
  }

  public static create(props: ForecastProps): Forecast {
    if (!Array.isArray(props.points)) {
      throw new Error("Invalid points");
    }

    return new Forecast({
      id: Id.create(props.id),
      created_at: DateValueObject.create(props.created_at),
      points: props.points.map((point) => Point.create(point)),
    });
  }
}
