import { DateValueObject } from "@domain/forecast/valueObjects/date";

describe("DateValueObject", () => {
  it("should create a new instance of DateValueObject with a valid date", () => {
    const value = new Date();
    const date = DateValueObject.create(value);
    expect(date).toBeInstanceOf(DateValueObject);
    expect(date.value).toEqual(value);
  });

  it("should throw an error when creating a new instance of DateValueObject with an empty date", () => {
    const value = "";
    expect(() => {
      // @ts-expect-error: tests errors
      DateValueObject.create(value);
      // @ts-expect-error: tests errors
    }).toThrowError("Date cannot be empty");
  });

  it("should throw an error when creating a new instance of DateValueObject with an invalid date", () => {
    const value = new Date("invalid-date");
    expect(() => {
      DateValueObject.create(value);
      // @ts-expect-error: tests errors
    }).toThrowError("Invalid date");
  });
});
