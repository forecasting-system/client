const ATTRIBUTE_NAME = "id";

export class Id {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  }

  private static isValid(value: string): boolean {
    return typeof value === "string";
  }

  private static isEmpty(value: string): boolean {
    return !value;
  }

  public static create(value: string): Id {
    if (this.isEmpty(value)) {
      throw new Error("ID cannot be empty");
    }
    if (!this.isValid(value)) {
      throw new Error("Invalid ID");
    }
    return new Id(value);
  }

  public get value(): string {
    return this._value;
  }

  public get attributeName(): typeof ATTRIBUTE_NAME {
    return ATTRIBUTE_NAME;
  }
}
