export interface ApiPointData {
  date: string;
  y: number;
}

export interface ApiForecast {
  id: string;
  created_at: string;
  points: ApiPointData[];
  model_version: string;
}
