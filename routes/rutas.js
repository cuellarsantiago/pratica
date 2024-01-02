const express = require("express");

const routerProductos = express.Router();

const joi = require("joi");

const libros = require("../datos/libros");


const productoShema = joi.object({
  id: joi.string().required().label("titulo"),
  nombre: joi.string().required().label("autor"),
});

routerProductos.get("/", (req, res, next) => {
  try {
    res.json(libros);
  } catch (err) {
    next(err);
  }
});

routerProductos.get("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const libro = libros.find((i) => i.id === id);
    if (!libro) {
      const error = new Error(`libro no encontrado `);
      error.status = 404;
      throw error;
    }
    res.json(libro);
  } catch (err) {
    next(err);
  }
});

routerProductos.post("/", (req, res, next) => {
  try {
    const { error, value } = productoShema.validate(req.body);
    if (!error) {
      const validateError = new Error("Error de validaccion");
      validateError.status = 404;
      validateError.details = error.details.map((detail) => detail.message);
      throw validateError;
    }
    const { titulo, autor } = value;

    const nuevoLibro = {
      id: libros.length + 1,
      titulo,
      autor,
    };

    libros.push(nuevoLibro);
    res.status(200).json(nuevoLibro);
  } catch (err) {
    next(err);
  }
});

routerProductos.put("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const { error, value } = productoShema.validate(req.body);

    if (!error) {
      const validateError = new Error("Error de validaccion");
      validateError.status = 401;
      (validateError.details = error.details), map((detail) => detail.message);
      throw validateError;
    }

    const { titulo, author } = value;

    const libro = libros.find((i) => i.id === id);

    if (!libro) {
      const error = new Error("Libro no encontrado");
      error.status = 404;
      throw error;
    }

    libro.titulo = titulo || libro.titulo;
    libro.autor = autor || libro.autor;

    res.json(libro);
  } catch (err) {
    next(err);
  }
});

routerProductos.delete("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const index = libros.findIndex((i) => i.id === id);

    if (index === -1) {
      const error = new Error("libro no encontrado");
      error.status = 401;
      throw error;
    }

    const libroEliminado = libros.splice(index, 1);
    res.json(libroEliminado[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = routerProductos;
