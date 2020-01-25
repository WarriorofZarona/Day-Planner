// Displaying current day
var currentDay = $("#currentDay")
currentDay.text(moment().format('dddd, MMMM Do YYYY'));

//Create timeblocks
//Create variables for elements
var targetContainer = $(".container");
var hourArr = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
console.log(hourArr.length)
Now going to try to turn it into a function

    // Creates the 9am to 5pm timeblocks
    createTimeBlock();

function createTimeBlock() {
    for (var i = 0; i < hourArr.length; i++) {
        // Creating first row
        var createTimeBlockRow = $("<div>");
        createTimeBlockRow.addClass("row timeblock").attr("id", "row" + i);
        targetContainer.append(createTimeBlockRow);
        //Creating column for the row
        // Hour column
        var hourCol = $("<div>");
        hourCol.addClass("col-sm-1 hour description").text(hourArr[i]);
        $("#row" + i).append(hourCol);
        // Event column
        var eventCol = $("<div>");
        eventCol.addClass("col-sm-10 textarea description past");
        $("#row" + i).append(eventCol);
        // Save column
        var saveCol = $("<div>");
        saveCol.addClass("col-sm-1 saveBtn").html("<i class=\"far fa-save\"></i>");
        $("#row" + i).append(saveCol);
    };
};

//In the timeblocks, there are 3 parts:
// Display Hour, Display Time Event, Display Save Button


// We will display from 9AM to 5PM, which is a length of 9 blocks


// When we click on Time Event, user can input text.


// When we click on save button, text is stored on localstorage and persists in Time Event.


// Time blocks are color coded. Current hour displays red. Past hours display gray. Future hours display green.
// These color codes are already in the style sheet, so we just need to add the elements to html using jQuery.

