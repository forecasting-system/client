import { vitest } from "vitest";

import {
  Forecast,
  type ForecastProps,
} from "@domain/forecast/entities/forecast";
import type { ForecastRepository } from "@domain/forecast/repositories/forecast-repository";
import { SubscribeToForecastUseCase } from "@domain/forecast/useCases/subscribe-to-forecast.usecase";

describe("GetForecastUseCase", () => {
  it("should return a forecast", async () => {
    // Arrange
    const points = [
      { date: new Date(), y: 1 },
      { date: new Date(), y: 2 },
    ];

    const props: ForecastProps = {
      id: "1",
      created_at: new Date(),
      points: points,
    };

    const forecast = Forecast.create(props);

    const ForecastRepository: ForecastRepository = {
      subscribe: vitest.fn().mockResolvedValue(forecast),
      unsubscribe: vitest.fn(),
    };

    const useCase = new SubscribeToForecastUseCase(ForecastRepository);

    // Act
    // @ts-expect-error: tests errors
    const result = await useCase.execute((forecast) => {});

    // Assert
    expect(result).toBe(forecast);
  });
});
