const Country = ({ country }) => {
  const languages = Object.values(country.languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>{`Capital ${country.capital[0]}`}</p>
      <p>{`Area ${country.area}`}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((l, idx) => (
          <li key={idx}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
    </div>
  );
};

export default Country;
