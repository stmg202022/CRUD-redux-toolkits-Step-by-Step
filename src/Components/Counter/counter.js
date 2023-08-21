import React from "react";
import { useDispatch, useSelector } from "react-redux";

//CounterSice actions
import { increment, decrement } from "../../ReduxSlice/Counter/counterSlice";

const Counter = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.count);

  return (
    <div>
      <h1>Counter</h1>
      <p>{count}</p>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        Decrement
      </button>
    </div>
  );
};

export default Counter;
