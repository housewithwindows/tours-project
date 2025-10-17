const express = require('express');
const { createTour, getTour, getTours,  deleteTour, updateTour } = require('../controllers/tours.controller');

const { protect } = require('../middleware/auth.middleware');

const tourRouter = express.Router();


tourRouter.post('/', protect, createTour);
tourRouter.get('/:id', getTour);
tourRouter.get('/', getTours);
tourRouter.delete('/:id', protect, deleteTour);
tourRouter.patch('/:id', protect, updateTour);

module.exports = tourRouter;

