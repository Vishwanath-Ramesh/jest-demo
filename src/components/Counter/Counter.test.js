/* eslint-disable no-console */
import React from 'react'
import { render } from '@testing-library/react'

import Counter from './Counter'

jest.mock('../../../test/utils') // All the functions which are exported in the specified module will be mocked
// const jestMock = jest.fn() // Instead of mocking entire module, we can mock specific function by this.

// afterEach : This is one of the Lifecycle method of jest which runs after each one of the tests in this file completes.
afterEach(() => jest.clearAllMocks()) // Clears the properties of all mocks so that no conflict can occur if one mock function is used in multiple test cases.

// beforeAll : This is one of the Lifecycle method of jest which runs before running any of the tests in this file
beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {})) // When console.error is called, jest will call the callback function passed to the 'mockImplementation' function which does nothing. So that error wont be displayed in the console.

// afterAll : This is one of the Lifecycle method of jest which runs after executing all of the tests in this file
afterAll(() => {
  console.error.mockRestore() // It restores the console.error to it's original implementation
  jest.useRealTimers() // If we are faking timers in any of the test case, we have restore to use real timers.
})

test('TestUnmount - Testing whether the cleanup is happening when the component is unmounting', () => {
  jest.useFakeTimers() // Since we are using timers function(setInterval) in the component, so rather than waiting for the time to meet, we can use jest's inbuit functions to fake the timers.
  const { unmount } = render(<Counter />)
  unmount()
  jest.runOnlyPendingTimers() // It executes the tasks that have been queued by setTimeout() or setInterval() up to this point
  expect(console.error).not.toHaveBeenCalled()
})
