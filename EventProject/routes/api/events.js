/**
 * Created by championswimmer on 15/06/17.
 */
const route = require('express').Router();
const Event = require('../../db/models').Event;
const authUtils = require('../../auth/utils');
const User = require('../../db/models').user;
const EventInvitee = require('../../db/models').EventInvitee;
const Invitee = require('../../db/models').Invitee;


route.get('/', (req, res) => {
	console.log(req.user);
    Event.findAll({
		attributes: ['id' , 'title' , 'startTime' , 'endTime' , 'venue' , 'hostId'] ,
	})
        .then((events) => {
            res.status(200).send(events)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send("Error retrieving events")
        })
});


route.get('/:id', (req, res) => {
	Event.findOne({
		where: { 
		id: req.params.id
		},	
		include:[{
			model:User , 
			as: 'host'
			attributes: ['username' , 'email']
		}]
	}]
          .then((event) => {
            if (!event) {
                return res.status(500).send("No such event found")
            }
            res.status(200).send(event);
        })
        .catch((err) => {
            res.status(500).send('Error finding event')
        })
});

route.get


route.post('/new', (req, res) => {
    //Add server-side validations if required here
    if (!req.body.title) {
        return res.status(403).send('Event cannot created without title')
    }
    // YYYY-MM-DD'T'HH:MM
    Event.create({
        title: req.body.title,
        venue: req.body.venue,
        imgUrl: req.body.imgUrl,
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime),
        message: req.body.message,
    }).then((event) => {
        res.status(200).send(event)
    }).catch((err) => {
        res.status(500).send("There was an error creating event")
    })
});

module.exports = route;