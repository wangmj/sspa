requirejs.config({
    baseUrl: "/Scripts/app",
    paths: {
        "jquery": "../jquery-3.1.1.min",
        "knockout": "../knockout-3.4.2",
        "sspa": "../sspa",
        "text":"../text"
    }
});
require(["jquery", "knockout", "sspa/app"], function ($, ko, app) {
    app.setRoot("./shell");
});