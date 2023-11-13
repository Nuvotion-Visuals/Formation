import { useEffect, useRef } from "react";

/**
 * A React hook that captures and returns the previous value of a specific variable.
 * This hook is especially useful when you need the previous state in useEffect, 
 * when you want to compare the previous and current state, 
 * or when you want to revert the state to the previous state under certain conditions.
 * 
 * @function
 * @template T - A type variable which holds the data type of the state variable from which you want to get previous value.
 * @param {T} value - The state variable for which you want to capture and return the previous value.
 *
 * @return {T | undefined} The previous value of the state variable. If there is no previous value (for example, on the first render), it returns undefined.
 *
 * @example
 * // Example usage inside a component
 * function Counter() {
 *   const [count, setCount] = useState(10);
 *   const previousCount = usePrevious(count);
 *
 *   // Logs the current count value and its previous value every time count changes
 *   useEffect(() => {
 *     console.log(`Current count value: ${count}, previous: ${previousCount}`);
 *   }, [count]);
 *
 *   return (
 *     <div>
 *       <p>Count: {count}</p>
 *       <button onClick={() => setCount(count + 1)}>Increment count</button>
 *     </div>
 *  );
 * }
 *
 *
 * @see {@link https://reactjs.org/docs/hooks-reference.html#useref|React.useRef}
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
