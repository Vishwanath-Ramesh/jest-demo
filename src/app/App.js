import React, { useState } from 'react'

import { getAPIData } from '../../test/utils'
import './App.css'

const App = () => {
  const [value, setValue] = useState(0)
  const [userName, setUserName] = useState('')

  async function onSubmitClickHandler(e) {
    e.preventDefault()
    const response = await getAPIData(
      'https://jsonplaceholder.typicode.com/todos/1',
    )
    response?.data && setUserName(response.data.UserName)
  }

  return (
    <div>
      <label htmlFor="test-label">Test Label</label>
      <input id="test-label" type="number"></input>

      <label htmlFor="sample-input">Sample Input</label>
      <input
        id="sample-input"
        type="number"
        onChange={(event) => setValue(event.target.value)}
      />
      {value <= 0 ? (
        <div role="error" id="error">
          Invalid value
        </div>
      ) : null}

      <form onSubmit={onSubmitClickHandler}>
        <label htmlFor="name">Name</label>
        <input id="name" />
        <button type="submit">Submit</button>
        <div aria-label="sample-label">{userName}</div>
      </form>
    </div>
  )
}

export default App
