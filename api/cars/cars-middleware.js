const Car = require("./cars-model")
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try{
    const car = await Car.getById(req.params.id)
    if(car){
      req.car = car
      next()
    }
    else{
      res.status(404).json({message: `car with id ${req.params.id} is not found`})
    }
  }
  catch(err){
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body
  if(!vin){
    res.status(400).json({message:"vin is missing"})
  }
  else if(!make){
    res.status(400).json({message:"make is missing"})
  }
  else if(!model){
    res.status(400).json({message:"model is missing"})
  }
  else if(!mileage){
    res.status(400).json({message:"mileage is missing"})
  }
  else{
    next();
  }
}

const checkVinNumberValid = async (req, res, next) => {
  try{
    const isValidVin = await vinValidator.validate(req.body.vin.trim())
    if(isValidVin){
      next()
    }
    else{
      res.status(400).json({message:`vin ${req.body.vin} is invalid`})
    }
  }
  catch(err){
    next(err)
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try{
    const car = await Car.getByVin(req.body.vin.trim())
    if(car){
      res.status(400).json({message: `vin ${req.body.vin} already exists`})
    }
    else{
      req.car = car
      next()
    }
  }
  catch(err){
    next(err)
  }
}

module.exports ={
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}