import axios from "axios";
import { useState } from "react";
import CityData from "./CityData";
import { AppId } from "./secrets";

function App() {
  const [cityName, setCityName] = useState("");
  const [cities, setCities] = useState([]);
  const [cityData, setCityData] = useState(null);

  const webClient = axios.create({
    baseURL: "http://api.openweathermap.org",
  });

  async function searchCities() {
    try {
      var response = await webClient.get(
        `geo/1.0/direct?q=${cityName}&limit=5&appid=${AppId}`
      );
      setCities(response.data);
      setCityData(null);
    } catch (error) {
      alert(error);
    }
  }

  async function onTableRowClick(lat, lon) {
    try {
      var response = await webClient.get(
        `data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${AppId}`
      );
      setCityData(response.data);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <div>
        <input value={cityName} onChange={(e) => setCityName(e.target.value)} />
        <button onClick={searchCities}>Search</button>
      </div>
      {cities.length > 0 && (
        <div>
          <table cellSpacing="5">
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>State</th>
            </tr>
            {cities.map((item, index) => (
              <tr key={index}>
                <td>
                  <a
                    href="#"
                    onClick={() => onTableRowClick(item.lat, item.lon)}
                  >
                    {item.name}
                  </a>
                </td>
                <td>{item.country}</td>
                <td>{item.state}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
      {cityData != null && <CityData data={cityData} />}
    </div>
  );
}

export default App;
