export interface LoginData {
  user: string;
  token: string;
}

export interface LoginProps {
  user: string;
  token: string;
}

export class Login {
  public readonly user: string;
  public readonly token: string;

  constructor(props: LoginData) {
    this.user = props.user;
    this.token = props.token;
  }

  public static create(props: LoginProps): Login {
    if (!props.user || !props.token) {
      throw new Error("Invalid login");
    }

    try {
      return new Login({ user: props.user, token: props.token });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
