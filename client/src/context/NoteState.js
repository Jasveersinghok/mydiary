import createContext from "./NotesContext";
import { useState } from "react";
let url = "http://localhost:5000";
const NoteState = (props) => {
  const [notes, setNotes] = useState([]); //empty string nhi we have to give a array because we use note.map so it will produce error after a successfully compliation we can set notes
  const getNotes = async () => {
    const response = await fetch(`${url}/api/notes/getnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setNotes(data);
  };
  //add a note
  const addNote = async ({ title, description, tag }) => {
    //it takes object as a parameter and then match it to a object
    const response = await fetch(`${url}/api/notes/createnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const data = await response.json();
    setNotes(notes.concat(data));
  };
  //delete a note
  const deleteNote = async (id) => {
    //delete api
    const response = await fetch(`${url}/api/notes/deleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
    });
    const newNotes = notes.filter((element) => {
      return id !== element._id;
    });
    console.log(id);
    setNotes(newNotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${url}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      body: JSON.stringify({ title,description,tag }),
    });
    const data = await response.json();
    const newData = await JSON.parse(JSON.stringify(notes));
    console.log(newData);
    for (let i = 0; i < newData.length; i++) {
      let element = newData[i];
      if(element._id === id){
        newData[i].title = title
        newData[i].description = description
        newData[i].tag = tag
        break;
      }
    }
    setNotes(newData)
  };
  return (
    <createContext.Provider
      value={{ notes, setNotes, editNote, deleteNote, addNote, getNotes }}
    >
      {props.children}
    </createContext.Provider>
  );
};
export default NoteState;
