import ContactLine from "./ContactLine";

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((p) => (
        <ContactLine 
          key={p.id} 
          name={p.name} 
          number={p.number} 
          onClick={() => onDelete(p)}
        />
      ))}
    </div>
  );
};

export default Persons;
