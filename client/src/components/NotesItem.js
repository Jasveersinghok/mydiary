import React, { useContext } from "react";
import NotesContext from "../context/NotesContext";

function NotesItem(props) {
  const context = useContext(NotesContext);
  const { deleteNote  } = context;
  const { note ,updateNotes} = props;
  return (
    <div className="card my- 3 margin-card">
      <div className="card-body">
        <div className="display-flex-i">
          <div className="icon ">
          <i
            onClick={() => {
              deleteNote(note._id);
            }}
            className="fa-solid fa-trash"
          ></i>
          <i
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="fa-solid btn  fa-file-pen"
            onClick={()=>{updateNotes(note)}}
          ></i>
          </div>
        </div>
        <strong className="card-title">{note.title}</strong>
        <p className="card-text">{note.description}</p>
        <code className="card-text">{note.tag}</code>
      </div>
    </div>
  );
}

export default NotesItem;
