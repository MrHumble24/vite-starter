function formatDateFromTimestamp(timestamp: number, formatType = "full") {
  try {
    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Check if the created Date object is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid timestamp provided.");
      return null;
    }

    // Define the format strings for full, medium, and short versions
    const pad = (num: number) => num.toString().padStart(2, "0");
    const formats: { [key: string]: string } = {
      full: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds()
      )}`,
      medium: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )}`,
      short: `${date.getFullYear().toString().slice(-2)}-${pad(
        date.getMonth() + 1
      )}-${pad(date.getDate())}`,
    };

    // Determine the format based on the formatType argument
    return formats[formatType] || formats["full"];
  } catch (error) {
    console.error("An error occurred while formatting the date:", error);
    return null;
  }
}

export default formatDateFromTimestamp;
