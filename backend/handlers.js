"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//  Use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");


const getFlights = (req, res) => {
  let flightArray = Object.keys(flights);
  if (flightArray.length > 0) {
    res.status(200).json({
      status: 200,
      data: flightArray,
    })
  } else {
    res.status(404).json({
      status: 404,
      data: "Flights not found.",
    })
  }
}

const getFlight = (req, res) => {
  let flightId = req.params.id;
  let selectedFlight = flights[flightId];

  if (selectedFlight) {
    res.status(200).json({
      status: 200,
      data: selectedFlight,
    })
  } else {
    res.status(404).json({
      status: 404,
      message: "Flight not found.",
    })
  }
};


const addReservations = (req, res) => {
  let newReservation = {
    id: uuidv4(),
    flight: req.body.flight,
    seat: req.body.seat,
    givenName: req.body.givenName,
    surname: req.body.surname,
    email: req.body.email,
  }
  reservations.push(newReservation);
  
  res.status(201).json({
    status: 201,
    data: newReservation,
  })
};


const getReservations = (req, res) => {
  if (reservations.length > 0) {
    res.status(200).json({
      status: 200,
      data: reservations,
    })
  } else {
    res.status(404).json({
      status: 404,
      data: "Reservations not found.",
    })
  }
}


const getSingleReservation = (req, res) => {
  let reservationId = req.params.id;
  let selectedReservation = reservations.filter((reservation) => reservationId === reservation.id);

  if (selectedReservation.length > 0 ) {
    res.status(200).json({
      status: 200,
      data: selectedReservation,
    })
  } else {
    res.status(404).json({
      status: 404,
      data: "Reservation not found.",
    })
  }
};


const deleteReservation = (req, res) => {
  let reservationId = req.params.id;
  let selectedReservation = reservations.filter((reservation) => reservationId === reservation.id);

  if (selectedReservation.length > 0) {
    res.status(200).json({
      status: 200,
      message: "Reservation has been deleted."
    })
  } else {
    res.status(400).json({
      status: 400,
      message: "Reservation is not in database.",
    })
  }
};

const updateReservation = (req, res) => {
  let reservationId = req.params.id;
  let selectedReservation = reservations.filter((reservation) => reservationId === reservation.id);

  selectedReservation = {
    id: uuidv4(),
    flight: req.body.flight,
    seat: req.body.seat,
    givenName: req.body.givenName,
    surname: req.body.surname,
    email: req.body.email,
  }

  res.status(200).json({
    status: 200,
    message: "Reservation has been updated.",
  })
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
