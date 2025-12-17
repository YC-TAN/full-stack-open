const InputField = ({ label, value, onChange }) => {
  return (
    <div>
      {label}
      <input value={value} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <InputField label="name" value={newName} onChange={onNameChange} />
      <InputField label="number" value={newNumber} onChange={onNumberChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
