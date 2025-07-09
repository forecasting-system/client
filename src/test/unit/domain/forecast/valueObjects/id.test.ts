import { describe, it, expect } from "vitest";
import { Id } from "@domain/forecast/valueObjects/id";

describe("Id", () => {
  it("should create a new instance of Id with a valid id", () => {
    const value = "idExample1234";
    const id = Id.create(value);
    expect(id).toBeInstanceOf(Id);
    expect(id.value).toEqual(value);
  });

  it("should throw an error when creating a new instance of id with a null value", () => {
    const value = null;
    expect(() => {
      // @ts-expect-error: tests errors
      Id.create(value);
    }).toThrowError("ID cannot be empty");
  });

  it("should throw an error when creating a new instance of id with an undefined value", () => {
    const value = undefined;
    expect(() => {
      // @ts-expect-error: tests errors
      Id.create(value);
    }).toThrowError("ID cannot be empty");
  });

  it("should throw an error when creating a new instance of id with an empty string", () => {
    const value = "";
    expect(() => {
      Id.create(value);
    }).toThrowError("ID cannot be empty");
  });

  it("should throw an error when creating a new instance of id with an array", () => {
    const value: string[] = [];
    expect(() => {
      // @ts-expect-error: tests errors
      Id.create(value);
    }).toThrowError("Invalid ID");
  });

  it("should throw an error when creating a new instance of id with an object", () => {
    const value = {};
    expect(() => {
      // @ts-expect-error: tests errors
      Id.create(value);
    }).toThrowError("Invalid ID");
  });

  it("should throw an error when creating a new instance of id with a boolean", () => {
    const value = true;
    expect(() => {
      // @ts-expect-error: tests errors
      Id.create(value);
    }).toThrowError("Invalid ID");
  });
});
