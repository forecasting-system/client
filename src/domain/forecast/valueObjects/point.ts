const ATTRIBUTE_NAME = "point";

export interface PointData {
  date: Date;
  y: number;
}

export class Point {
  private readonly date: Date;
  private readonly y: number;

  private constructor(props: PointData) {
    this.date = props.date;
    this.y = props.y;
  }

  static isValid(point: PointData): boolean {
    return (
      point.date instanceof Date &&
      typeof point.y === "number" &&
      !isNaN(point.y)
    );
  }

  static create(point: PointData): Point {
    if (!this.isValid(point)) {
      throw new Error("Invalid point");
    }
    return new Point(point);
  }

  public get value(): PointData {
    return {
      date: this.date,
      y: this.y,
    };
  }

  public get formattedValue(): { date: string; y: number } {
    return {
      date: this.date.toISOString().split("T")[0],
      y: this.y,
    };
  }

  public get attributeName(): typeof ATTRIBUTE_NAME {
    return ATTRIBUTE_NAME;
  }
}
