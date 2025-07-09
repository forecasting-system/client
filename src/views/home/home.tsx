import { ForecastFactory } from "@presenters/forecast.factory";
import { useForecastPresenter } from "@presenters/useForecastPresenter";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";

export const Home = () => {
  const { forecast } = useForecastPresenter(
    ForecastFactory.provideForecastCases()
  );

  const data = forecast?.points.map((point) => point.formattedValue) ?? [];

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center">
      <div className="bg-white/10 backdrop-blur rounded-2xl shadow-lg p-10 w-full max-w-6xl text-white min-h-[36rem] flex flex-col justify-between">
        <h2 className="text-3xl font-semibold text-center mb-6 text-cyan-200">
          Sales Forecast
        </h2>
        <div className="flex-grow flex items-center justify-center">
          {forecast ? (
            <div className="w-full h-[28rem]">
              <ResponsiveContainer>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="date" />
                  <YAxis dataKey="y" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-cyan-100 text-lg">Loading forecast...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
