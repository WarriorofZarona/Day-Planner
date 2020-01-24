//Create timeblocks

//Create variables for elements
var targetContainer = $(".container");
var createRow = $("<div>");
createRow.attr("class", "row");
createRow.attr("id", "row0");
targetContainer.append(createRow);


//In the timeblocks, there are 3 parts:
// Display Hour, Display Time Event, Display Save Button


// We will display from 9AM to 5PM, which is a length of 9 blocks


// When we click on Time Event, user can input text.


// When we click on save button, text is stored on localstorage and persists in Time Event.


// Time blocks are color coded. Current hour displays red. Past hours display gray. Future hours display green.
// These color codes are already in the style sheet, so we just need to add the elements to html using jQuery.

