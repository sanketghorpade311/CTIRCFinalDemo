import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Groups.css";
import GroupsAddNewModal from "../../components/GroupsAddNewModal";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase-config";

const Groups = () => {
  const groupCollectionRef = collection(db, "groups");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [title, setTitle] = useState("Add New Group Details");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [groupsArray, setGroupsArray] = useState([]);
  const [allGroupsArray, setAllGroupsArray] = useState([]);
  const [searchButtonText, setSearchButtonText] = useState("Search");
  const [searching, setSearching] = useState(true);
  const [group, setGroup] = useState({
    name: "",
    detail: "",
  });
  const handleClose = () => {
    setGroup({ name: "", detail: "" });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // Pagination System Logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const data = groupsArray;
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

  // For handling the Deleting Modal
  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleDeleteShow = () => setShowDeleteModal(true);
  const handleDeleting = () => {
    handleDeleteClose();
    handleDelete(editingId);
  };

  // For Fetching the Groups
  const handleFetchData = async () => {
    try {
      const data = await getDocs(groupCollectionRef);
      setGroupsArray(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      alert("An Error Occured");
      console.log(error);
    }
  };

  // For Creating a new group
  const handleSubmit = async () => {
    try {
      const newGroup = {
        shortName: group.name,
        details: group.detail,
      };
      setGroupsArray([...groupsArray, newGroup]);
      setGroup({
        name: "",
        detail: "",
      });
      handleClose();
      await addDoc(groupCollectionRef, newGroup);
    } catch (error) {
      alert("An Error Occured");
      console.log(error);
    }
  };

  // For Editing a group
  const handleEditing = async () => {
    try {
      handleClose();
      const modifiedArray = groupsArray.map((item) => {
        if (item.id === editingId) {
          const newDetails = {
            ...item,
            shortName: group.name,
            details: group.detail,
          };
          return newDetails;
        }
        return item;
      });
      setGroupsArray(modifiedArray);

      const groupDoc = doc(db, "groups", editingId);
      const newFields = { shortName: group.name, details: group.detail };
      await updateDoc(groupDoc, newFields);

      setGroup({
        name: "",
        detail: "",
      });
      setEditing(false);
    } catch (error) {
      alert("An Error Occured");
      console.log(error);
    }
  };

  // For Deleting a group
  const handleDelete = async (id) => {
    try {
      const groupDoc = doc(db, "groups", id);
      await deleteDoc(groupDoc);

      const filteredArray = groupsArray.filter((group) => group.id !== id);
      setGroupsArray(filteredArray);
    } catch (error) {
      alert("An Error Occured");
      console.log(error);
    }
  };

  // For Searching a group
  const handleSearch = async () => {
    if(searchText.length > 0) {
      setSearchText("");
      setSearchButtonText("Back");
      setAllGroupsArray(groupsArray);
      const searchResults = groupsArray.filter(
        (group) => group.shortName === searchText || group.details === searchText
        );
        setGroupsArray(searchResults);
      setSearching(false);
    }
  };

  // For Going back to all Entries
  const handleBack = async () => {
    setSearchButtonText("Search");
    setGroupsArray(allGroupsArray);
    setSearching(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleFetchData();
    };
    fetchData();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="group-container">
      <div id="group-search" className="bg-primary">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <h5 className="text-white">Search group</h5>
            <div className="d-flex align-items-center">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Search by Name or Details"
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
        <GroupsAddNewModal
          title={title}
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          setTitle={setTitle}
          group={group}
          setGroup={setGroup}
          handleSubmit={handleSubmit}
          editing={editing}
          handleEditing={handleEditing}
          groupsArray={groupsArray}
        ></GroupsAddNewModal>
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
      <div id="group-container">
        <table id="group-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Details</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((group) => (
              <tr key={group.id}>
                <td style={{ width: "10vw" }}>{group.shortName}</td>
                <td style={{ width: "70%" }}>{group.details}</td>

                <td>
                  <Button
                    style={{ width: "5vw" }}
                    variant="success"
                    onClick={() => {
                      setTitle("Edit Group Details");
                      setEditing(true);
                      setEditingId(group.id);
                      setGroup({
                        name: group.shortName,
                        detail: group.details,
                      });
                      handleShow();
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    style={{ width: "5vw" }}
                    variant="danger"
                    onClick={() => {
                      handleDeleteShow();
                      setEditingId(group.id);
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

export default Groups;
