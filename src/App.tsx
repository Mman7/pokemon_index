// import { useState } from 'react'

import Navbar from "./components/Navbar/navbar";
import Body from "./components/side_bar";

function App() {
  return (
    // TODO:
    //** a enum of content types */
    //** < same componenet content='what content' />
    <>
      <div className="flex flex-col">
        <Navbar />
        <Body />
      </div>
    </>
  );
}

export default App;
