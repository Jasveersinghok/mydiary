import React from "react";
import AddNotes from "./AddNotes";

function Home(props) {

  return (
    <> 
      <AddNotes showAlert = {props.showAlert} />
    </>
  );
}

export default Home;
