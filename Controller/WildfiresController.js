const axios = require("axios");

const getWildfiresData = async (req, res) => {
  try {
    const url = "https://svs.gsfc.nasa.gov/api/12325";

    // Fetch data from the NASA about Wildfires
    const response = await axios.get(url);

    if (response.status === 200 && response.data) {
      res.status(200).json({
        success: true,
        data: response.data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No data found",
      });
    }
  } catch (error) {
    console.error(
      "Error while fetching data from NASA API about Wildfires",
      error
    );
    res.status(500).json({
      success: false,
      message: "Failed to fetch data from NASA API about Wildfires ",
      error: error.message,
    });
  }
};

module.exports = getWildfiresData;
