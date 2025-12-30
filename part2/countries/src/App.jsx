import { useEffect, useState } from "react";
import countryService from "./services/countries";
import Filter from "./components/Filter";
import Country from "./components/Country";
import CountryDisp from "./components/CountryDisp";

function App() {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService.getAll().then((initialData) => {
      setCountries(initialData);
    });
  }, []);

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
    setCountry(null);
    setWeather(null);
  };

  const countryToShow = (filterText) => {
    const filtered = countries.filter((c) =>
      c.name.common.toLowerCase().includes(filterText.toLowerCase())
    );
    return filterText ? filtered : [];
  };

  const handleShow = (country) => {
    setCountry(country);
    setWeather(null);

    const [lat, lng] = country.capitalInfo.latlng;
    console.log(lat, lng);
    countryService.getWeather(lat, lng).then((r) => {
      setWeather(r);
    });
  };

  return (
    <>
      <Filter onChange={handleFilterChange} />
      {country ? (
        <Country country={country} weather={weather} />
      ) : (
        <CountryDisp countries={countryToShow(newFilter)} onShow={handleShow} />
      )}
    </>
  );
}

export default App;
