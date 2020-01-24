//Create timeblocks

//Create variables for elements

// Targeting div container where code starts
var targetContainer = $(".container");

// Creating first row
var createTimeBlockRow = $("<div>");
createTimeBlockRow.addClass("row timeblock").attr("id", "row0");
targetContainer.append(createTimeBlockRow);

//Creating column for the row
// Hour column
var hourCol = $("<div>");
hourCol.addClass("col-sm-1 hour description").text("9am");
$("#row0").append(hourCol);

// Event column
var eventCol = $("<div>");
eventCol.addClass("col-sm-10 textarea description past");
$("#row0").append(eventCol);

// Save column
var saveCol = $("<div>");
saveCol.addClass("col-sm-1 saveBtn").html("<i class=\"far fa-save\"></i>");
$("#row0").append(saveCol);

// Displaying current day
var currentDay = $("#currentDay")
currentDay.text(moment().format('dddd MMMM Do YYYY'));

//In the timeblocks, there are 3 parts:
// Display Hour, Display Time Event, Display Save Button


// We will display from 9AM to 5PM, which is a length of 9 blocks


// When we click on Time Event, user can input text.


// When we click on save button, text is stored on localstorage and persists in Time Event.


// Time blocks are color coded. Current hour displays red. Past hours display gray. Future hours display green.
// These color codes are already in the style sheet, so we just need to add the elements to html using jQuery.

