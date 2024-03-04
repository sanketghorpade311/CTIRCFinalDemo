import React, { useState } from "react";
import "./TodoComponent.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TrainingsModal from "../../components/TrainingsModal";

const TodoComponent = (props) => {
  const {
    date,
    meetings,
    newTaskDetails,
    setNewTaskDetails,
    handleShow,
    handleClose,
    handleSave,
    show,
    handleDelete,
    editing,
    setEditing,
    handleEdit,
    setEditingId,
    // setMeetings
  } = props;
  const [title, setTitle] = useState("Add New Training Details");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleDeleteShow = () => setShowDeleteModal(true);

  const handleDeleting = async (id) => {
    handleDeleteClose();
    handleDelete(id);
  };

  return (
    <div id="TodoComponent-Main">
      <div id="Add-New-Task">
        <div
          id="add-new-task-button"
          className="btn btn-primary"
          onClick={() => {
            setTitle("Add New Training Details");
            handleShow();
          }}
        >
          Add New Task
        </div>
        <TrainingsModal
          show={show}
          handleSave={handleSave}
          handleClose={handleClose}
          title={title}
          newTaskDetails={newTaskDetails}
          editing={editing}
          handleEdit={handleEdit}
          setNewTaskDetails={setNewTaskDetails}
        />
      </div>
      <div id="Task-List">
        <div className="component-display-tasks">
          {meetings.map((training) =>
            training.Date === date ? (
              <div key={training.id} className="tasks-todoComponents">
                <div id="card-content">
                  <div id="row-data-display">
                    <p>Hall : {training.HallNo}</p>
                    <p>{training.Time}</p>
                    <p> {training.Date}</p>
                  </div>
                  <div id="row-data-display">
                    <p>Group No:{training.GroupNo}</p>
                    <p>Faculty:{training.Faculty}</p>
                  </div>
                  <div id="row-data-display">
                    <p>Topic : {training.Topic}</p>
                  </div>
                  <div id="row-data-display">
                    <Button
                      variant="warning"
                      onClick={() => {
                        setTitle("Edit Training Details");
                        setEditing(true);
                        handleShow();
                        setEditingId(training.id);
                        setNewTaskDetails({
                          venue: training.HallNo,
                          faculty: training.Faculty,
                          group: training.GroupNo,
                          topic: training.Topic,
                          time: training.Time,
                        });
                      }}
                    >
                      Edit
                    </Button>
                    <Button variant="danger" onClick={handleDeleteShow}>
                      Delete
                    </Button>
                  </div>

                  {/* Delete Modal Box */}
                  <Modal show={showDeleteModal} onHide={handleDeleteClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to delete this?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleDeleteClose}>
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleting(training.id)}
                      >
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
