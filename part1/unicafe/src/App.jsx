import { useState } from "react";

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const Title = ({text}) => {
  return <h1>{text}</h1>
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistic = ({good, bad, neutral}) => {
  const all = good + neutral + bad;
  const average = all? (good - bad )/all: 0;
  const positive = all ? good/all *100 : 0;

  if (all === 0) {
    return (
      <>
        <Title text="statistic" />
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
        <Title text="statistic" />
        <table>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={all} />
          <StatisticLine text={"average"} value={average} />
          <StatisticLine text={"positive"} value={positive + " %"} />
        </table>        
    </>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (text) => {
    if (text === "good") {
      setGood(good + 1)
    } else if (text === "neutral") {
      setNeutral(neutral + 1)
    } else if (text === "bad") {
      setBad(bad + 1)
    }
  };

  return (
    <>
      <div>
        <Title text="give feedback" />
        <Button onClick={() => handleClick("good")} text="good"/>
        <Button onClick={() => handleClick("neutral")} text="neutral"/>
        <Button onClick={() => handleClick("bad")} text="bad"/>
        <Statistic good={good} bad={bad} neutral={neutral} />
      </div>
    </>
  );
}

export default App;
