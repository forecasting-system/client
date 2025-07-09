import { CONSTANTS } from "@constants/external";
import { AuthCasesFactory } from "@presenters/auth.factory";
import { io, Socket } from "socket.io-client";

export let socketToken: string | null = null;

export const setSocketToken = (token: string | null) => {
  socketToken = token;
};

export class SocketProvider {
  private _socket: Socket;

  constructor() {
    this._socket = io(CONSTANTS.SOCKET_URL, {
      autoConnect: false,
      extraHeaders: {
        Authorization: `Bearer ${socketToken}`,
      },
    });
  }

  public get socket(): Socket {
    return this._socket;
  }

  public clearToken(): void {
    const useCases = AuthCasesFactory.authCases();
    useCases.clearToken.execute();
    socketToken = null;
  }
}
