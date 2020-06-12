const mongoose = require('mongoose');
const shortid = require('shortid');
const { v4: uuidv4 } = require('uuid');

const PollSchema = new mongoose.Schema({
    id: {
        type: String,
        default: shortid.generate
    },
    question: {
        type: String,
    },
    options: [
        {
            option: {
                type: String,
                
            },
            votes: {
                type: Number,
                default: 0
            },
            uid: {
                type: String,
                default: uuidv4
            }
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = Poll = mongoose.model('poll', PollSchema);

