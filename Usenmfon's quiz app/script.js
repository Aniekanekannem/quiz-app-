//The api from www.opentdb.com is being stored here
const BASE_URL = "https://opentdb.com/api.php?amount=5&category=21";


//This array will hold all the questions and answers from the database
let currentQuizData = [];

//Using the fetch api to link our project to the api resource
fetch(BASE_URL)
  .then((res) => res.json())
  .then((data) => {
      // console.log(data)
    //The results array which holds the data is being stored in currentQuizData
    currentQuizData = data.results;
    //This function is called everytime the api fetches data
    loadQuiz();
  })
  .catch((e) => console.log(e)); //shows the error if there is any

  //From here,  we are interacting with the dom to populate our interface with data
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");

const a_input = document.getElementById("a");
const b_input = document.getElementById("b");
const c_input = document.getElementById("c");
const d_input = document.getElementById("d");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

const submitBtn = document.getElementById("submit");
const form = document.forms["option"];

var currentQuiz = 0; //Stores the current quiz position in the array
let score = 0; //Increases as the user answers the questions correctly
let options; //Stores the options generated from the database

function loadQuiz() {
  deselectAnswers(); //This invokes a function to reset the options
  let index = randomNumber(0, 4); //This invokes a function to random a number
  let correct_answer = currentQuizData[currentQuiz].correct_answer; //gets the correct answer and stores it in a variable
  options = currentQuizData[currentQuiz]["incorrect_answers"]; //gets the incorrect answers and stores it in a variable

  options.splice(index, 0, correct_answer); //uses an array method to alter the position of the options

  questionEl.innerText = currentQuizData[currentQuiz].question; //displays the question from the api
  a_text.innerText = options[0];
  b_text.innerText = options[1];
  c_text.innerText = options[2];
  d_text.innerText = options[3];

  a_input.value = options[0];
  b_input.value = options[1];
  c_input.value = options[2];
  d_input.value = options[3];
}

//This is the function that is being called to randomize the index above
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//This function checks for the value of the selected radio button
function getSelected() {
  const answer = form["answer"].value;
  return answer;
}

//This function refreshes the options for the new question
function deselectAnswers() {
  form.reset();
}

var countDownDate = 10;    

//This is an event listener that controls what should take place when the user clicks on submit
submitBtn.addEventListener("click", () => {
  const answer = getSelected(); //Invokes the getSelected function
  countDownDate = 10
  if (answer) { //If the user has clicked on the answer radio button, activate the code inside
    if (answer === currentQuizData[currentQuiz].correct_answer) { //if the answer is correct, activate the code inside
      score++; //increases the score from zero to something else
    }
  }
  currentQuiz++; //increment the current questions and options
  if (currentQuiz < currentQuizData.length) { //if this is true, invoke the function inside else implement the next code.
    loadQuiz();
  } else {
    quiz.innerHTML = `<h2>You answered correctly ${score}/${currentQuizData.length} questions.</h2> <button
        onclick="location.reload()">Reload</button>`;
  }
});






// Set the date we're counting down to
// var countDownDate = 10;

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  // var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate--;
    
  // Time calculations for days, hours, minutes and seconds
  // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor(countDownDate / 60);
  var seconds =  countDownDate % 60//Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = minutes + "m " + ":" + seconds + "s ";

  document.getElementById("demo1").innerHTML = minutes + "m " + ":" + seconds + "s ";
    

  // If the count down is over, write some text 
  
 
 if (distance <= 0) {
    clearInterval(quiz);
    //  document.getElementById("demo").innerHTML = "sorry Time up, click reload";
     document.getElementById("demo1").innerHTML = `sorry Time up, current score is ${score}/${currentQuizData.length}, click reload`;
    question.textcontent = "sorry times up!!"
    document.getElementById('quiz').style.display = "none"
    document.getElementById('quizy').style.display = "block"

    document.getElementById('demo').style.display = "none"
    document.getElementById('demo1').style.display = "block"

  }
  
}, 1000);



