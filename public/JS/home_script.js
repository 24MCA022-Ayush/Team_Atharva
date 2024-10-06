// document.addEventListener("DOMContentLoaded", async function () {
  
//   const timelineDiv = document.getElementById("timeline");

//   try {
//     const response = await fetch("/api/timeline/disaster");

//     // Check if the response is okay
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();

//     console.log(data);
//     if(data!=null){
//         data.forEach((disaster) => {
//             const disasterItem = document.createElement("div");
//             disasterItem.className = "timeline-item";
//             disasterItem.innerHTML = `<h3>Year: ${disaster['Year']}</h3>
//             <p>Count of Disasters: ${disaster['Count Of Disasters']}</p>
//             <p>Affected: ${disaster['Affected']}</p>`;
//             timelineDiv.appendChild(disasterItem);
//           });
//     }
//   } catch (error) {
//     console.error("Error fetching NASA data:", error);
//   }

// });


const scrollContainer = document.querySelector(".scroll-container");

      let isDown = false;
      let startX;
      let scrollLeft;

      scrollContainer.addEventListener("mousedown", (e) => {
        isDown = true;
        scrollContainer.classList.add("active");
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
      });

      scrollContainer.addEventListener("mouseleave", () => {
        isDown = false;
        scrollContainer.classList.remove("active");
      });

      scrollContainer.addEventListener("mouseup", () => {
        isDown = false;
        scrollContainer.classList.remove("active");
      });

      scrollContainer.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeft - walk;
      });

      // ----------------------------------------------------------------
      
      const newsscrollContainer = document.querySelector(".news-scroll-container");

      let newisDown = false;
      let newstartX;
      let newscrollLeft;

      newsscrollContainer.addEventListener("mousedown", (e) => {
        newisDown = true;
        newsscrollContainer.classList.add("active");
        startX = e.pageX - newsscrollContainer.offsetLeft;
        scrollLeft = newsscrollContainer.scrollLeft;
      });

      newsscrollContainer.addEventListener("mouseleave", () => {
        newisDown = false;
        newsscrollContainer.classList.remove("active");
      });

      newsscrollContainer.addEventListener("mouseup", () => {
        newisDown = false;
        newsscrollContainer.classList.remove("active");
      });

      newsscrollContainer.addEventListener("mousemove", (e) => {
        if (!newisDown) return;
        e.preventDefault();
        const x = e.pageX - newsscrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        newsscrollContainer.scrollLeft = scrollLeft - walk;
      });

  
    //-------------------------------------------------

  // Wait for the DOM to be fully loaded
      // document.addEventListener('DOMContentLoaded', function () {
      //   // Get all cards in Component 1
      //   const cards = document.querySelectorAll('.card');
      //   const knowMoreLink = document.getElementById('knowMoreLink'); // Select the link by its ID
  
      //   // Loop through each card and add a click event listener
      //   cards.forEach(card => {
      //     card.addEventListener('click', function () {
      //       // Get the year and disaster info from the clicked card
      //       const Year = this.getAttribute('Year');
      //       const Affected = this.getAttribute('Affected');
      //       const Count_Of_Disasters = this.getAttribute('Count_Of_Disasters');

      //       knowMoreLink.href = `/year/${selectedYear}`;

      //       console.log(Year)
      //       console.log(Affected)
      //       console.log(Count_Of_Disasters)

      //       // Update Component 2 with the selected disaster information
      //       const dtcontainer = document.getElementById('disaster-info');
      //       dtcontainer.innerHTML = `In ${Year}, ${Affected} Major Natural Calamites Occurin the region of South East Asia, West africa
      //       and Eastern Region of Antartica Number of Disaster   ${Count_Of_Disasters}`;

      //     });

      //        // Update the "Know More" link with the selected year in the URL
      //        //knowMoreLink.href = `/year/${selectedYear}`;
      //   });
      // });


      document.addEventListener('DOMContentLoaded', function () {
        const cards = document.querySelectorAll('.card');
        const knowMoreLink = document.getElementById('knowMoreLink'); // Select the link by its ID
      
        // Loop through each card and add a click event listener
        cards.forEach(card => {
          card.addEventListener('click', function () {
            // Get the year and disaster info from the clicked card
            const Year = this.getAttribute('Year');
            const Affected = this.getAttribute('Affected');
            const Count_Of_Disasters = this.getAttribute('Count_Of_Disasters');
      
            console.log(Year);
            console.log(Affected);
            console.log(Count_Of_Disasters);
      
            // Update the "disaster-info" element with the selected disaster details
            const dtcontainer = document.getElementById('disaster-info');
            dtcontainer.innerHTML = `In ${Year}, ${Affected} people were affected, with ${Count_Of_Disasters} major natural calamities.`;
      
            // Update the "Know More" link with the selected year in the URL
            knowMoreLink.href = `/year/${Year}`;
          });

        });
        knowMoreLink.href = `/year/2000`;
      });
      
      

//fetching events data (home page events) from API
document.addEventListener('DOMContentLoaded', async () => {
  try {
    
      // Fetch the data from the backend
      console.log("Fetching Data...");
      const url = 'http://localhost:3000/home_events';
      const response = await fetch(url);
      console.log(url);

      
      // Check if the response is okay
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      
      // Parse the response as JSON
      const data = await response.json();
      console.log(data);

      // Display title and description
      document.getElementById('title1').textContent = data.nasa1.title;
      document.getElementById('desc1').textContent = data.nasa1.description;

      document.getElementById('title2').textContent = data.nasa2.title;
      document.getElementById('desc2').textContent = data.nasa2.description;
      
      document.getElementById('title3').textContent = data.nasa3.title;
      document.getElementById('desc3').textContent = data.nasa3.description;
      
      document.getElementById('title4').textContent = data.nasa4.title;
      document.getElementById('desc4').textContent = data.nasa4.description;
          
    } catch (error) {
      console.error('Error fetching NASA data:', error);
      document.getElementById('content').textContent = 'Error fetching data.';
  }
});