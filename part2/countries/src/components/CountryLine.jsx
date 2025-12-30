const CountryLine = ({ name, onClick }) => {
  return (
    <li className="country">
      {`${name} `}
      <button onClick={onClick}>Show</button>
    </li>
  );
};

export default CountryLine;
