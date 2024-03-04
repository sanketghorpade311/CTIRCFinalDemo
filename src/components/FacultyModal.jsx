import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function FacultyModal(props) {
  const {
    show,
    handleClose,
    handleShow,
    title,
    setTitle,
    facultyDetails,
    setFacultyDetails,
    handleSave,
    editing,
    handleEditing,
    faculty
  } = props;

  const handleChange = (e) => {
    setFacultyDetails({ ...facultyDetails, [e.target.name]: e.target.value });
  };
  return (
    <div className="d-flex justify-content-between">
      <Button
        variant="warning"
        onClick={() => {
          setTitle("Add New Faculty Details");
          handleShow();
        }}
      >
        Add Entry
      </Button>
      <Button variant="warning"> Total Faculties : {faculty.length} </Button>

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
            <Form.Group className="mb-3" controlId="SerialNumberEntryFaculty">
              <Form.Label>Sr No.</Form.Label>
              <Form.Control
                name="serial"
                value={facultyDetails.serial}
                onChange={handleChange}
                type="number"
                placeholder="Enter Serial number"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={facultyDetails.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter Name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm">
              <Form.Label>Expertise</Form.Label>
              <Form.Control
                name="expertise"
                value={facultyDetails.expertise}
                onChange={handleChange}
                type="text"
                placeholder="Expertise of Faculty"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Affiliation</Form.Label>
              <Form.Control
                name="affiliation"
                value={facultyDetails.affiliation}
                onChange={handleChange}
                type="text"
                placeholder="Wether Faculty is Associated with MCGM or NON-MCGM"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Vendor Code</Form.Label>
              <Form.Control
                name="vendorcode"
                value={facultyDetails.vendorcode}
                onChange={handleChange}
                type="number"
                placeholder="Enter Vendor Code"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={facultyDetails.address}
                onChange={handleChange}
                type="text"
                placeholder="Enter Address"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                name="contact"
                value={facultyDetails.contact}
                onChange={handleChange}
                type="number"
                placeholder="Enter Contact Number"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                value={facultyDetails.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter Email Address"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            onClick={editing ? handleEditing : handleSave}
            variant="primary"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FacultyModal;
