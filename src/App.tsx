import './App.css';
import Grid from '@mui/material/Grid2';
import IndicatorWeather from './components/IndicatorWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface Item {
  dateStart: string;
  dateEnd: string;
  precipitation: string;
  humidity: string;
  clouds: string;
  temperature: string;
  tempMin: string;
  tempMax: string;
  windSpeed: string;
  windDirection: string;
  pressure: string;
  weatherDescription: string;
}

interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
}

function App() {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedVariable, setSelectedVariable] = useState<string>('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      const API_KEY = "e415accb839161aa2fbfe4059d0588a2";
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`
        );
        const savedTextXML = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");

        const name = xml.getElementsByTagName("name")[0]?.textContent || "";
        const location = xml.getElementsByTagName("location")[1];
        const latitude = location?.getAttribute("latitude") || "";
        const longitude = location?.getAttribute("longitude") || "";
        const altitude = location?.getAttribute("altitude") || "";

        setIndicators([
          { title: "City", subtitle: "ciudad", value: name },
          { title: "Latitude", subtitle: "latitud", value: latitude },
          { title: "Longitude", subtitle: "longitud", value: longitude },
          { title: "Altitude", subtitle: "altitud", value: altitude },
        ]);

        const times = xml.getElementsByTagName("time");

        const formatDateTime = (dateTime: string) => {
          const [date, time] = dateTime.split("T");
          return `${date}\n${time.substring(0, 5)}`;
        };

        const dataToItems: Item[] = Array.from(times).map((time) => {
          const temperatureElement = time.getElementsByTagName("temperature")[0];
          const windSpeedElement = time.getElementsByTagName("windSpeed")[0];
          const windDirectionElement = time.getElementsByTagName("windDirection")[0];
          const pressureElement = time.getElementsByTagName("pressure")[0];
          const symbolElement = time.getElementsByTagName("symbol")[0];
        
          const kelvinToCelsius = (temp: string) =>
            temp ? (parseFloat(temp) - 273.15).toFixed(2) : "N/A";
        
          return {
            dateStart: formatDateTime(time.getAttribute("from") || "N/A"),
            dateEnd: formatDateTime(time.getAttribute("to") || "N/A"),
            precipitation: time.getElementsByTagName("precipitation")[0]?.getAttribute("value") || "0",
            humidity: time.getElementsByTagName("humidity")[0]?.getAttribute("value") || "0",
            clouds: time.getElementsByTagName("clouds")[0]?.getAttribute("all") || "0",
            temperature: kelvinToCelsius(temperatureElement?.getAttribute("value") || "N/A"),
            tempMin: kelvinToCelsius(temperatureElement?.getAttribute("min") || "N/A"),
            tempMax: kelvinToCelsius(temperatureElement?.getAttribute("max") || "N/A"),
            windSpeed: windSpeedElement?.getAttribute("mps") || "N/A",
            windDirection: windDirectionElement?.getAttribute("name") || "N/A",
            pressure: pressureElement?.getAttribute("value") || "N/A",
            weatherDescription: symbolElement?.getAttribute("name") || "N/A",
          };
        });

        setItems(dataToItems);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);
  return (
    <>
      <header className="dashboard-header">
      <nav className="navbar">
          <ul>
            <li><a href="#guayaquil-section">Inicio</a></li>
            <li><a href="#metrics-section">Métricas</a></li>
            <li><a href="#table-section">Tabla</a></li>
          </ul>
        </nav><h1>
          Dashboard
          <img
            src="https://cdn-icons-png.flaticon.com/512/1669/1669524.png"
            alt="Weather Icon"
          />
        </h1>
        
      </header>

      <div id="guayaquil-section" className="background-container">
        <div className="indicator-grid">
          <Grid container spacing={2} justifyContent="center" alignItems="center" columns={12}>
            {indicators.map((indicator, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <IndicatorWeather title={indicator.title} subtitle={indicator.subtitle} value={indicator.value} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      <div id="metrics-section">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Paper
              sx={{
                backgroundColor: '#e3f2fd',
                padding: 3,
                borderRadius: 2,
                width: '100%',
              }}
            >
              <Typography
                variant="h5"
                color="primary"
                gutterBottom
                textAlign="center"
                sx={{ marginBottom: 2 }}
              >
                Métricas
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={6}>
                  <ControlWeather onSelectVariable={setSelectedVariable} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <LineChartWeather items={items} selectedVariable={selectedVariable} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>

      <div id="table-section">
        <Grid container spacing={3} mt={4}>
          <Grid item xs={12}>
            <TableWeather itemsIn={items} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
