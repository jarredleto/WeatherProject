const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const port = 8000;

// STATIC PATH
const staticPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));


// ROUTING
app.get("/", (req, res) => {
    // res.send("Welcome to my website");
    res.render("index");
});

app.get("/about", (req, res) => {
    // res.send("Want to know more about me");
    res.render("about");
});

app.get("/weather", (req, res) => {
    // res.send("Know temperature of your location");
    res.render("weather");
});

app.get("*", (req, res) => {
    // res.send("Error 404. Page not found");
    res.render("404error", {
        errMsg: "Oops! Page not found"
    });
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});