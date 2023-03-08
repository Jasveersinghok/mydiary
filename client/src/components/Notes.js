import React, { useContext, useState } from "react";
import NotesContext from "../context/NotesContext";
import NotesItem from "./NotesItem";
function Notes(props) {
  const { showAlert } = props;
  const context = useContext(NotesContext);
  const { editNote, notes } = context;

  const [newState, setNewState] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const handleUpClick = (e) => {
    e.preventDefault();
    showAlert("note edited successfully", "success");
    editNote(
      newState.eid,
      newState.etitle,
      newState.edescription,
      newState.etag//biggset finding ever pass the value in order which is take by the called function is very important otherwise values may suffle do things in order it is matter in funciton espeacially
    );
  };
  const updateNotes = (cNote) => {
    setNewState({
      eid: cNote._id,
      etitle: cNote.title,
      edescription: cNote.description,
      etag: cNote.tag,//this comment is also applicable for setting the value by usestate hook
    });
  };
  const handleOnchange = (e) => {
    setNewState({ ...newState, [e.target.name]: e.target.value });
  };
  return (
    <>
      <button
        type="button "
        className="btn btn-primary  d-none	"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <div className="mb-3">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label  text-dark"
                    >
                      Note Title
                    </label>
                    <input
                      value={newState.etitle}
                      type="etitle"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      onChange={handleOnchange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor=" Note Description "
                      className="form-label  text-dark"
                    >
                      Note Description
                    </label>
                    <textarea
                      className="form-control"
                      id="edescription"
                      rows="3"
                      value={newState.edescription}
                      name="edescription"
                      onChange={handleOnchange}
                    ></textarea>
                  </div>
                  <label
                    htmlFor="exampleFormControlInput1 text-dark"
                    className="form-label  text-dark"
                  >
                    Note Tag
                  </label>
                  <input
                    value={newState.etag}
                    type="etag"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={handleOnchange}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={handleUpClick}
                className="btn btn-primary"
                data-bs-dismiss="modal"
                disabled={newState.etitle.length <= 3 || newState.edescription.length <= 5}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="display-flex">
        {notes.length === 0 && "No notes to display"}
        {notes.map((element) => {
         
          return (
            <NotesItem
              updateNotes={updateNotes}
              note={element}
              key={element._id}
            />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
