// DO YOUR MAGIC
const Car = require("./cars-model")

const router = require('express').Router()

const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require("./cars-middleware")

router.get('/', (req, res, next)=>{
    Car.getAll(req.query)
        .then(cars =>{
            res.status(200).json(cars)
        })
        .catch(error =>{
            res.status(500).json({message:""})
        })
});

router.get('/:id', checkCarId, (req, res) => {
    res.status(200).json(req.car)
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) =>{
    Car.create(req.body)
        .then(car =>{
            res.status(201).json(car);
        })
        .catch(error =>{
            next(error)
        })
})


module.exports = router