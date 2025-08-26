import React, { useState } from "react";

const JitsiComponent = () => {
  const [room, setRoom] = useState("Expert-Call");

  return (
    <div>
      <h2>Video Call Room: {room}</h2>
    </div>
  );
};

export default JitsiComponent;
