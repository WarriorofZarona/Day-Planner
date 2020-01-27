// Displaying current day
var currentDay = $("#currentDay");
var displayCurrentDay = moment().format('dddd, MMMM Do YYYY');
currentDay.text(displayCurrentDay);

//Create variables for elements
var targetContainer = $(".container");
var hourArr = [];

// When page loads:
// Creates an array from 9am to 5pm
createHourArr();
// Generates the timeblocks
createTimeBlock();
// Checks if storage is empty, or if it is a new day, then creates a new blank JSON and stores it back in
checkStorage();
// If there are events in storage, this will render text events into appropriate time blocks
renderEvents();
// Determines what hour it is on the day planner as well as past and future hours by color
checkTime();
// When save button is clicked, text is saved for that text block
$(document).on("click", "button", function () {
    // Creating variables
    var userInput = $(this).parent().find("textarea").val();
    var textRow = $(this).parent().find("textarea").attr("data-row");

    // Retrieving JSON data and stringifies it
    var dayPlanner = JSON.parse(localStorage.getItem("dayPlanner"));

    // Creating new object based on current date, user Input, and what time-block it was designated by row number
    var newEvent = new Object();
    newEvent.currentDay = displayCurrentDay;
    newEvent.row = textRow;
    newEvent.text = userInput;
    // Puts new object at beginning of JSON array
    dayPlanner.unshift(newEvent);
    // Removes duplicate older entry based on property "row"
    dayPlanner = removeDuplicates(dayPlanner, "row");
    // Sorts the new entry into the appropriate row spot
    dayPlanner.sort(function (x, y) {
        return x.row - y.row;
    });
    // Stores into local storage
    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner));

    // Checks for duplicates and removes it from the array based on row. First entry is saved, second entry is removed.
    function removeDuplicates(array, key) {
        var lookup = {};
        var result = [];
        for (var i = 0; i < array.length; i++) {
            if (!lookup[array[i][key]]) {
                lookup[array[i][key]] = true;
                result.push(array[i]);
            };
        };
        return result;
    };
});
// Using moment.js, this creates an array of hours 9am to 5pm
function createHourArr() {
    for (var i = 0; i < 9; i++) {
        var hour = moment().hour(i + 9).format("h a");
        hourArr.push(hour);
    };
};

// Using for loop, this creates 9 time blocks displaying hour, clickable event text, and save buttons
function createTimeBlock() {
    for (var i = 0; i < hourArr.length; i++) {
        // Creating first row
        var createTimeBlockRow = $("<div>");
        createTimeBlockRow.addClass("row timeblock").attr("id", "row" + i);
        targetContainer.append(createTimeBlockRow);
        //Creating column for the row
        // Hour column
        var hourCol = $("<div>");
        hourCol.addClass("col-sm-1 hour").text(hourArr[i]).attr("data-hour", i + 9);
        $("#row" + i).append(hourCol);
        // Event column
        var eventCol = $("<textarea>");
        eventCol.addClass("col-sm-10 description").attr("id", "text" + i).attr("data-row", i);
        $("#row" + i).append(eventCol);
        // Save column
        var saveCol = $("<button>");
        saveCol.addClass("col-sm-1 saveBtn").html("<i class=\"far fa-save\"></i>");
        $("#row" + i).append(saveCol);
    };
};

// Takes any JSON data from row property and generates into event box.
function renderEvents() {
    var display = JSON.parse(localStorage.getItem("dayPlanner"));
    $("textarea").empty;
    for (var i = 0; i < hourArr.length; i++) {
        $("#text" + i).text(display[i].text);
    };
};

// If storage doesn't exist, or if it is a new day, it will generate a blank JSON template
function checkStorage() {
    var storage = JSON.parse(localStorage.getItem("dayPlanner"));
    if (storage === undefined || storage === null || storage[0].currentDay !== displayCurrentDay) {
        storage = [];
        for (var i = 0; i < hourArr.length; i++) {
            var generateObj = new Object();
            generateObj.currentDay = displayCurrentDay;
            generateObj.row = i;
            generateObj.text = "";
            storage.push(generateObj);
            localStorage.setItem("dayPlanner", JSON.stringify(storage));
        };
    };
    localStorage.setItem("dayPlanner", JSON.stringify(storage));
};

// This checks current time against hours 9am to 5pm and color codes time-blocks appropriately
function checkTime() {
    for (var i = 0; i < hourArr.length; i++) {
        // If it is the current hour, time block will turn red
        if (moment().isSame(moment().hour(9 + i))) {
            $("#text" + i).addClass("present");
            // If it is a future hour, it will turn green
        } else if (moment().isBefore(moment().hour(9 + i))) {
            $("#text" + i).addClass("future");
        } else {
            // If it is a past hour, it will turn gray
            $("#text" + i).addClass("past");
        };
    };
};
