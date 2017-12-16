  // Initialize Firebase
var config = {
  apiKey: "AIzaSyB7bnYLwlSFqPZ_oe7nZCiGXq5neadWYCU",
  authDomain: "train-time-4c92f.firebaseapp.com",
  databaseURL: "https://train-time-4c92f.firebaseio.com",
  projectId: "train-time-4c92f",
  storageBucket: "train-time-4c92f.appspot.com",
  messagingSenderId: "357523531665"
  };
firebase.initializeApp(config);
  
var database = firebase.database();

$("#add-train-button").on("click", function(event) {
  event.preventDefault();
  // Gets the values the user inputs and saves them as variables
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#train-destination-input").val().trim();
  var trainTime = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#train-frequency-input").val().trim();
  // Creates a temporary object to send to firebase
  var newTrain = {
    train: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };
  
  // Pushs the object to firebase
  database.ref().push(newTrain);

  // Clears the input values
  $("#train-name-input").val("");
  $("#train-destination-input").val("");
  $("#train-time-input").val("");
  $("#train-frequency-input").val("");

  });

// Gets the values from firebase and populates the HTMl
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Get the current time and save it as a unix time
  var rightNow = moment().format("X");

  // Get the time since the first train in unix time.
  var timeSinceFirst = moment(trainTime).diff(rightNow);
  console.log(timeSinceFirst);
  // Calculate the time till the next train and save it as a variable
  var timeTillNext = timeSinceFirst % trainFrequency;
  // Convert the Unix time to clock time
  // var trainTimePretty = moment.unix(trainTime).format("HH:mm");


  // Puts the data into the HTML
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + timeTillNext + "</td><td>" + "minutesaway" + "</td></tr>");
});
