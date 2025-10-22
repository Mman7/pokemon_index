// import { useState } from 'react'

import Navbar from "./components/Navbar/navbar";
import Body from "./body";

function App() {
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <Body />
      </div>
    </>
  );
}

export default App;
