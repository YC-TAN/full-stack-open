import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: ""
  })
  const [newFilter, setNewFilter] = useState("");

  const isDuplicate = (name) => {
    return persons.some((p) => p.name === name);
  }

  const addToPhonebook = (e) => {
    e.preventDefault();
    if (isDuplicate(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      const nameObj = {
        ...newPerson,
        id: persons.length + 1,
      };
      setPersons(persons.concat(nameObj));
      setNewPerson({ name: "", number: "" });
    }
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setNewPerson({...newPerson, [name]: value})
    if (name === "name") {
      if (isDuplicate(value)) {
        setTimeout(() => {
          alert(`${value} is already added to phonebook`);
        }, 0);
      };
    }    
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  const contactsToShow = (filterText) => {
    if (!filterText) return persons;
    return persons.filter((p) =>
      p.name.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addToPhonebook}
        person={newPerson}
        onChange={handleInputChange}
      />
      <h2>Numbers</h2>
      <Persons persons={contactsToShow(newFilter)} />
    </div>
  );
};

export default App;
