import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [jobs, setJobs] = useState([]);

  function fetchJobs() {
    axios.get("http://localhost:3000/api/jobs")
      .then((res) => {
        setJobs(res.data.jobs);
      });
  }
  useEffect(() => {
    fetchJobs();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { company, role, jobType, salary, location, posted } = e.target.elements;

    axios.post("http://localhost:3000/api/jobs", {
      company: company.value,
      role: role.value,
      jobType: jobType.value,
      salary: salary.value,
      location: location.value,
      posted: posted.value
    })
      .then(() => {
        fetchJobs();
        e.target.reset();
      });
  }

  function handleDeleteJob(jobId) {
    axios.delete("http://localhost:3000/api/jobs/" + jobId)
      .then(() => {
        fetchJobs();
      });
  }

  function handleUpdateRole(jobId) {
    const newRole = prompt("Enter New Job Role");

    axios.put("http://localhost:3000/api/jobs/" + jobId, {
      role: newRole
    })
      .then(() => {
        fetchJobs();
      });
  }

  return (
    <>
      <h1>Job Portal</h1>
      <form onSubmit={handleSubmit}>
        <input name="company" placeholder="Company" />
        <input name="role" placeholder="Role" />
        <input name="jobType" placeholder="Job Type" />
        <input name="salary" placeholder="Salary" />
        <input name="location" placeholder="Location" />
        <input name="posted" placeholder="Posted Time" />
        <button>Add Job</button>
      </form>

      <div className="jobs">
        {
          jobs.map(job => (
            <div key={job._id} className="job-card">

              <div className="job-header">
                <h2>{job.role}</h2>
              </div>

              <p><span>Company:</span> {job.company}</p>
              <div className="job-tags">
                <span className="tag">{job.jobType}</span>
              </div>

              <p><span>Salary:</span> {job.salary}</p>
              <p><span>Location:</span> {job.location}</p>
              <p><span>Posted:</span> {job.posted}</p>

              <div className="job-buttons">
                <button className="delete-btn" onClick={() => handleDeleteJob(job._id)}>
                  Delete
                </button>
                <button className="update-btn" onClick={() => handleUpdateRole(job._id)}>
                  Update Role
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default App;