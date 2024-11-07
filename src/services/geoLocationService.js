import axios from "axios";

export const getGeoLocation = async () => {
  const token = "be42d3b08bce45";
  try {
    const response = await axios.get(`https://ipinfo.io/json?token=${token}`);
    const { country } = response.data;
    return country;
  } catch (error) {
    console.error("Error fetching geolocation", error);
    throw error;
  }
};
