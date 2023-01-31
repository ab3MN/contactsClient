export interface IWeather {
  main: { temp: number; pressure: number; humidity: number };
  weather: Array<{ main: string; description: string; icon: string }>;
  name: string;
  wind: {
    speed: string;
  };
}
