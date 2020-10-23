/* eslint-disable no-console */
import React from 'react'
import { render } from '@testing-library/react'

import ErrorBoundary from './ErrorBoundary'
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

test('ErrorBoundary', () => {
  getAPIData.mockResolvedValueOnce({ data: { result: 'SUCCESS' } })
  render(
    <ErrorBoundary>
      <ErrorComponent throwError />
    </ErrorBoundary>,
  )

  // render(<ErrorComponent throwError />, { wrapper: ErrorBoundary }) // The above statement can also be written as like this, so that we dont have to nest the components whenver we using rerender

  expect.any(Error)
  expect(getAPIData).toHaveBeenCalledWith(
    'https://jsonplaceholder.typicode.com/errors',
  )
  expect(getAPIData).toHaveBeenCalledTimes(1)

  /* Even though we have handled for any error occurences in ErrorBoundary's componentDidCatch method, 
  the error will be thrown from both jest and React. So in order to handle this, we expect, there will be two console error and those 
  errors will be cleared before running any of the tests in this file using beforeAll lifecycle method. So with the below code,
  we ensure that console.error does not mess up with the other console error in the any of the test cases */
  expect(console.error).toHaveBeenCalledTimes(2)
})

function ErrorComponent({ throwError }) {
  if (throwError) throw new Error('Test Error')
  return null
}
