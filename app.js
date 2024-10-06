const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { engine } = require("express-handlebars");
const axios = require("axios"); // To fetch data from the API
const fs = require('fs').promises;
const app = express();
const PORT = 3000;

const connectorDB = require("./Utils/db");

app.engine(
  "handlebars",
  engine({
    defaultLayout: false,
  })
);



app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/JS", express.static(path.join(__dirname, "public/JS")));
app.use("/video", express.static(path.join(__dirname, "public/video")));

const TimelineData = require("./Router/TimelineData_Router");
const AirQualityData = require("./Router/AirQuality_Router");
const EarthQuakeData = require("./Router/Earthquake_Router");
const GlobalWarming = require("./Router/GlobalWarming_Router");
const Wildfires = require("./Router/Wildfires_Router");
const { Console } = require("console");

app.use("/api/timeline", TimelineData);
app.use("/api/airquality", AirQualityData);
app.use("/api/earthquake", EarthQuakeData);
app.use("/api/globalwarming", GlobalWarming);
app.use("/api/wildfires", Wildfires);

//index page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/timeline/disaster"
    );
    const disasters = response.data;
    res.render("index", { disasters });
    
  } catch (error) {
    console.error("Error fetching data from API:", error);
    res.render("index", { disasters: [] });
  }
});



//home page events API
app.get("/home_events", async (req, res) => {
  try {
    // Fetch data from all endpoints concurrently
    const [response1, response2, response3, response4] = await Promise.all([
      axios.get("https://svs.gsfc.nasa.gov/api/12325"),
      axios.get("https://svs.gsfc.nasa.gov/api/3912"),
      axios.get("https://svs.gsfc.nasa.gov/api/40483"),
      axios.get("https://svs.gsfc.nasa.gov/api/2893"),
    ]);

    // Extract and format descriptions
    const formatDescription = (data) =>
      data.description.split(". ").slice(0, 2).join(". ") + ".";

    // Sending the combined data to the frontend
    res.json({
      nasa1: {
        title: response1.data.title,
        description: formatDescription(response1.data),
      },
      nasa2: {
        title: response2.data.title,
        description: formatDescription(response2.data),
      },
      nasa3: {
        title: response3.data.title,
        description: formatDescription(response3.data),
      },
      nasa4: {
        title: response4.data.title,
        description: formatDescription(response4.data),
      },
    });
    
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data from NASA API" });
  }
});

//Event page Fire Quality Event API

app.get('/events', async (req, res) => {
  try {
      // Fetch data from all endpoints concurrently
      const [response1,response2,response3,response4,response5] = await Promise.all([
          // Event1 [Response1]
          axios.get('https://svs.gsfc.nasa.gov/api/12325'),
          
          // Event2 [Response2,3]
          axios.get("https://svs.gsfc.nasa.gov/api/40483"),
          axios.get("https://svs.gsfc.nasa.gov/api/14368"),
          
          // Event3 [Response4]
          axios.get("https://svs.gsfc.nasa.gov/api/3912"),

          // Event4 [Response5]
          axios.get("https://svs.gsfc.nasa.gov/api/2893"),
      ]);

      // Extract and format descriptions
      //const formatDescription = (data) => data.description.split('. ').slice(0, 2).join('. ') + '.';


      // Sending the combined data to the frontend
      res.json({
          event1: {
              title: response1.data.title,
              description: response1.data.description,
              mediagroup: response1.data.media_groups[1].description,
              video1: response1.data.media_groups[3].items[3].instance.url,
              video1_text: response1.data.media_groups[3].items[3].instance.alt_text,
              video2: response1.data.media_groups[4].items[2].instance.url,
              video2_text: response1.data.media_groups[4].items[2].instance.alt_text,

          },
          event2: {
            title: response2.data.title,
            description: response2.data.description,
            video1: response3.data.media_groups[0].items[5].instance.url,
            video1_text: response3.data.media_groups[2].description,
            video2: response3.data.media_groups[4].items[3].instance.url,
            video2_text: response3.data.media_groups[4].items[3].instance.alt_text,

          },
          event3: {
            title: response4.data.title,
            description: response4.data.description,

            video1: response4.data.media_groups[1].items[11].instance.url,
            video1_text: response4.data.media_groups[1].items[11].instance.alt_text,
            
            video2: response4.data.media_groups[9].items[4].instance.url,
            video2_text: response4.data.media_groups[9].items[4].instance.alt_text,

            image1: response4.data.media_groups[4].items[0].instance.url,
            image1_text: response4.data.media_groups[4].items[0].instance.alt_text,

        },
        event4: {
          title: response5.data.title,
          description: response5.data.description,

          video1: response5.data.media_groups[1].items[6].instance.url,
          video1_text: response5.data.media_groups[1].items[6].instance.alt_text,
          
          image1: response5.data.media_groups[3].items[0].instance.url,
          image1_text: response5.data.media_groups[3].items[0].instance.alt_text,

          image2: response5.data.media_groups[4].items[0].instance.url,
          image2_text: response5.data.media_groups[4].items[0].instance.alt_text,

          x: response5.data,
      },
      });

      console.log(res);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Error fetching data from NASA API' });
  }
});

