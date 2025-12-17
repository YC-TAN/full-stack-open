const Header = ({title}) => {
  return <h2>{title}</h2>
}

const Part = ({name, exercises}) => {
  return <p>{name} {exercises}</p>
}

const Content = ({parts}) => {
  return (
      <div> 
        {parts.map((part, i) => (
          <Part key={i} name={part.name} exercises={part.exercises}/>
        ))}
      </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <strong>total of {total} exercises </strong>
}

const Course = ({course}) =>{
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course;