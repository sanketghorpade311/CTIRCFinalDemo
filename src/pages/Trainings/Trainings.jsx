import React, { useState, useEffect } from "react";
import "./Trainings.css";
import { trainingData } from "../../Data/TrainingData";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

export const Trainings = () => {
  const trainingsCollectionRef = collection(db, "trainings");
  const [currentPage, setCurrentPage] = useState(1);
  const [meetings, setMeetings] = useState([]);
  const [initial, setInitial] = useState(trainingData);
  const [searchText, setSearchText] = useState("");
  const [allMeetings, setAllMeetings] = useState([]);
  const [searchButtonText, setSearchButtonText] = useState("Search");
  const [searching, setSearching] = useState(true);

  // Handling Pagination
  const itemsPerPage = 10;
  const data = initial;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    data.length > 0 ? data.slice(indexOfFirstItem, indexOfLastItem) : [];
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

  // For Sorting the Trainings by Date
  const handleSorting = (array) => {
    array.sort((a, b) => {
      const dateA = new Date(a.Date.split("/").reverse().join("/"));
      const dateB = new Date(b.Date.split("/").reverse().join("/"));

      return dateB - dateA;
    });
    setMeetings(array);
  };

  // For Getting all the Data
  const handleFetchData = async () => {
    const data = await getDocs(trainingsCollectionRef);
    const m1 = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    handleSorting(m1);
  };

  // For Searching a group
  const handleSearch = async () => {
    if (searchText.length > 0) {
      setSearchText("");
      setSearchButtonText("Back");
      setAllMeetings(initial);
      const searchResults = initial.filter((item) => {
        return (
          item.Date === searchText ||
          item.Time === searchText ||
          item.HallNo === searchText ||
          item.GroupNo === searchText ||
          item.Faculty === searchText ||
          item.Topic === searchText
        );
      });
      setInitial(searchResults);
      setSearching(false);
    }
  };

  // For Going Back to all Entries
  const handleBack = async () => {
    setSearchButtonText("Search");
    setInitial(allMeetings);
    setSearching(true);
  };

  useEffect(() => {
    setInitial(meetings);
  }, [meetings]);

  useEffect(() => {
    const fetchData = async () => {
      await handleFetchData();
    };
    fetchData();
  }, []);

  return (
    <div className="home-container-main">
      <Form className="bg-primary main-header">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <h2 className="text-white">Search Within Previous trainings</h2>
          <div className="d-flex align-items-center">
            <Form.Control
              size="lg"
              type="text"
              placeholder="Enter Some Values"
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
          <div className="d-flex justify-content-betweeen">
            <Button variant="warning" className="mt-3 ms-3">
              Total Trainings : {initial.length}
            </Button>
          </div>
        </Form.Group>
      </Form>
      <div className="tasks-today">
        {currentItems.map((training) => (
          <div key={training.id} className="information-training Card">
            <div className="card-content">
              <h5>Date: {training.Date}</h5>
              <h5>Time: {training.Time}</h5>
              <h5>Faculty: {training.Faculty}</h5>
              <h5>Group No: {training.GroupNo}</h5>
              <h5>Hall No: {training.HallNo}</h5>
            </div>

            <div className="card-content">
              <h5>Topic: {training.Topic}</h5>
            </div>
          </div>
        ))}
      </div>

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
  );
};
