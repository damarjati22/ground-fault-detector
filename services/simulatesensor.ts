export const getRandomSensorData = () => {
  return {
    voltage: Math.random() * 220,
    current: Math.random() * 10,
  };
};
