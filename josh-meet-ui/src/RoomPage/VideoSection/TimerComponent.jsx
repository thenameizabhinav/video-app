import React, { useState, useEffect, useRef } from "react";

const TimerComponent = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    start();
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const start = () => {
    if (!running) {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(currentTime - startTime);
      }, 10);
      setRunning(true);
    }
  };

  const formatTime = () => {
    let totalMilliseconds = elapsedTime;
    let seconds = Math.floor((totalMilliseconds / 1000) % 60);
    let minutes = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
    let hours = Math.floor((totalMilliseconds / (1000 * 60 * 60)) % 24);

    // Add leading zeros if necessary
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;

    return hours + ":" + minutes + ":" + seconds;
  };

  return (
    <div className="video_button_container" style={{ color: "white" }}>
      <p>{formatTime()}</p>
    </div>
  );
};

export default TimerComponent;
