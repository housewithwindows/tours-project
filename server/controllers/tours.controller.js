const Tour = require("../model/tours.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const getTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).json(tours);
});

const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return next(new AppError("Tour not found", 404));
  }
  res.status(200).json(tour);
});

const createTour = catchAsync(async (req, res, next) => {
  const { title, description, duration } = req.body;
  const newTour = await Tour.create({ title, description, duration });
  res.status(201).json(newTour);
});

const deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError("Tour not found", 404));
  }
  res.status(204).send();
});

const updateTour = catchAsync(async (req, res, next) => {
  const { title, description, duration } = req.body;
  const updatedTour = await Tour.findByIdAndUpdate(req.params.id,{ title, description, duration });
  if (!updatedTour) {
    return next(new AppError("Tour not found", 404));
  }
  res.status(200).json(updatedTour);
});

module.exports = { getTours, getTour, createTour, deleteTour, updateTour };
