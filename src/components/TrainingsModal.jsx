import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function TrainingsModal(props) {
  const {
    show,
    handleSave,
    handleClose,
    title,
    newTaskDetails,
    setNewTaskDetails,
    editing,
    handleEdit,
  } = props;

  const handleChange = (e) => {
    setNewTaskDetails({ ...newTaskDetails, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        {/* Header */}
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        {/* Body */}
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Form.ControlInput1">
              <Form.Label>Hall</Form.Label>
              <Form.Control
                type="text"
                name="venue"
                placeholder="Enter the Hall Number"
                value={newTaskDetails.venue}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Form.ControlInput2">
              <Form.Label>Faculty</Form.Label>
              <Form.Control
                type="text"
                name="faculty"
                placeholder="Enter the Faculty Name"
                value={newTaskDetails.faculty}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Form.ControlInput3">
              <Form.Label>Group</Form.Label>
              <Form.Control
                type="text"
                name="group"
                placeholder="Enter the Group name"
                value={newTaskDetails.group}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Form.ControlInput4">
              <Form.Label>Topic</Form.Label>
              <Form.Control
                type="text"
                name="topic"
                placeholder="Enter the Topic Title"
                value={newTaskDetails.topic}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Form.ControlInput5">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                placeholder="Enter the Time"
                value={newTaskDetails.time}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        {/* Footer */}
        <Modal.Footer>
          <Button variant="primary" onClick={editing ? handleEdit : handleSave}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TrainingsModal;
