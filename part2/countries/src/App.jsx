import { useEffect, useState } from "react";
import countryService from "./services/countries";
import Filter from "./components/Filter";
import Country from "./components/Country";
import CountryDisp from "./components/CountryDisp";

function App() {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [country, setCountry] = useState(null);

  useEffect(() => {
    countryService.getAll().then((initialData) => {
      setCountries(initialData);
    });
  }, []);

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
    setCountry(null);
  };

  const countryToShow = (filterText) => {
    const filtered = countries.filter((c) =>
      c.name.common.toLowerCase().includes(filterText.toLowerCase())
    );
    return filterText ? filtered : [];
  };

  return (
    <>
      <Filter onChange={handleFilterChange} />
      {country ? (
        <Country country={country} />
      ) : (
        <CountryDisp countries={countryToShow(newFilter)} onShow={setCountry} />
      )}
    </>
  );
}

export default App;
