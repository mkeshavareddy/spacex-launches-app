// app/components/CountdownTimer.js
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

const CountdownTimer = ({ targetDate }) => {
  const [remainingTime, setRemainingTime] = useState(
    targetDate - new Date().getTime()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(targetDate - new Date().getTime());
    }, 1000); // update every second

    return () => clearInterval(timer);
  }, [targetDate]);

  if (remainingTime <= 0) {
    return <Text style={styles.expired}>Launched!</Text>;
  }

  const seconds = Math.floor(remainingTime / 1000) % 60;
  const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
  const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
  const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

  return (
    <Text style={styles.timer}>
      {days}d {hours}h {minutes}m {seconds}s
    </Text>
  );
};

export default CountdownTimer;

const styles = StyleSheet.create({
  timer: { fontSize: 16, fontWeight: 'bold', color: 'green' },
  expired: { fontSize: 16, fontWeight: 'bold', color: 'red' },
});
