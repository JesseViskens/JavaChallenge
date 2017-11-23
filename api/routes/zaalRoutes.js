var express = require('express');
var router = express.Router();

var Zaal = require('../models/zaalModel');

//get all zalen
router.get('/', function (req, res, next) {
    Zaal.find().exec(function(err, zalen){
        if (err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        res.status(200).json({
            message: 'Gelukt!',
            obj: zalen
        });
    })
});

//get one zaal
router.get('/:id', function (req, res, next) {
    Zaal.findById(req.params.id, function(err, zaal){
        if (err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        res.status(200).json({
            message: 'Gelukt!',
            obj: zaal
        });
    })
});

//add zaal
router.post('/', function (req, res, next) {
    var zaal = new Zaal({
        naam: req.body.naam,
        beschrijving: req.body.beschrijving,
        oppervlakte: req.body.oppervlakte,
        foto: req.body.foto,
        aanvang: req.body.aanvang,
        sluiting: req.body.sluiting,
        capaciteit: req.body.capaciteit,
        zalen: [req.body.zalen],
        materialen: [req.body.materialen]
    });

    zaal.save(function (err, result) {
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Zaal is toegevoegd!',
            obj: result
        });
    });
});

//update zaal
router.patch('/:id', function (req, res, next) {
    Zaal.findById(req.params.id, function(err, zaal){
        if(err){
            return res.status(500).json({
                title: 'Er heeft zich een fout voorgedaan',
                error: err
            });
        }
        if(!zaal){
            return res.status(500).json({
                title: 'Zaal niet gevonden',
                error: {message: 'Zaal niet gevonden'}
            });
        }
        zaal.naam = req.body.naam;
        zaal.beschrijving = req.body.beschrijving;
        zaal.oppervlakte = req.body.oppervlakte;
        zaal.foto = req.body.foto;
        zaal.aanvang = req.body.aanvang;
        zaal.sluiting = req.body.sluiting;
        zaal.capaciteit = req.body.capaciteit;
        zaal.zalen = [req.body.zalen];
        zaal.materialen = [req.body.materialen];
        zaal.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'Er heeft zich een fout voorgedaan',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Zaal is aangepast!',
                obj: result
            });
        });
    });
});

//delete zaal
router.delete('/:id', function(req, res, next){
    Zaal.findById(req.params.id, function(err, zaal){
        if(err){
            return res.status(500).json({
                title: 'Er deed zich een fout voor',
                error: err
            });
        }
        if(!zaal){
            return res.status(500).json({
                title: 'Zaal niet gevonden',
                error: {message: 'Zaal niet gevonden'}
            });
        }
        zaal.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Zaal is verwijderd!',
                obj: result
            });
        });
    })
});

module.exports = router;