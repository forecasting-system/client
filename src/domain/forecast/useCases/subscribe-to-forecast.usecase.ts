import type { Forecast } from "@domain/forecast/entities/forecast";
import type { ForecastRepository } from "@domain/forecast/repositories/forecast-repository";

export class SubscribeToForecastUseCase {
  constructor(private readonly forecastRepository: ForecastRepository) {}

  public async execute(callback: (forecast: Forecast) => void): Promise<void> {
    return this.forecastRepository.subscribe(callback);
  }
}
