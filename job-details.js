// job-details.js

document.addEventListener("DOMContentLoaded", () => {
    const job = JSON.parse(localStorage.getItem("selectedJob"));
    const container = document.getElementById("jobDetailContainer");
  
    if (job) {
      container.innerHTML = `
        <h2>${job.title}</h2>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <button onclick="saveJob()">Save Job</button>
      `;
    }
  });
  
  function saveJob() {
    const job = JSON.parse(localStorage.getItem("selectedJob"));
    let saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    saved.push(job);
    localStorage.setItem("savedJobs", JSON.stringify(saved));
    alert("Job saved!");
  }
  