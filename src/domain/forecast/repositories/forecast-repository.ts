import type { Forecast } from "@domain/forecast/entities/forecast";

export interface ForecastRepository {
  subscribe(callback: (forecast: Forecast) => void): void;
  unsubscribe(callback: (forecast: Forecast) => void): void;
}
