import ContactLine from "./ContactLine";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((p) => (
        <ContactLine key={p.id} name={p.name} number={p.number} />
      ))}
    </div>
  );
};

export default Persons;
