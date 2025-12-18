const InputField = ({ label, name, value, onChange }) => {
  return (
    <div>
      {label}
      <input name={name} value={value} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({ onSubmit, person, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <InputField 
        label="name: " 
        name="name"
        value={person.name} 
        onChange={onChange} 
      />
      <InputField 
        label="number: " 
        name="number"
        value={person.number} 
        onChange={onChange} 
      />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
