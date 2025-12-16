import { useState } from "react";

const Title = ({text}) => {
  return <h1>{text}</h1>
}

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
};

const Disp = ({text, count}) => {
  return (
    <>
      <p>{text}</p>
      <p>has {count} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [most, setMost] = useState(0);

  const handleNext = () => {
    const getRandom = () => Math.floor(Math.random() * anecdotes.length);
    let random = getRandom();
    while (selected === random) {
      random = getRandom();
    }
    setSelected(random);
  };

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    if (copy[selected] > copy[most]) {
      setMost(selected);
    }
    setVotes(copy);
  }

  // Check if there are any votes at all
  const hasVotes = votes.some(v => v > 0);

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Disp text={anecdotes[selected]} count={votes[selected]} />
      <Button onClick={handleVote} text={"vote"}/>
      <Button onClick={handleNext} text={"next anecdote"}/>
      <Title text="Anecdote with most votes" />
      {hasVotes? (
        <Disp text={anecdotes[most]} count={votes[most]} />
      ) : (
        <p>No votes yet.</p>
      )}
    </div>
  );
};

export default App;
