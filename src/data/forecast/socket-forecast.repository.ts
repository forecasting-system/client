import type { ForecastRepository } from "@domain/forecast/repositories/forecast-repository";
import { Forecast } from "@domain/forecast/entities/forecast";
import { Socket } from "socket.io-client";
import { SocketProvider } from "@data/socket";
import type { ApiForecast } from "./interface/apiForecast";
import { adaptForecast } from "./adapters/forecast.adapter";

type Callback = (forecast: Forecast) => void;

export class SocketForecastRepository implements ForecastRepository {
  private listeners = new Set<Callback>();
  private initialized = false;
  private socket: Socket;
  private socketProvider: SocketProvider;

  constructor() {
    const socketProvider = new SocketProvider();
    this.socketProvider = socketProvider;
    this.socket = socketProvider.socket;
  }

  public subscribe(callback: Callback): void {
    this.listeners.add(callback);

    if (!this.socket.connected) {
      this.socket.connect();

      if (!this.initialized) {
        this.initialized = true;
        this.socket.on("connect", () => {
          this.socket.emit("subscribe"); // initial request
        });
      }

      this.socket.on("forecast", (data: ApiForecast) => {
        const forecast = adaptForecast(data);
        this.listeners.forEach((cb) => cb(forecast));
      });

      this.socket.on("exception", (error) => {
        console.error("Server-side socket exception:", error);
        if (error?.message === "Unauthorized" || error?.status === 401) {
          this.socket.disconnect();
          this.socketProvider.clearToken();
        }
      });
    }
  }

  public unsubscribe(callback: Callback): void {
    this.listeners.delete(callback);

    if (this.listeners.size === 0) {
      this.socket.off("forecast");
      this.socket.disconnect();
    }
  }
}
