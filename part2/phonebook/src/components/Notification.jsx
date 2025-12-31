const Notification = ({ message, type }) => {

    const baseStyle = {
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }

    const success = {
        ...baseStyle,
        color: 'green',
    }

    const error = {
        ...baseStyle,
        color: 'red',
    }

  if (message === null) {
    return null
  }

  return (
    <div style={type === 'success'? success : error}>
      {message}
    </div>
  )
}

export default Notification