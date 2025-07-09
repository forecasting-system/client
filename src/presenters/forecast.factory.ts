import { SubscribeToForecastUseCase } from "@domain/forecast/useCases/subscribe-to-forecast.usecase";
import { SocketForecastRepository } from "@data/forecast/socket-forecast.repository";
import { UnsubscribeToForecastUseCase } from "@domain/forecast/useCases/unsubscribe-to-forecast.usecase";

export class ForecastFactory {
  static provideForecastCases() {
    const useForecastMemoryRepository = new SocketForecastRepository();

    return {
      subscribeToForecast: new SubscribeToForecastUseCase(
        useForecastMemoryRepository
      ),
      unsubscribeToForecast: new UnsubscribeToForecastUseCase(
        useForecastMemoryRepository
      ),
    };
  }
}
