const Filter = ({ onChange }) => {
  return (
    <div>
      {`find countries `}
      <input onChange={onChange} />
    </div>
  );
};

export default Filter;
