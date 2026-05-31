/**
 * Check if a requested time falls within a booked time slot
 * @param {string} requestedTime - "HH:MM"
 * @param {string} startTime - "HH:MM"
 * @param {string} endTime - "HH:MM"
 * @returns {boolean}
 */
const isTimeOverlapping = (requestedTime, startTime, endTime) => {
  const toMinutes = (time) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  const requested = toMinutes(requestedTime);
  const start = toMinutes(startTime);
  const end = toMinutes(endTime);

  return requested >= start && requested < end;
};

/**
 * Recommendation scoring: rank rooms by best capacity fit
 * Prefers rooms with the smallest capacity that still fits the group
 * @param {Array} rooms - available rooms
 * @param {number} requiredCapacity
 * @returns {Array} sorted rooms
 */
const rankByBestFit = (rooms, requiredCapacity) => {
  return rooms.sort((a, b) => {
    const diffA = a.capacity - requiredCapacity;
    const diffB = b.capacity - requiredCapacity;
    return diffA - diffB;
  });
};

module.exports = { isTimeOverlapping, rankByBestFit };
