import CountryLine from "./CountryLine";

const CountryDisp = ({ countries }) => {
  // if (countries.length === 1) {
  //   return <Country country={countries[0]} />;
  // }
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  return (
    <div>
      <ul>
        {countries.map((c) => (
          <CountryLine
            key={c.cca3}
            name={c.name.common}
          />
        ))}
      </ul>
    </div>
  );
};

export default CountryDisp;