import { renderHook, act } from '@testing-library/react-hooks'

import { useCounter } from './useCounter'

// afterEach : This is one of the Lifecycle method of jest which runs after each one of the tests in this file completes.
afterEach(() => jest.clearAllMocks()) // Clears the properties of all mocks so that no conflict can occur if one mock function is used in multiple test cases.

// afterAll : This is one of the Lifecycle method of jest which runs after executing all of the tests in this file
afterAll(() => {
  jest.useRealTimers() // If we are faking timers in any of the test case, we have restore to use real timers.
})

test('Counter - Testing custom hook with no initial value', () => {
  // const result = renderCustomHook({ initialProps: {} }) // Instead using custom functions, we can also use the in-built function(below code) to render react custom hooks
  const { result } = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('Counter - Testing custom hook with providing initialCount value', () => {
  // const result = renderCustomHook({ initialProps: { initialCount: 2 } }) // Instead using custom functions, we can also use the in-built function(below code) to render react custom hooks
  const { result } = renderHook(useCounter, {
    initialProps: { initialCount: 2 },
  })
  expect(result.current.count).toBe(2)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(2)
})

test('Counter - Testing custom hook with providing step value', () => {
  // const result = renderCustomHook({ initialProps: { step: 2 } }) // Instead using custom functions, we can also use the in-built function(below code) to render react custom hooks
  const { result } = renderHook(useCounter, { initialProps: { step: 2 } })
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('Counter - Testing custom hook with providing step value and updating it', () => {
  // const result = renderCustomHook({ initialProps: { step: 2 } }) // Instead using custom functions, we can also use the in-built function(below code) to render react custom hooks
  const { result, rerender } = renderHook(useCounter, {
    initialProps: { step: 2 },
  })
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  rerender({ step: 1 })
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})

/* Instead of duplication the code, we can create a function and use it at different places 
function renderCustomHook({ initialProps }) {
  const result = {}

  function TestComponent() {
    result.current = useCounter({ ...initialProps })
    return null
  }
  render(<TestComponent {...initialProps} />)

  return result
}
*/
