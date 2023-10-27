const express = require("express");
const app = express();
const path = require("path");

const pythonRunner = require("./pythonRunner.js")

const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "src")));

app.use(express.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {

    const formData = req.body;

    pythonRunner.sendOrder(formData);

    res.json({ message: 'Form submitted successfully', formData: formData });

});

app.listen(port, () => {
  console.log("App is running on port 3000");
});
