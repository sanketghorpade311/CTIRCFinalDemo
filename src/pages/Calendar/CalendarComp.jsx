import React, { useEffect, useState } from "react";
import "./Calendar.css";
import TodoComponent from "./TodoComponent";
import Calendar from "react-calendar";
import Badge from "react-bootstrap/Badge";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase-config";

const CalendarComp = (props) => {
  const trainingsCollectionRef = collection(db, "trainings");
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("Default");
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [meetings, setMeetings] = useState([]);
  const [show, setShow] = useState(false);
  const [newTaskDetails, setNewTaskDetails] = useState({
    venue: "",
    faculty: "",
    group: "",
    topic: "",
    time: "12:00",
  });

  const handleClose = () => {
    setNewTaskDetails({
      venue: "",
      faculty: "",
      group: "",
      topic: "",
      time: "12:00",
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const formatDate = (date) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  function setval() {
    setName(formatDate(date));
  }

  function tileContent({ date }) {
    const currentDate = formatDate(date);
    const meetingsForDate = meetings.filter(
      (meeting) => meeting.Date === currentDate
    );

    if (meetingsForDate.length > 0) {
      return (
        <Badge bg="danger" className="calendar-badge" pill={true}>
          {meetingsForDate.length}
        </Badge>
      );
    }
    return null;
  }

  const onChange = (date) => {
    setDate(date);
  };

  // For Fetching the Trainings
  const handleFetchData = async () => {
    const data = await getDocs(trainingsCollectionRef);
    setMeetings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // For Saving the Training
  const handleSave = async () => {
    handleClose();
    try {
      const newTask = {
        Date: formatDate(date),
        Time: newTaskDetails.time,
        HallNo: newTaskDetails.venue,
        GroupNo: newTaskDetails.group,
        Faculty: newTaskDetails.faculty,
        Topic: newTaskDetails.topic,
      };

      setMeetings([...meetings, newTask]);
      await addDoc(trainingsCollectionRef, newTask);

      setNewTaskDetails({
        venue: "",
        faculty: "",
        group: "",
        topic: "",
        time: "12:00",
      });
    } catch (error) {
      console.log(error);
      alert("An Error Occured");
    }
  };

  // For Editing the Training
  const handleEdit = async () => {
    handleClose();

    const modifiedArray = meetings.map((item) => {
      if (item.id === editingId) {
        const newDetails = {
          ...item,
          Date: formatDate(date),
          Time: newTaskDetails.time,
          HallNo: newTaskDetails.venue,
          GroupNo: newTaskDetails.group,
          Faculty: newTaskDetails.faculty,
          Topic: newTaskDetails.topic,
        };
        return newDetails;
      }
      return item;
    });
    setMeetings(modifiedArray);

    try {
      const trainingDoc = doc(db, "trainings", editingId);
      const newFields = {
        Date: formatDate(date),
        Time: newTaskDetails.time,
        HallNo: newTaskDetails.venue,
        GroupNo: newTaskDetails.group,
        Faculty: newTaskDetails.faculty,
        Topic: newTaskDetails.topic,
      };
      await updateDoc(trainingDoc, newFields);
      setEditing(false);
    } catch (error) {
      alert("An Error Occured");
      console.log(error);
    }
  };

  // For Deleting the Training
  const handleDelete = async (id) => {
    const filteredArray = meetings.filter((item) => item.id !== id);
    setMeetings(filteredArray);

    try {
      const trainingDoc = doc(db, "trainings", id);
      await deleteDoc(trainingDoc);
    } catch (error) {
      alert("An Error Occured");
      console.log(error);
    }
  };

  useEffect(() => {
    setName(formatDate(date));
    handleFetchData();
    // eslint-disable-next-line
  }, [date]);

  useEffect(() => {
    const fetchData = async () => {
      await handleFetchData();
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div id="calendar-container-main">
      <div id="calendar-component">
        <span className="bold">
          <h3>Selected Date : {`${name}`}</h3>
        </span>
        <div className="calendar-container">
          <Calendar
            onChange={onChange}
            onClickDay={setval}
            tileContent={tileContent}
          />
        </div>
      </div>
      <div id="todo-component">
        <TodoComponent
          date={formatDate(date)}
          meetings={meetings}
          setMeetings={setMeetings}
          newTaskDetails={newTaskDetails}
          setNewTaskDetails={setNewTaskDetails}
          handleShow={handleShow}
          handleClose={handleClose}
          handleSave={handleSave}
          show={show}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          editing={editing}
          setEditing={setEditing}
          setEditingId={setEditingId}
        ></TodoComponent>
      </div>
    </div>
  );
};

export default CalendarComp;
