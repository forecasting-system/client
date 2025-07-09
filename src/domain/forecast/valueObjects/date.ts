const ATTRIBUTE_NAME = "date";

export class DateValueObject {
  private _value: Date;

  constructor(value: Date) {
    this._value = value;
  }

  static isEmpty(date: Date): boolean {
    return !date;
  }

  static isValidDate(date: Date): boolean {
    return !isNaN(date.getTime());
  }

  static create(value: Date): DateValueObject {
    if (this.isEmpty(value)) {
      throw new Error("Date cannot be empty");
    }
    if (!this.isValidDate(value)) {
      throw new Error("Invalid date");
    }
    return new DateValueObject(value);
  }

  public get value(): Date {
    return this._value;
  }

  public get attributeName(): typeof ATTRIBUTE_NAME {
    return ATTRIBUTE_NAME;
  }
}
