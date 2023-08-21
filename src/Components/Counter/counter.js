import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//CounterSice actions
import {
  increment,
  incrementByAmount,
  reset,
  decrement,
  decrementByAmount,
} from "../../ReduxSlice/Counter/counterSlice";

const Counter = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.count);
  const [incrementAmount, setIncrementAmount] = useState(0);

  const incrementValue = Number(incrementAmount) || 10;

  //acitons performing functions
  const Increment = () => {
    dispatch(increment());
  };
  const IncrementByAmount = () => {
    dispatch(incrementByAmount(incrementValue));
  };
  const Reset = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };
  const Decrement = () => {
    dispatch(decrement());
  };
  const DecrementByAmount = () => {
    dispatch(decrementByAmount(10));
  };

  return (
    <div>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={Increment}>Increment</button>
      <input
        type="text"
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(e.target.value)}
      />
      <button onClick={IncrementByAmount}>IncrementBy 10 || Input value</button>

      <button onClick={Reset}>Reset</button>

      <button onClick={Decrement}>Decrement</button>
      <button onClick={DecrementByAmount}>DecrementBy 10</button>
    </div>
  );
};

export default Counter;
