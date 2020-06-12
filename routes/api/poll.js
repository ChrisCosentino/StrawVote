const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Poll = require('../../models/Poll');


// @Route   GET api/poll/:id
// @desc    Get all profiles
// @access  Public
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let poll = await Poll.findOne({ id });

        if(!poll){ //poll with that id doesnt exist 
            return res.status(400).json({ errors: [{ msg: 'Poll doesnt exist'}] });
        }
        res.send(poll);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @Route   POST api/poll
// @desc    Create a poll and return the code  
// @access  Public
router.post('/', [
    check('question', 'question is required')
        .not()
        .isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        question,
        options
    } = req.body;

    try {
        const poll = new Poll({
            question,
            options
        })
    
        poll.save();
        
        res.send({ pollId: poll.id })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.put('/vote', [
    check('optionId', 'Please include an option ID')
        .not()
        .isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        optionId
    } = req.body;

    try {

        Poll.findOneAndUpdate({'options.uid': optionId},
            { 
                "$inc": {[`options.$.votes`]: 1}  
            },
            { 
                new: true
            },
            function(err, poll) {
                if(err){ //Error is found
                    return res.status(400).json({ error: 'Internal error' });
                }
                if(!poll){
                    return res.status(400).json({ error: 'Question not found' });
                }
                //No errors
                return res.send(poll)
            })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;