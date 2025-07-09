import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { SubscribeToForecastUseCase } from "@domain/forecast/useCases/subscribe-to-forecast.usecase";
import type { UnsubscribeToForecastUseCase } from "@domain/forecast/useCases/unsubscribe-to-forecast.usecase";
import { AuthContext } from "@context/authContext";
import type { Forecast } from "@domain/forecast/entities/forecast";

interface ForecastUseCases {
  subscribeToForecast: SubscribeToForecastUseCase;
  unsubscribeToForecast: UnsubscribeToForecastUseCase;
}

export function useForecastPresenter(useCases: ForecastUseCases): {
  forecast: Forecast | null;
  isLoading: boolean;
} {
  const { token, cleanToken, authLoading } = useContext(AuthContext);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !authLoading) {
      navigate("/login");
      cleanToken();
    }

    const handleForecast = (forecast: Forecast) => {
      setForecast(forecast);
    };

    async function getForecast() {
      setIsLoading(true);
      if (token) {
        await useCases.subscribeToForecast.execute(handleForecast);
      }
      setIsLoading(false);
    }

    getForecast();

    return () => {
      if (token) {
        useCases.unsubscribeToForecast.execute(handleForecast);
      }
    };
  }, [token, authLoading]);

  return { forecast, isLoading };
}
