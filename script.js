$(document).ready(function(){
    // get date and year 
    let m = moment();
    // set format for date
    let date = m.format('MMM Do YYYY');
    //set date to header
    $("#currentDay").text(date)
    onLoad();
    let now = currentTime();
    setTime(now);

    // get button click
    $(".saveBtn").on("click", function(){
        // get user input for calItem for that time
        let row = $(this).parent().parent();
        let key = row.attr("id");
        let calItem = row.find("textarea").val();
        console.log(row)
        console.log (key, calItem);
        // saved calItem to local storage
        localStorage.setItem(key, calItem);
    })
})






// called this function to load all user calItem from local memory to screen
function onLoad(){
    // created an array for all the times on the planner because this program used the time as a key
    let timeblock = ["_9", "_10","_11","_12","_13","_14","_15","_16","_17"]
    // for each time on the planner 
    $.each(timeblock, function(index,value){
        // get the what user store into local memery
        items = localStorage.getItem(value)
        // put the value inside that key on the text blocks
        $("#"+ value).find("textarea").text(items);
    })
}

// Called this function to tell the current time
function currentTime(){
    let currentHour = moment().hours();
    console.log(currentHour)
   
}

//color calendar, gray for past , red for current , green for future
function setTime(){
    //get the current time
      let hour = Number(moment().format("H")); //convert string to number
      console.log(hour);
      //loop through all the table rows
      let rows = document.querySelectorAll("tr");
      for (let row of rows){
          let idTime = Number(row.id.slice(1)); //remove underscore character from id, then convert to a number
        //	if the row id is before the current time, set its class to "past"
          if (idTime < hour) row.className = "past";
        //	if the row id is during the current time, set its class to "present"
          else if (idTime === hour) row.className = "present";
        //	if the row id is after the current time, set its class to "past"
          else row.className = "future";
    }
}