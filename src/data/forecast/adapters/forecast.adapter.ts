import { Forecast } from "@domain/forecast/entities/forecast";
import type {
  ApiForecast,
  ApiPointData,
} from "@data/forecast/interface/apiForecast";

export const adaptForecast = (data: ApiForecast): Forecast => {
  const mappedData = {
    ...data,
    created_at: new Date(data.created_at),
    points: data.points.map((point: ApiPointData) => ({
      date: new Date(point.date),
      y: point.y,
    })),
  };
  return Forecast.create(mappedData);
};
