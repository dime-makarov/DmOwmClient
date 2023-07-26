import { useState } from "react";
import CityData from "./CityData";
import { AppId } from "./secrets";

function App() {
  const [cityName, setCityName] = useState("");
  const [cities, setCities] = useState([]);
  const [cityData, setCityData] = useState(null);

  function searchCities() {
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
        cityName +
        "&limit=5&appid=" +
        AppId
    )
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
        setCityData(null);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function onTableRowClick(lat, lon) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=metric&appid=" +
        AppId
    )
      .then((response) => response.json())
      .then((data) => {
        setCityData(data);
      })
      .catch((err) => {
        alert(err.message);
      });
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
