// Sample jobs with additional properties for filters
const jobs = [
    { id: 1, title: "Frontend Developer", company: "TechSoft", location: "Remote", type: "Full-time", experience: "Mid" },
    { id: 2, title: "Backend Developer", company: "CodeBase", location: "Bangalore", type: "Full-time", experience: "Senior" },
    { id: 3, title: "Data Analyst", company: "DataCorp", location: "Hyderabad", type: "Part-time", experience: "Entry" }
  ];
  
  // Saved jobs (store IDs in localStorage)
  let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
  
  // Check login
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("Please login first!");
    window.location.href = "login.html";
  }
  
  // Show logged-in username
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("profileName").textContent = loggedInUser.username;
    updateSavedJobsCount();
    renderJobs();
  });
  
  // Render job cards based on filters and search
  function renderJobs(filteredJobs = null) {
    if (!filteredJobs) filteredJobs = jobs;
  
    // Apply filters (job type & experience)
    const fullTimeChecked = document.getElementById("fullTime").checked;
    const partTimeChecked = document.getElementById("partTime").checked;
    const expCheckedValues = Array.from(document.querySelectorAll(".expLevel:checked")).map(cb => cb.value);
  
    filteredJobs = filteredJobs.filter(job => {
      const typeMatch = (fullTimeChecked && job.type === "Full-time") || (partTimeChecked && job.type === "Part-time");
      const expMatch = expCheckedValues.includes(job.experience);
      return typeMatch && expMatch;
    });
  
    const jobList = document.getElementById("jobList");
    jobList.innerHTML = "";
  
    filteredJobs.forEach(job => {
      const isSaved = savedJobs.includes(job.id);
      const jobCard = document.createElement("div");
      jobCard.className = "job-card";
      jobCard.innerHTML = `
        <h3>${job.title}</h3>
        <p>${job.company} - ${job.location}</p>
        <p>Type: ${job.type} | Experience: ${job.experience}</p>
        <button onclick="viewJob(${job.id})">View Details</button>
        <button class="save-btn ${isSaved ? 'saved' : ''}" onclick="toggleSaveJob(${job.id}, this)">
          ${isSaved ? "Saved" : "Save Job"}
        </button>
      `;
      jobList.appendChild(jobCard);
    });
  }
  
  // Search function
  function searchJobs() {
    const keyword = document.getElementById("searchBox").value.toLowerCase();
    const filtered = jobs.filter(job => job.title.toLowerCase().includes(keyword));
    renderJobs(filtered);
  }
  
  // View job details (store in localStorage and go to details page)
  function viewJob(id) {
    localStorage.setItem("selectedJob", JSON.stringify(jobs.find(job => job.id === id)));
    window.location.href = "job-details.html";
  }
  
  // Toggle save/unsave job
  function toggleSaveJob(jobId, button) {
    const index = savedJobs.indexOf(jobId);
    if (index === -1) {
      savedJobs.push(jobId);
      button.textContent = "Saved";
      button.classList.add("saved");
    } else {
      savedJobs.splice(index, 1);
      button.textContent = "Save Job";
      button.classList.remove("saved");
    }
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    updateSavedJobsCount();
  }
  
  // Update saved jobs count display
  function updateSavedJobsCount() {
    document.getElementById("savedJobsCount").textContent = `Saved Jobs: ${savedJobs.length}`;
  }
  
  // Logout function
  function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully.");
    window.location.href = "login.html";
  }
  
  // Re-render jobs when filter checkboxes change
  document.querySelectorAll("#fullTime, #partTime, .expLevel").forEach(cb => {
    cb.addEventListener("change", () => {
      searchJobs(); // Re-apply search and filters
    });
  });
  