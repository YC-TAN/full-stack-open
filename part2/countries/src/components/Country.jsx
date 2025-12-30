const Country = ({ country, weather }) => {
  const languages = Object.values(country.languages);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((l, idx) => (
          <li key={idx}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      {weather &&
        <>
          <h2>{`Weather in ${country.capital[0]}`}</h2>
          <p>{`Temperature ${weather.main.temp} Celcius`}</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather.description} />
          <p>{`Wind ${weather.wind.speed} m/s`}</p>
        </>
      }
    </div>
  );
};

export default Country;
