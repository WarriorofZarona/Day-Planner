// Displaying current day
var currentDay = $("#currentDay")
currentDay.text(moment().format('dddd, MMMM Do YYYY'));

//Create timeblocks
//Create variables for elements
var targetContainer = $(".container");
var hourArr = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];


// Creates the 9am to 5pm timeblocks

createTimeBlock();

checkStorage();

renderEvents();

$(document).on("click", "button", function () {
    console.log("Clicking now. The day planner is the following:")
    console.log(dayPlanner);
    var userInput = $(this).parent().find("textarea").val();
    var textRow = $(this).parent().find("textarea").attr("data-row");
    var dayPlanner = JSON.parse(localStorage.getItem("dayPlanner"))
    console.log("The text inputed is " + userInput);

    var newEvent = new Object();
    newEvent.currentDay = $("#currentDay").text();
    newEvent.row = textRow
    newEvent.text = userInput
    console.log("The new entry is " + newEvent);
    dayPlanner.unshift(newEvent);
    console.log("Entry added. Looks like this:")
    console.log(dayPlanner);
    dayPlanner = removeDuplicates(dayPlanner, "row")
    console.log("Duplicates removed. Looks like this:")
    console.log(dayPlanner);
    dayPlanner.sort(function (x, y) {
        return x.row - y.row
    });
    console.log("Objects sorted by row. Looks like this")
    console.log(dayPlanner);

    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner));

    function removeDuplicates(array, key) {
        var lookup = {};
        var result = [];
        for (var i = 0; i < array.length; i++) {
            if (!lookup[array[i][key]]) {
                lookup[array[i][key]] = true;
                result.push(array[i]);
            }
        }
        return result;
    }
});

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

function renderEvents() {

    var display = JSON.parse(localStorage.getItem("dayPlanner"));
    console.log(display);

    $("textarea").empty;
    for (var i = 0; i < hourArr.length; i++) {
        console.log("Generating text at iteration" + i)
        $("#text" + i).text(display[i].text);
        console.log($("#text" + i).text(display[i].text))

    };
};

function checkStorage() {

    var storage = JSON.parse(localStorage.getItem("dayPlanner"));

    if (storage === undefined || storage === null) {

        console.log("Day Planner is not in local storage. Creating Object.")
        storage = [];

        for (var i = 0; i < hourArr.length; i++) {

            var generateObj = new Object();
            generateObj.currentDay = $("#currentDay").text();
            generateObj.row = i
            generateObj.text = ""
            console.log(generateObj);
            storage.push(generateObj);
            localStorage.setItem("dayPlanner", JSON.stringify(storage));
        }
    }

    localStorage.setItem("dayPlanner", JSON.stringify(storage));
}
//In the timeblocks, there are 3 parts:
// Display Hour, Display Time Event, Display Save Button


// We will display from 9AM to 5PM, which is a length of 9 blocks


// When we click on Time Event, user can input text.


// When we click on save button, text is stored on localstorage and persists in Time Event.


// Time blocks are color coded. Current hour displays red. Past hours display gray. Future hours display green.
// These color codes are already in the style sheet, so we just need to add the elements to html using jQuery.

