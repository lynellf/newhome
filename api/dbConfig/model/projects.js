/*eslint no-undef: "error"*/
/*eslint-env node*/
/*eslint no-console: 0*/
const collection = require('mongoose'),
    Projects = new collection.Schema({
        title: {
            type: String,
            trim: true,
            required: true
        },
        post: {
            type: String,
            required: true
        },
        date: { type: Date, default: Date.now },
        body: {
            type: String,
            required: true
        },
        tags: {
            type: Array,
            required: false
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        },
        projectUrl: {
            type: String,
            required: false
        },
        gitHub: {
            type: String,
            required: false
        },
    });

const Project = collection.model('Projects', Projects);
module.exports = Project;