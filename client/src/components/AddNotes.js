import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotesContext from "../context/NotesContext";
import Notes from "./Notes";
function AddNotes(props) {
  const history = useNavigate();
  const { showAlert } = props;
  const context = useContext(NotesContext);
  const { addNote, getNotes } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      history("/login");
    }
  }, []);

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleOnchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleUpClick = (e) => {
    e.preventDefault();
    addNote(note);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    showAlert("Note is added successfully ", "success");
  };

  document.body.style.backgroundColor = "black";
  document.body.style.color = "white";
  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">Add your notes here</h1>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Note Tag
          </label>
          <input
            type="email"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={handleOnchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Note Title
          </label>
          <input
            type="email"
            className="form-control"
            id="title"
            value={note.title}
            name="title"
            onChange={handleOnchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor=" Note Description" className="form-label">
            Note Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            name="description"
            value={note.description}
            onChange={handleOnchange}
          ></textarea>
          <button disabled={note.title.length <= 3 || note.description.length <= 5} className="btn btn-primary my-3" onClick={handleUpClick}>
            Add Note
          </button>
          <h1 className="text-center my-3">Your Notes</h1>
          <Notes showAlert={showAlert} />
        </div>
      </div>
    </>
  );
}
export default AddNotes;
