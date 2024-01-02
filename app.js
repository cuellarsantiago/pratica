const express = require("express");

const app = express();

const port = 3000;

const routerProductos = require("./routes/rutas");

const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());

app.use("/libros", routerProductos);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`servidor express inicializado en el puerto ${port}`);
});
