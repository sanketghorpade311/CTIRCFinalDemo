import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const GroupsAddNewModal = (props) => {
  const { show, handleClose, handleShow, title, setTitle, group, setGroup, handleSubmit, editing, handleEditing, groupsArray } = props;

  const handleChange = (e) => {
    setGroup({...group, [e.target.name] : e.target.value})
  }

  return (
    <div className="d-flex justify-content-between">
      <Button variant="warning" onClick={() => {
        handleShow();
        setTitle("Add New Group Details");
        }}>
        Add Entry
      </Button>
      <Button variant="warning">
        Total Groups : {groupsArray.length}
      </Button>

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-1" controlId="SerialNumberEntryFaculty">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Group Name"
                name = "name"
                value={group.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name = "detail"
                value={group.detail}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={editing ? handleEditing : handleSubmit }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default GroupsAddNewModal;
