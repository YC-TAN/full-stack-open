import { useState } from 'react'

const Button = ({onClick, label}) => {
  return (
    <button onClick={onClick}>
      {label}
    </button> 
  )   
}

const StatLine = ({text, value}) => {
  return (
    <tr>
      <th>
        {text}
      </th>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  // (the feedback values are: good 1, neutral 0, bad -1)
  const average = (good - bad)/ total
  const positive = good / total * 100

  return (
    <table>
      <StatLine text="Good" value={good} />
      <StatLine text="Neutral" value={neutral} />
      <StatLine text="Bad" value={bad} />
      <StatLine text="all" value={total} />
      <StatLine text="average" value={average.toFixed(1)} />
      <StatLine text="positive" value={`${positive.toFixed(1)} %`} />
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button label="good" onClick={() => setGood(good+1)}/>
      <Button label="neutral" onClick={() => setNeutral(neutral+1)}/>
      <Button label="bad" onClick={() => setBad(bad+1)}/>
      <h1>Statistics</h1> 
      <Statistics good={good} neutral={neutral} bad={bad}/>     
    </div>
  )
}

export default App