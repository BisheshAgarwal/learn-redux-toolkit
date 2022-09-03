import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { icecreamActions } from "./icecreamSlice";

const IcecreamView = () => {
  const dispatch = useDispatch();
  const numOfIcecreams = useSelector((state) => state.icecream.numOfIcecreams);
  return (
    <div>
      <h2>Number of icecreams - {numOfIcecreams} </h2>
      <button onClick={() => dispatch(icecreamActions.ordered())}>
        Order icecream
      </button>
      <button onClick={() => dispatch(icecreamActions.restocked(5))}>
        Restock icecreams
      </button>
    </div>
  );
};

export default IcecreamView;
