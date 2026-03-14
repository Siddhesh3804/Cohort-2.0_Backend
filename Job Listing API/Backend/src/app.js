const express = require("express");
const cors = require("cors");   
const jobModel = require("./models/jobs.model");

const app = express();

app.use(cors());               
app.use(express.json());

app.post("/api/jobs", async (req, res) => {
    const { company, role, jobType, salary, location, posted } = req.body;

    const job = await jobModel.create({
        company, role, jobType, salary, location, posted
    });

    res.status(201).json({
        message: "Job Post Added Successfully",
        job
    });
});

app.get("/api/jobs", async (req, res) => {
    const jobs = await jobModel.find();

    res.status(200).json({
        message: "Job Post Fetched Successfully",
        jobs
    });
});

app.delete("/api/jobs/:id", async (req, res) => {
    const id = req.params.id;
    await jobModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "Job Post Deleted Successfully"
    });
});

app.put("/api/jobs/:id", async (req, res) => {
    const jobId = req.params.id;

    const updatedJob = await jobModel.findByIdAndUpdate(
        jobId,
        req.body,
        { new: true }
    );

    res.status(200).json({
        message: "Job Post Updated Successfully",
        job: updatedJob
    });
});
module.exports = app;