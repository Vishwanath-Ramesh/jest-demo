import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'

import { getAPIData } from '../../test/utils'
import App from './App'

jest.mock('../../test/utils') // All the functions which are exported in the specified module will be mocked
// const jestMock = jest.fn() // Instead of mocking entire module, we can mock specific function by this.

// afterEach : This is one of the Lifecycle method of jest which runs after each one of the tests in this file completes.
afterEach(() => jest.clearAllMocks()) // Clears the properties of all mocks so that no conflict can occur if one mock function is used in multiple test cases.

// afterAll : This is one of the Lifecycle method of jest which runs after executing all of the tests in this file
afterAll(() => {
  jest.useRealTimers() // If we are faking timers in any of the test case, we have restore to use real timers.
})

test('Button label should be "Submit"', () => {
  const { getByText } = render(<App />)
  const submitButton = getByText('Submit')
  fireEvent.click(submitButton)

  // expect(submitButton.textContent).toBe('Submit')

  /* 
  When the above test case fails, the error message is not clear. Also, instead of accessing the 'textContent' from the whole object,
  we have a library called '@testing-library/jest-dom'. Having this library configured, we can check for the test cases with the below
  method very easily.
   */
  expect(submitButton).toHaveTextContent('Submit')
})

test('Input type should be a number', () => {
  // const { getByLabelText } = renderUI(<InputLabel />) // Custom utility function method.
  const { getByLabelText } = render(<App />)
  const inputLabel = getByLabelText('Test Label')
  // const inputLabel = queries.getByLabelText(div, /Test Label/i)  // Ignore Casing
  expect(inputLabel).toHaveAttribute('type', 'number')
  // debug()  // Debug during tests
})

test('Validating Textbox value', () => {
  const { getByLabelText, getByRole } = render(<App />)
  const inputControl = getByLabelText('Sample Input')
  // fireEvent.change(inputControl, { target: { value: '-10' } }) // Change event
  user.type(inputControl, '-1')
  // rerender(<InputValidation value={20} />)  // When you need to rerender the component with different props
  expect(getByRole('error')).toHaveTextContent('Invalid value') // getByRole : get the element by role, if the element does not exists, it will throw error
  // expect(queryByRole('error')).toBeNull() // queryByRole : same as getByRole except that it will not throw error. So that we can use this to check whether the element is preset or not.
})

test('testAPI', async () => {
  const mockAPIResponse = 'TEST_USER'
  getAPIData.mockResolvedValueOnce({ data: { UserName: mockAPIResponse } })
  const { getByLabelText, getByText } = render(<App />)
  const buttonControl = getByText('Submit')
  fireEvent.click(buttonControl)
  expect(getAPIData).toHaveBeenCalledWith(
    'https://jsonplaceholder.typicode.com/todos/1',
  )
  expect(getAPIData).toHaveBeenCalledTimes(1)
  await waitFor(() =>
    expect(getByLabelText('sample-label')).toHaveTextContent(mockAPIResponse),
  )
})

test('matchSnapshot', () => {
  const adults = getAdults() // Pretend this data is fetched from API.

  /* 
  For the below test case, we checked the result from the function with the harcoded value below. Since the data is retrieved from API, 
  so it can change from time to time. Checking the harcoded value may fail at different point of time. For that we use 'toMatchSnapshot'.
  
  Test case with the harcoded values.  
  expect(adults).toEqual([
    { age: 22, name: 'Arun' },
    { age: 18, name: 'Suresh' },
    { age: 55, name: 'Dinesh' },
    { age: 44, name: 'Aravind' },
    { age: 23, name: 'Vijay' },
    { age: 33, name: 'Vijay' },
  ])
  */

  /* 
  toMatchSnapshot -  Executes the test case with the result obtained from the actual returned value. This will create a snapshot folder where the test suite is located.
  So if the test suite executed at some other time, it matches the data present in the snapshot directory.
  In order to match with the updated value we need to update the snapshot by '$ npm test -- -u'.
  Since this method creats a additional files in our source directory, we can opt for different method which is 'toMatchInineSnapshot'.

  Test case with the value from the toMatchSnapshot
  expect(adults).toMatchSnapshot()
  */

  /*
  toMatchInineSnapshot - It will get the the results and replace the returned value inside the 'toMatchInlineSnapshot' function instead of 
  creating a snapshot file separately.
  So whenever we run tests with update snapshot flag, the jest will replace the new value inline.
  */

  expect(adults).toMatchInlineSnapshot(`
    Array [
      Object {
        "age": 22,
        "name": "Arun",
      },
      Object {
        "age": 18,
        "name": "Suresh",
      },
      Object {
        "age": 55,
        "name": "Dinesh",
      },
      Object {
        "age": 44,
        "name": "Aravind",
      },
      Object {
        "age": 23,
        "name": "Vijay",
      },
      Object {
        "age": 33,
        "name": "Santhosh",
      },
    ]
  `)
})

function getAdults() {
  const users = [
    { name: 'Arun', age: 22 },
    { name: 'Suresh', age: 18 },
    { name: 'Ramesh', age: 15 },
    { name: 'Dinesh', age: 55 },
    { name: 'Aravind', age: 44 },
    { name: 'Vijay', age: 23 },
    { name: 'Santhosh', age: 33 },
  ]

  return users.filter((user) => user.age >= 18)
}
