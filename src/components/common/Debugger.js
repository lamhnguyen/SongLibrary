import React from "react";

const Debugger = (props) => {
  return (
    <>
      <pre>
        <code>{JSON.stringify(props, null, 2)}</code>
      </pre>
    </>
  );
};

export default Debugger;
