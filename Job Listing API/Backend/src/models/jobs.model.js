const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    company : String,
    role : String,
    jobType : String,
    salary : String,
    location : String,
    posted : String
});

const jobModel =mongoose.model("jobs", jobSchema);

module.exports = jobModel;