const belcherArray = [
    {qNum: 1,
    question: 'What is Tinas imaginary horse named?',
    answerOptions: ['Jericho','Shadowfax','Esteban','BoatyMcBoatface'],
    correctAnswer: 'Jericho'          
  }, 
    {qNum: 2,
    question: 'What is the name of aunt Gayles cat?',
    answerOptions: ['Rapidash','Mr. Business','Meowser','Elmo'],
    correctAnswer: 'Mr. Business'
  }, 
    {qNum: 3,
    question: 'What is the name of the school the Belcher children attend?',
    answerOptions: ['Landry', 'Wayside','Wakeland','Wagstaff'],
    correctAnswer: 'Wagstaff'
  }, 
    {qNum: 4,
    question: 'What number of burgers sold does the family attempt to celebrate?',
    answerOptions: [100000,1000000,50000,1000],
    correctAnswer: 100000
  }, 
    {qNum: 5,
    question: 'What is the name of the amusement park in town?',
    answerOptions: ['Jump City','Jazz land','Xtremer','Wonder Wharf'],
    correctAnswer: 'Wonder Wharf'
  }, 
    {qNum: 6,
    question: 'What is the name the handyman who frequents the restaurant?',
    answerOptions: ['Phil','Joe','Morty','Teddy'],
    correctAnswer: 'Teddy'
  }, 
    {qNum: 7,
    question: 'Who is Bobs rival?',
    answerOptions: ['Jimmy Pesto','Tom Jennings','Rick the karate teacher','Scott Bingington'],
    correctAnswer: 'Jimmy Pesto'
  }, 
    {qNum: 8, 
    question: 'What is the name of the girlscouts like organization Tina and Louise were once apart of',
    answerOptions: ['Girl Troopers','ThunderTroop 234','Thundergirls','Storm Troopers'],
    correctAnswer: 'Thundergirls'
  }, 
    {qNum: 9, 
    question: 'What type of meat is rumored to be apart of bobs burger recipe',
    answerOptions: ['Raccoon','Fox','Donkey','Human'],
    correctAnswer: 'Human'
  }, 
    {qNum: 10,
    question: 'What does Louise do when confronted with her boy band crush?',
    answerOptions: ['Kiss him','Scream profanities','Hide','Slap him'],
    correctAnswer: 'Slap him'
  }
];

let currentQ = 0;

function startQuizAtStart() {
// begin quiz, reveal submit button, and hide start page
$('#start-page').on('click', '.button', event => {
  $('#start-page').addClass('hidden');
  $('#question-page').removeClass('hidden');
  $('#submit-answer').removeClass('hidden');
});
}

function renderQuestions() {
// populate questions and answers from array of questions and answers
const answer1 = `${belcherArray[currentQ].answerOptions[0]}`;
const answer2 = `${belcherArray[currentQ].answerOptions[1]}`;
const answer3 = `${belcherArray[currentQ].answerOptions[2]}`;
const answer4 = `${belcherArray[currentQ].answerOptions[3]}`;
const questionText = `<legend>${currentQ+1}/10: ${belcherArray[currentQ].question}<legend>`;
const answersText = 
`<input type='radio' name='option' class='radio-buttons' id='answer1' value='${answer1}'><label for='answer1'>${answer1}</label><br>
<input type='radio' name='option' class='radio-buttons' id='answer2' value='${answer2}'><label for='answer2'>${answer2}</label><br>
<input type='radio' name='option' class='radio-buttons' id='answer3' value='${answer3}'><label for='answer3'>${answer3}</label><br>
<input type='radio' name='option' class='radio-buttons' id='answer4' value='${answer4}'><label for='answer4'>${answer4}</label><br>`;
$('.belcher-question').html(questionText);
$('.belcher-answer').html(answersText);
enableSubmitButton();
}

function enableSubmitButton() {
// restore submit button after disabling it
$('input[name=option]').on('click', function(event) {
  $('#submit-answer').removeClass('disabled').removeAttr('disabled');
});
}
  
function submitQuizAnswer() {
// submit selected answer, disable radio buttons
$('#submit-answer').click(function(event) {
  event.preventDefault();
  evaluateAnswers();
  $('#submit-answer').addClass('hidden');
  $('#next-question').removeClass('hidden');
  $('input[type=radio]').attr('disabled', true);
});
}

let userScore = {
correct: 0,
incorrect: 0,
};

function evaluateAnswers() {
//check for correct answer and display results and/or correct answer, also display updated score
let radioValue = $('input[name=option]:checked').val();
if (radioValue == belcherArray[currentQ].correctAnswer) {
  userScore.correct++;
  $('#feedbackcorrect').removeClass('hidden');
} else {
  userScore.incorrect++;
  getCorrectAnswer();
  $('#feedbackincorrect').removeClass('hidden');
  $('.incorrect-ans').removeClass('hidden');
}
$('.results-counter').html(`<p>Correct: ${userScore.correct} | Incorrect: ${userScore.incorrect}</p>`);
}  

function getCorrectAnswer() {
//create text for incorrect result including correct answer
let popupAnswerText = `<h3>Incorrect! But relax okay?<br>The correct answer is: ${belcherArray[currentQ].correctAnswer}.</h3><br>`;
$('#feedbackincorrect').html(popupAnswerText);
} 
    
function advanceToNextQuestion() {
// advance user to the next question or show final score depending on current question 
$('#next-question').on('click', function(event) {
  if (currentQ < belcherArray.length-1) {
    currentQ++;
    renderQuestions();
    resetQuestion();
  } else {
    showFinalScore();
  } 
});
}

function resetQuestion() {
// reset question and answers, remove previous results and swap submit and next buttons
$('input[type=radio]').attr('disabled', false);
$('#next-question').addClass('hidden');
$('#submit-answer').removeClass('hidden');
$('#feedbackcorrect').addClass('hidden');
$('#feedbackincorrect').addClass('hidden');
$('.incorrect-ans').addClass('hidden');
$('#submit-answer').addClass('disabled');
$('#submit-answer').attr('disabled', 'disabled');
}

function showFinalScore() {
// hide submit button and display final page with final score
    $('#submit-answer').addClass('hidden');
    $('#final-page').removeClass('hidden');
    $('#question-page').addClass('hidden');
    let finalScoreText = `<h3>You answered ${userScore.correct} out of 10 questions correctly!</h3>`;
    $('#final-correct').append(finalScoreText);
}

function restartQuiz() {
// takes user back to start upon click
$('#retake').click(function() {
  location.reload();
});
}

function handleQuizFunctions() {
startQuizAtStart();
renderQuestions();
submitQuizAnswer();
advanceToNextQuestion();
restartQuiz();
enableSubmitButton();
}

$(handleQuizFunctions);
