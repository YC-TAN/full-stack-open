import { useEffect, useState } from "react";
import countryService from "./services/countries";
import Filter from "./components/Filter";
import CountryDisp from "./components/CountryDisp";

function App() {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log(countries)
    console.log("fetching")
    countryService
      .getAll()
      .then((initialData) => {
        console.log("response",initialData)
        setCountries(initialData);
      });
  }, []);

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
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
      <CountryDisp countries={countryToShow(newFilter)}/>
    </>
  );
}

export default App;
