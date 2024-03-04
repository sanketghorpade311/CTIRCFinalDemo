import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Faculty.css";
import FacultyModal from "../../components/FacultyModal";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase-config";

const Faculty = () => {
  const facultyCollectionRef = collection(db, "faculty");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("Add New Faculty Details");
  const [faculty, setFaculty] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [allFaculty, setAllFaculty] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchButtonText, setSearchButtonText] = useState("Search");
  const [searching, setSearching] = useState(true);
  const [facultyDetails, setFacultyDetails] = useState({
    serial: "",
    name: "",
    expertise: "",
    affiliation: "",
    vendorcode: "",
    address: "",
    contact: "",
    email: "",
  });
  const handleClose = () => {
    setFacultyDetails({
      serial: "",
      name: "",
      expertise: "",
      affiliation: "",
      vendorcode: "",
      address: "",
      contact: "",
      email: "",
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // For handling the Deleting Modal
  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleDeleteShow = () => setShowDeleteModal(true);
  const handleDeleting = () => {
    handleDeleteClose();
    handleDelete(editingId);
  };

  // For Fetching the Faculties
  const handleFetchData = async () => {
    try {
      const data = await getDocs(facultyCollectionRef);
      setFaculty(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      alert("An Error Occured");
      console.log(error);
    }
  };

  // For Creating a Faculty
  const handleSave = async () => {
    try {
      const newFaculty = {
        serial: facultyDetails.serial,
        first_name: facultyDetails.name,
        vendorcode: facultyDetails.vendorcode,
        expertise: facultyDetails.expertise,
        contact: facultyDetails.contact,
        email: facultyDetails.email,
        affiliation: facultyDetails.affiliation,
        address: facultyDetails.address,
      };
      setFaculty([...faculty, newFaculty]);

      handleClose();
      await addDoc(facultyCollectionRef, newFaculty);
    } catch (error) {
      alert("An Error Occured");
      console.log(error);
    }
  };

  // For Editing a Faculty
  const handleEditClick = (id) => {
    setTitle("Edit Faculty Details");
    setEditing(true);
    setEditingId(id);
    handleShow();
  };

  const handleEditing = async () => {
    try {
      handleClose();
      const modifiedArray = faculty.map((item) => {
        if (item.id === editingId) {
          const newDetails = {
            ...item,
            serial: facultyDetails.serial,
            first_name: facultyDetails.name,
            vendorcode: facultyDetails.vendorcode,
            expertise: facultyDetails.expertise,
            contact: facultyDetails.contact,
            email: facultyDetails.email,
            affiliation: facultyDetails.affiliation,
            address: facultyDetails.address,
          };
          return newDetails;
        }
        return item;
      });
      setFaculty(modifiedArray);

      const facultyDoc = doc(db, "faculty", editingId);
      const newFields = {
        serial: facultyDetails.serial,
        first_name: facultyDetails.name,
        vendorcode: facultyDetails.vendorcode,
        expertise: facultyDetails.expertise,
        contact: facultyDetails.contact,
        email: facultyDetails.email,
        affiliation: facultyDetails.affiliation,
        address: facultyDetails.address,
      };
      await updateDoc(facultyDoc, newFields);
      setEditing(false);
    } catch (error) {
      alert("An Error Occured");
      console.log(error);
    }
  };

  // For Deleting a Faculty
  const handleDelete = async (id) => {
    try {
      const filteredArray = faculty.filter((group) => group.id !== id);
      setFaculty(filteredArray);

      const facultyDoc = doc(db, "faculty", id);
      await deleteDoc(facultyDoc);
    } catch (error) {
      alert("An Error Occured");
      console.log(error);
    }
  };

  // For Searching a group
  const handleSearch = async () => {
    if(searchText.length > 0) {
      setSearchText("");
      setSearchButtonText("Back")
      setAllFaculty(faculty);
      const searchResults = faculty.filter(
        (item) => item.first_name === searchText || item.vendorcode === searchText
      );
      setFaculty(searchResults);
      setSearching(false);
    }
  };

  // For Going back to all Entries
  const handleBack = async () => {
    setSearchButtonText("Search")
    setFaculty(allFaculty);
    setSearching(true);
  }

  // Handling pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const data = faculty;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handleNextClick = () => {
    if (totalPages !== currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevClick = () => {
    if (currentPage >= 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleFetchData();
    };
    fetchData();
    //eslint-disable-next-line
  }, []);

  return (
    <div id="parent-faculty-main">
      <div id="faculty-search">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <h5 className="text-white">Search using Name or Vendor Code</h5>
            <div className="d-flex align-items-center">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter Name or Vendor Code"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                variant="warning"
                size="lg"
                className="ms-1"
                onClick={searching ? handleSearch : handleBack}
              >
                {searchButtonText}
              </Button>
            </div>
          </Form.Group>
        </Form>
        <FacultyModal
          title={title}
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          setTitle={setTitle}
          facultyDetails={facultyDetails}
          setFacultyDetails={setFacultyDetails}
          handleSave={handleSave}
          editing={editing}
          handleEditing={handleEditing}
          faculty={faculty}
        ></FacultyModal>
        {/* Delete Modal Box */}
        <Modal show={showDeleteModal} onHide={handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => handleDeleting()}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div id="faculty-container">
        <table id="faculty-table">
          <thead>
            <tr>
              <th style={{ width: "70px" }}>Sr. No</th>
              <th>Name</th>
              <th>Expertise</th>
              <th>Affiliation</th>
              <th>Vendor Code</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((faculty, index) => (
              <tr key={faculty.id}>
                <td style={{ width: "70px" }}>{index + 1}</td>
                <td style={{ width: "200px" }}>{faculty.first_name}</td>
                <td>{faculty.expertise}</td>
                <td>{faculty.affiliation}</td>
                <td style={{ width: "70px" }}>{faculty.vendorcode}</td>
                <td style={{ width: "300px" }}>{faculty.address}</td>
                <td>{faculty.contact}</td>
                <td style={{ maxWidth: "300px", overflowX: "scroll" }}>
                  {faculty.email}
                </td>

                <td>
                  <Button
                    style={{ width: "100px" }}
                    variant="success"
                    onClick={() => {
                      setFacultyDetails({
                        serial: faculty.serial,
                        name: faculty.first_name,
                        expertise: faculty.expertise,
                        affiliation: faculty.affiliation,
                        vendorcode: faculty.vendorcode,
                        address: faculty.address,
                        contact: faculty.contact,
                        email: faculty.email,
                      });
                      handleEditClick(faculty.id);
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    style={{ width: "100px" }}
                    variant="danger"
                    onClick={() => {
                      handleDeleteShow();
                      setEditingId(faculty.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between w-full p-3">
          <Button
            disabled={currentPage === 1}
            variant="warning"
            size="md"
            className="ms-1"
            onClick={handlePrevClick}
          >
            {"<--"} Previous
          </Button>
          <Button
            disabled={totalPages === currentPage}
            variant="warning"
            size="md"
            className="ms-1"
            onClick={handleNextClick}
          >
            Next {"-->"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Faculty;
