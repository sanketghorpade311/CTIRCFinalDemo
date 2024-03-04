import "./Home.css";
import { trainingData } from "../../Data/TrainingData";
import { useState, useEffect } from "react";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase-config";

const Home = () => {
  const trainingsCollectionRef = collection(db, "trainings");
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  
  const current = new Date(); 
  const date = current.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  // For Fetching the Trainings
  const handleFetchData = async () => {
    const data = await getDocs(trainingsCollectionRef);
    setMeetings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // For Filtering today's Meetings
  const filterMeetings = async () => {
    const todayMeetings = meetings.filter((meeting) => meeting.Date === date);
    setFilteredMeetings(todayMeetings);
  }

  useEffect(() => {
    filterMeetings();
  }, [meetings]); 
  
  useEffect(() => {
    const fetchData = async () => {
      await handleFetchData();
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="home-container-main">
      <div className="home-date">
        <h1>Date : {date}</h1>
        <h1>Trainings Scheduled Today : {filteredMeetings.length}</h1>
      </div>

      <div className="tasks-today">
        {filteredMeetings.length === 0 ? (
          <div className="fs-4">No Trainings Scheduled For Today</div>
        ) : (
          filteredMeetings.map((training, index) => (
            <div key={index} className="information-training Card">
              <div className="card-content">
                <h5>Date : {training.Date}</h5>
                <h5>Time : {training.Time}</h5>
                <h5>Faculty : {training.Faculty}</h5>
                <h5>Group No : {training.GroupNo}</h5>
                <h5>Hall No: {training.HallNo}</h5>
              </div>

              <div className="card-content">
                <h5>Topic : {training.Topic}</h5>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
