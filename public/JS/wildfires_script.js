document.addEventListener('DOMContentLoaded', async () => {
    try {
      
        // Fetch the data from the backend
        console.log("Fetching Data...");
        const url = 'http://localhost:3000/events';
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
        document.getElementById('title').textContent = data.event1.title;
        //document.getElementById('desc1').innerHTML = data.nasa1.mediagroup;

        // Create a temporary DOM element to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data.event1.mediagroup;

        // Select the desired paragraphs
        const paragraphs = tempDiv.getElementsByTagName('p');
        let selectedParagraphs = '';

        // Select the 3rd, 4th, and 5th paragraphs (indices 2, 3, 4)
        for (let i = 2; i <= 4 && i < paragraphs.length; i++) {
            selectedParagraphs += `${paragraphs[i].outerHTML}</br>`; // Include the <p> tags
              //document.getElementById('desc1').innerHTML = selectedParagraphs;
            }

    // Display the selected paragraphs in the div
    document.getElementById('desc1').innerHTML = selectedParagraphs;

    // Set the video source
    const videoSource1 = document.getElementById('video1');
    videoSource1.src = data.event1.video1; // Assuming this is the video URL
    videoSource1.parentElement.load(); // Load the new video source

    document.getElementById('video1_text').textContent = data.event1.video1_text;

     // Set the video source
     const videoSource2 = document.getElementById('video2');
    videoSource2.src = data.event1.video2; // Assuming this is the video URL
    videoSource2.parentElement.load(); // Load the new video source

    document.getElementById('video2_text').textContent = data.event1.video2_text;



      } catch (error) {
        console.error('Error fetching NASA data:', error);
        document.getElementById('content').textContent = 'Error fetching data.';
    }
});