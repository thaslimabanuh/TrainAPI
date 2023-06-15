//App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllTrainsPage from './pages/AllTrainsPage';
import SingleTrainPage from './pages/SingleTrainPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AllTrainsPage} />
        <Route exact path="/trains/:trainId" component={SingleTrainPage} />
      </Switch>
    </Router>
  );
};

export default App;


import React, { useEffect, useState } from 'react';
import TrainItem from '../components/TrainItem';
import { getAllTrains } from '../api/trainApi';

const AllTrainsPage = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const data = await getAllTrains();
      setTrains(data);
    } catch (error) {
      console.error('Error fetching all trains:', error);
    }
  };

  return (
    <div>
      <h1>All Trains</h1>
      {trains.map((train) => (
        <TrainItem key={train.id} train={train} />
      ))}
    </div>
  );
};

export default AllTrainsPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TrainDetails from '../components/TrainDetails';
import { getTrainById } from '../api/trainApi';

const SingleTrainPage = () => {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    fetchTrain();
  }, []);

  const fetchTrain = async () => {
    try {
      const data = await getTrainById(trainId);
      setTrain(data);
    } catch (error) {
      console.error(`Error fetching train with ID ${trainId}:`, error);
    }
  };

  return (
    <div>
      {train ? <TrainDetails train={train} /> : <p>Loading train details...</p>}
    </div>
  );
};

export default SingleTrainPage;
// TrainItem.js
import React from 'react';
import { Link } from 'react-router-dom';

const TrainItem = ({ train }) => {
  return (
    <div>
      <h2>{train.name}</h2>
      <p>Departure: {train.departure}</p>
      <p>Arrival: {train.arrival}</p>
      <Link to={`/trains/${train.id}`}>View Details</Link>
    </div>
  );
};

export default TrainItem;
import React from 'react';

const TrainDetails = ({ train }) => {
  return (
    <div>
      <h2>{train.name}</h2>
      <p>Departure: {train.departure}</p>
      <p>Arrival: {train.arrival}</p>
      <p>Delays: {train.delays}</p>
      <p>Seat Availability: {train.seatAvailability}</p>
      <p>Coach Class: {train.coachClass}</p>
    </div>
  );
};

export default TrainDetails;

const API_BASE_URL = 'http://localhost:8000'; // Update with your backend API URL

export const getAllTrains = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/trains`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all trains:', error);
    throw error;
  }
};

export const getTrainById = async (trainId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trains/${trainId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching train with ID ${trainId}:`, error);
    throw error;
  }
};