const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/impresora');
const app = express();

//POST
app.post('/impresora', (req, res) => {

    let body = req.body
    let impresora = new Usuario({
        marca: body.marca,
        modelo: body.modelo,
        n_serie: body.n_serie,
        color: body.color,
        ip: body.ip,
        n_contador: body.n_contador,
        precio: body.precio
    });
    impresora.save((err, impresoraDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            impresora: impresoraDB
        });
    });
});

//GET
app.get('/impresora', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde)
    let limite = req.query.limite || 3;
    limite = Number(limite)

    Usuario.find()
        .skip(desde)
        .limit(limite)
        .exec((err, impresoras) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count((err, conteo) => {
                res.json({
                    ok: true,
                    impresoras,
                    numero: conteo
                });
            });
        })
});

//PUT
app.put('/impresora/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["modelo", "color", "ip", "precio"]);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, impresoraBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            impresora: impresoraBD
        });
    });
});

//DELETE
app.delete('/impresora/:id', (req, res) => {

    let id = req.params.id;


    Usuario.findByIdAndDelete(id, (err, impresoraBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!impresoraBD) {
            res.json({
                ok: false,
                err: {
                    message: "La impresora no a sido encontrada"
                }
            });
        } else {
            res.json({
                ok: true,
                usuario: impresoraBD
            });
        }
    });
});



module.exports = app;
