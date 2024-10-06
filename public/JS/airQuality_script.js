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
        document.getElementById('title').textContent = data.event2.title;
        document.getElementById('desc1').textContent = data.event2.description;
        

        // Set the video source
        const videoSource1 = document.getElementById('video1');
        videoSource1.src = data.event2.video1; // Assuming this is the video URL
        videoSource1.parentElement.load(); // Load the new video source

        document.getElementById('video1_text').textContent = data.event2.video1_text;

        // Set the video source
        const videoSource2 = document.getElementById('video2');
        videoSource2.src = data.event2.video2; // Assuming this is the video URL
        videoSource2.parentElement.load(); // Load the new video source

        document.getElementById('video2_text').textContent = data.event2.video2_text;


      } catch (error) {
        console.error('Error fetching NASA data:', error);
        document.getElementById('content').textContent = 'Error fetching data.';
    }
});