const Timeline = require("./Model/TimelineSchema");
app.get('/year/:selectedYear', async (req, res) => {
  const year = req.params.selectedYear;

  try {
    const yearAsNumber = parseInt(year, 10);

    const disasters = await Timeline.find({ "Start Year": yearAsNumber }).lean();

    
    const uniqueDisastersSet = new Set();
    disasters.forEach(disaster => {
      if (disaster["Disaster Type"]) {
        uniqueDisastersSet.add(disaster["Disaster Type"]);
      }
    });

    
    const uniqueDisasters = Array.from(uniqueDisastersSet);

    
    const uniqueDisasterListData = await fs.readFile('./public/JS/data.json', 'utf-8');
    const parsedData = JSON.parse(uniqueDisasterListData);
    JSON.parse(uniqueDisasterListData);
    
    const uniqueDisasterList = Array.isArray(parsedData.disasters) ? parsedData.disasters : [];

    
    const matchedDisasters = uniqueDisasters.map(disasterType => {
      
      const matchedDisaster = uniqueDisasterList.find(item => item.DisasterType === disasterType);
      return matchedDisaster ? {
        DisasterType: matchedDisaster.DisasterType,
        desc: matchedDisaster.desc,
        image: matchedDisaster.image,
        year : year
      } : null;
    }).filter(item => item !== null); 
    res.render('year', { year, uniqueDisasters: matchedDisasters });

  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: 'Error fetching disasters' });
  }
});

app.get("/yearDisaster", async (req, res) => {
    const disasterType = req.query.disasterType; // Get disasterType from query parameters
    const year = req.query.year; // Get year from query parameters
    const yearAsNumber = parseInt(year, 10);


    try {
        // Read and parse the JSON file
        const uniqueDisasterListData = await fs.readFile('./public/JS/newData.json', 'utf-8');
        const parsedData = JSON.parse(uniqueDisasterListData);

        // Ensure parsedData is an array
        if (!Array.isArray(parsedData)) {
            throw new Error("Parsed data is not an array");
        }

        // Find the disaster that matches the disasterType
        const disasterDetails = parsedData.find(item => item.DisasterType === disasterType);
        const disastersList = await Timeline.find({ "Disaster Type" : disasterType,"Start Year": yearAsNumber}).lean();
        //console.log(disastersList)

        res.render("yearDisaster", { disaster: disasterDetails,disastersList:disastersList });

    } catch (error) {
        console.error("Error reading JSON file:", error);
        res.status(500).json({ error: 'Error fetching disaster details' });
    }
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/news", (req, res) => {
  res.render("news");
});

app.get("/airQuality", async (req, res) => {
  res.render("events_Section/airQuality");
});

app.get("/earthquake", async (req, res) => {
  res.render("events_Section/earthquake");
});

app.get("/globalTemperature", async (req, res) => {
  res.render("events_Section/globalTemperature");
});

app.get("/wildfires", async (req, res) => {
  res.render("events_Section/wildfires");
});

app.get("/beforeEarth", (req, res) => {
  res.render("beforeEarth");
});

app.get("/afterEarth", (req, res) => {
  res.render("afterEarth");
});

app.get("/sun", (req, res) => {
  res.render("sun");
});

app.get("/year", (req, res) => {
  res.render("year");
});

app.get("/blacksummer", (req, res) => {
  res.render("interesting_news_Section/blackSummer");
});

app.get("/intersingfactearthquake", (req, res) => {
  res.render("interesting_news_Section/earthquake");
});

app.get("/flood", (req, res) => {
  res.render("interesting_news_Section/flood");
});

app.get("/hurricane", (req, res) => {
  res.render("interesting_news_Section/hurricane");
});

app.get("/cyclone", (req, res) => {
  res.render("interesting_news_Section/cyclone");
});

app.get("/frozenfury", (req, res) => {
  res.render("interesting_news_Section/FrozenFury");
});

app.get("/tsunami", (req, res) => {
  res.render("interesting_news_Section/tsunami");
});


app.get("/tyhoon", (req, res) => {
  res.render("interesting_news_Section/tyhoon");
});

app.get("/corona", (req, res) => {
  res.render("interesting_news_Section/corona");
});

app.get("/solution", (req, res) => {
  res.render("solution");
});

app.get("/california", (req, res) => {
  res.render("interesting_news_Section/california");
});


app.get("/interconnected", (req, res) => {
  res.render("interesting_news_Section/interconnected");
});

app.get("/afmap", (req, res) => {
  res.render("afmap");
});

app.get("/aqmap", (req, res) => {
  res.render("aqmap");
});

app.get("/volcano", (req, res) => {
  res.render("volcano");
});



connectorDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("failed to connect...");
  });
