const express = require('express');
const { createTour, getTour, getTours,  deleteTour, updateTour } = require('../controllers/tours.controller');



const tourRouter = express.Router();


tourRouter.post('/', createTour);
tourRouter.get('/:id', getTour);
tourRouter.get('/', getTours);
tourRouter.delete('/:id', deleteTour);
tourRouter.patch('/:id', updateTour);

module.exports = tourRouter;

