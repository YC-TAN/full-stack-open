import { useEffect, useState } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialData) => {
      setPersons(initialData);
    });
  }, []);

  const addToPhonebook = (e) => {
    e.preventDefault();
    const person = persons.find((p) => p.name === newName);

    if (person) {
      if (
        !confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      )
        return;
      const updatedPerson = { ...person, number: newNumber };

      personService
        .update(person.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons((prevPersons) =>
            prevPersons.map((p) =>
              p.id === returnedPerson.id ? returnedPerson : p
            )
          );
        });
    } else {
      const nameObj = {
        name: newName,
        number: newNumber,
      };

      personService.create(nameObj).then((returnedObj) => {
        setPersons((prevPersons) => prevPersons.concat(returnedObj));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  const contactsToShow = (filterText) => {
    const filtered = persons.filter((p) =>
      p.name.toLowerCase().includes(filterText.toLowerCase())
    );
    return filterText ? filtered : persons;
  };

  const deletePerson = (person) => {
    if (!confirm(`Delete ${person.name}?`)) return;

    personService
      .remove(person.id)
      .then(() => setPersons(persons.filter((p) => p.id !== person.id)));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addToPhonebook}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={contactsToShow(newFilter)} onDelete={deletePerson} />
    </div>
  );
};

export default App;
