import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { cakeActions } from "./cakeSlice";

const CakeView = () => {
  const dispatch = useDispatch();
  const numOfCakes = useSelector((state) => state.cake.numOfCakes);

  return (
    <div>
      <h2>Number of cakes - {numOfCakes} </h2>
      <button onClick={() => dispatch(cakeActions.ordered())}>
        Order cake
      </button>
      <button onClick={() => dispatch(cakeActions.restocked(5))}>
        Restock cakes
      </button>
    </div>
  );
};

export default CakeView;
