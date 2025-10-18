// saved-jobs.js

document.addEventListener("DOMContentLoaded", () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const container = document.getElementById("savedJobsContainer");
  
    if (savedJobs.length === 0) {
      container.innerHTML = "<p>No saved jobs.</p>";
      return;
    }
  
    savedJobs.forEach(job => {
      const jobCard = document.createElement("div");
      jobCard.className = "job-card";
      jobCard.innerHTML = `
        <h3>${job.title}</h3>
        <p>${job.company} - ${job.location}</p>
      `;
      container.appendChild(jobCard);
    });
  });
  