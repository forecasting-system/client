import { Login } from "@domain/login/entities/login";

describe("Login", () => {
  it("should create a new login", () => {
    const login = Login.create({
      user: "user",
      token: "token",
    });

    expect(login).toBeInstanceOf(Login);
  });

  it("should throw an error when creating a login without token", () => {
    expect(() => {
      // @ts-expect-error: tests errors
      Login.create({ user: "user" });
      // @ts-expect-error: tests errors
    }).toThrowError("Invalid login");
  });

  it("should throw an error when creating a login with invalid user", () => {
    expect(() => {
      Login.create({ user: "", token: "token" });
      // @ts-expect-error: tests errors
    }).toThrowError("Invalid login");
  });
});
