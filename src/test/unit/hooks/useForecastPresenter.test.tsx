import { vi, type Mock } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { renderHook, waitFor } from "@testing-library/react";
import { useForecastPresenter } from "@presenters/useForecastPresenter";
import { AuthContext } from "@context/authContext";
import { SubscribeToForecastUseCase } from "@domain/forecast/useCases/subscribe-to-forecast.usecase";
import type { ForecastRepository } from "@domain/forecast/repositories/forecast-repository";
import { UnsubscribeToForecastUseCase } from "@domain/forecast/useCases/unsubscribe-to-forecast.usecase";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock Forecast.create and forecast object
const fakeForecast = {
  id: "forecast-id",
  created_at: new Date(),
  points: [],
};

const ForecastMock = {
  create: vi.fn().mockReturnValue(fakeForecast),
};

vi.mock("@domain/forecast/entities/forecast", async () => {
  const actual = await vi.importActual("@domain/forecast/entities/forecast");
  return {
    ...actual,
    Forecast: {
      // @ts-ignore
      ...actual.Forecast,
      create: ForecastMock.create,
    },
  };
});

describe("useForecastPresenter", () => {
  let mockSubscribe: (callback: (f: any) => void) => void;
  let mockUnsubscribe: () => void;
  let forecastRepository: ForecastRepository;
  let subscribeUseCase: SubscribeToForecastUseCase;
  let unsubscribeUseCase: UnsubscribeToForecastUseCase;

  beforeEach(() => {
    mockSubscribe = vi.fn();
    mockUnsubscribe = vi.fn();

    forecastRepository = {
      subscribe: mockSubscribe,
      unsubscribe: mockUnsubscribe,
    };

    subscribeUseCase = new SubscribeToForecastUseCase(forecastRepository);
    unsubscribeUseCase = new UnsubscribeToForecastUseCase(forecastRepository);
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthContext.Provider
      value={{
        token: "valid-token",
        cleanToken: vi.fn(),
        authLoading: false,
        setToken: vi.fn(),
      }}
    >
      <MemoryRouter>{children}</MemoryRouter>
    </AuthContext.Provider>
  );

  it("redirects and cleans token when user is not authenticated", () => {
    const cleanToken = vi.fn();

    const wrapperNoAuth = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider
        value={{
          token: null,
          cleanToken,
          authLoading: false,
          setToken: vi.fn(),
        }}
      >
        <MemoryRouter>{children}</MemoryRouter>
      </AuthContext.Provider>
    );

    renderHook(
      () =>
        useForecastPresenter({
          subscribeToForecast: subscribeUseCase,
          unsubscribeToForecast: unsubscribeUseCase,
        }),
      {
        wrapper: wrapperNoAuth,
      }
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
    expect(cleanToken).toHaveBeenCalled();
  });

  it("fetches forecast and sets state", async () => {
    (mockSubscribe as Mock).mockImplementation((cb: (f: any) => void) => {
      cb(ForecastMock.create());
    });

    const { result } = renderHook(
      () =>
        useForecastPresenter({
          subscribeToForecast: subscribeUseCase,
          unsubscribeToForecast: unsubscribeUseCase,
        }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.forecast).toEqual(fakeForecast);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("sets loading state while fetching", async () => {
    let callback: (f: any) => void;

    (mockSubscribe as Mock).mockImplementation((cb: (f: any) => void) => {
      callback = cb;
    });

    const { result } = renderHook(
      () =>
        useForecastPresenter({
          subscribeToForecast: subscribeUseCase,
          unsubscribeToForecast: unsubscribeUseCase,
        }),
      { wrapper }
    );

    expect(result.current.isLoading).toBe(true);

    callback!(ForecastMock.create());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });
});
