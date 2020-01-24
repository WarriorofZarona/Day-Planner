//Create timeblocks

//Create variables for elements

// Targeting div container where code starts
var targetContainer = $(".container");

// Creating first row
var createTimeBlockRow = $("<div>");
createTimeBlockRow.addClass("row timeblock").attr("id", "row0");
targetContainer.append(createTimeBlockRow);

//Creating column for the row
var hourCol = $("<div>");
hourCol.addClass("col-lg-1 hour");
$("#row0").append(hourCol);

var eventCol = $("<div>");
eventCol.addClass("col-lg-10 textarea description");
$("#row0").append(eventCol);

var saveCol = $("<div>");
saveCol.addClass("col-lg-1 saveBtn");
$("#row0").append(saveCol);

var currentDay = $("#currentDay")
currentDay.text(moment().format('LLLL'));

//In the timeblocks, there are 3 parts:
// Display Hour, Display Time Event, Display Save Button


// We will display from 9AM to 5PM, which is a length of 9 blocks


// When we click on Time Event, user can input text.


// When we click on save button, text is stored on localstorage and persists in Time Event.


// Time blocks are color coded. Current hour displays red. Past hours display gray. Future hours display green.
// These color codes are already in the style sheet, so we just need to add the elements to html using jQuery.

