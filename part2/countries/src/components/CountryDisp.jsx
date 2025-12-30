import CountryLine from "./CountryLine";

const CountryDisp = ({ countries, onShow }) => {
  if (countries.length === 1) {
    onShow(countries[0]);
    return null;
  }
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  return (
    <div>
      <ul>
        {countries.map((c) => (
          <CountryLine key={c.cca3} name={c.name.common} onClick={() => onShow(c)}/>
        ))}
      </ul>
    </div>
  );
};

export default CountryDisp;
