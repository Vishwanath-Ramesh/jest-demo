/* eslint-disable no-console */
import React from 'react'
import { Redirect } from 'react-router'
import { render } from '@testing-library/react'
import { fireEvent, waitFor } from '@testing-library/react'
import { build, fake } from 'test-data-bot'

import Form from './Form'
import { getAPIData } from '../../../test/utils'

jest.mock('../../../test/utils') // All the functions which are exported in the specified module will be mocked
// const jestMock = jest.fn() // Instead of mocking entire module, we can mock specific function by this.

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

// afterEach : This is one of the Lifecycle method of jest which runs after each one of the tests in this file completes.
afterEach(() => jest.clearAllMocks()) // Clears the properties of all mocks so that no conflict can occur if one mock function is used in multiple test cases.

// beforeAll : This is one of the Lifecycle method of jest which runs before running any of the tests in this file
beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {})) // When console.error is called, jest will call the callback function passed to the 'mockImplementation' function which does nothing. So that error wont be displayed in the console.

// afterAll : This is one of the Lifecycle method of jest which runs after executing all of the tests in this file
afterAll(() => {
  console.error.mockRestore() // It restores the console.error to it's original implementation
  jest.useRealTimers() // If we are faking timers in any of the test case, we have restore to use real timers.
})

/* Instead of giving the harcoded values for test cases, we can generate the values randomly, so that test suites can be executed 
   with different values and fix the isses if there is one.  */
const postDataBuilder = build('Post').fields({
  name: fake((f) => f.lorem.words()),
  age: fake((f) => `${f.random.number({ min: 1, max: 100 })}`),
})

test('FormRedirect', async () => {
  getAPIData.mockResolvedValueOnce()

  const fakePost = {
    ...postDataBuilder(),
    date: expect.any(String),
  }
  const preDate = new Date().getTime()
  const { getByLabelText, getByText } = render(<Form />)
  getByLabelText('Name').value = fakePost.name
  getByLabelText('Age').value = fakePost.age
  const submitButton = getByText('Submit')

  fireEvent.click(submitButton)
  expect(submitButton).toBeDisabled()
  expect(getAPIData).toHaveBeenCalledWith(
    'https://jsonplaceholder.typicode.com/errors',
    fakePost,
  )
  expect(getAPIData).toHaveBeenCalledTimes(1)
  const postDate = new Date().getTime()
  const date = new Date(getAPIData.mock.calls[0][1].date).getTime()
  expect(date).toBeGreaterThanOrEqual(preDate)
  expect(date).toBeLessThanOrEqual(postDate)

  await waitFor(() => expect(Redirect).toHaveBeenCalledWith({ to: '/' }, {}))
})
