import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

function TimeTracker() {
  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [savedTimes, setSavedTimes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isRunning) {
      setTimerId(setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10));
    } else {
      clearInterval(timerId);
      setTimerId(null);
    }

    return () => clearInterval(timerId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleClear = () => {
    setSavedTimes([]);
    setTime(0);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };
  const handleSaveModal = (e) => {
    e.preventDefault();
    setSavedTimes([...savedTimes, { title, description, duration: time }]);
    setTitle('');
    setDescription('');
    setShowModal(false);
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="text-center mb-5" style={{ background: "linear-gradient(to right, #e96443, #904e95)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Time Tracker</h1>
      <div className="d-flex flex-column align-items-center">
        <h2 className="text-center">{formatTime(time)}</h2>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary me-3" onClick={handleStart} disabled={isRunning}>Start</button>
          <button className="btn btn-primary me-3" onClick={handlePause} disabled={!isRunning}>Pause</button>
          <button className="btn btn-primary me-3" onClick={() => setShowModal(true)}>Save</button>
          <button className="btn btn-secondary" onClick={handleClear}>Clear</button>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Save Time Duration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSaveModal}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
          </form>
        </Modal.Body>
      </Modal>

      {savedTimes.length > 0 &&
        <div className="mt-5">
          <h2 className="text-center mb-4">Tasks:</h2>
          <ul className="list-group">
            {savedTimes.map((savedTime, index) => (
              <li key={index} className="list-group-item">{savedTime.title} - {formatTime(savedTime.duration)}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  );


}

export default TimeTracker;