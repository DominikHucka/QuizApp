let currentQuestion = 0;
let rightQuestions = 0;
let answers = ['answer_1', 'answer_2', 'answer_3', 'answer_4'];
let AUDIO_WIN = new Audio('sounds/win.mp3');
let AUDIO_FAIL = new Audio('sounds/fail.mp3');
let AUDIO_SUCCESS = new Audio('sounds/success.mp3');


function init() {
    document.getElementById('allQuestions').innerHTML = questions.length;
    showQuestion();
}


function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {  
        updateProgressBar();
        showNextQuestion();
    }   
}


function gameIsOver() {
    return currentQuestion >= questions.length;
}


function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('amountOfQuestions').innerHTML = questions.length;
    document.getElementById('amountOfRightQuestions').innerHTML = rightQuestions;
    document.getElementById('headerImage').src = 'img/win.png';
    AUDIO_WIN.play();
}


function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length * 100;
    percent = Math.round(percent); // zahl wird aufgerundet 
    document.getElementById('progressBar').innerHTML = `${percent}%`;
    document.getElementById('progressBar').style.width = `${percent}%`; 
}


function showNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('questionNumber').innerHTML = currentQuestion +1;
    document.getElementById('questionText').innerHTML = question['Question'];
    document.getElementById('answer_1').innerHTML = question['1'];
    document.getElementById('answer_2').innerHTML = question['2'];
    document.getElementById('answer_3').innerHTML = question['3'];
    document.getElementById('answer_4').innerHTML = question['4'];
}


function answer(selection) { //answer(selection) = parameter wird von der id= answer_1 - 4 übernommen.
    let question = questions[currentQuestion]; // Variable wird neu definiert aus dem JSON array + currentQuestion an welcher stelle
    let selectedQuestionNumber = selection.slice(- 1); // hier wollen wir nur die Zahl ausgeben anstatt answer_3 wollen wir hier die 3 haben
    let idOfRightAnswer = `answer_${question['CorrectAnswer']}`; 

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        AUDIO_SUCCESS.play();
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightQuestions++;
    } else {
        AUDIO_FAIL.play();
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    } 
    document.getElementById('nextButton').disabled = false;
    removeAttributeAfterAnswers();
}


function removeAttributeAfterAnswers() { // entfernt die Onclick funktion
    document.getElementById('answerBody_1').removeAttribute("onclick");
    document.getElementById('answerBody_2').removeAttribute("onclick");
    document.getElementById('answerBody_3').removeAttribute("onclick");
    document.getElementById('answerBody_4').removeAttribute("onclick");
}


function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['CorrectAnswer'];
}


function nextQuestion() {
    currentQuestion++ // z.B von 0 auf 1
    document.getElementById('nextButton').disabled = true;
    addAttributeAfterAnswers();
    showQuestion();
    resetAnswerButtons();
}


function addAttributeAfterAnswers() { // fügt die Onclick funktion wieder hinzu
    document.getElementById('answerBody_1').setAttribute('onclick', 'answer("answer_1")');
    document.getElementById('answerBody_2').setAttribute('onclick', 'answer("answer_2")');
    document.getElementById('answerBody_3').setAttribute('onclick', 'answer("answer_3")');
    document.getElementById('answerBody_4').setAttribute('onclick', 'answer("answer_4")');
}


function resetAnswerButtons() { // resettet nach der nächsten frage alle buttons
    answers.forEach(answerId => {
        document.getElementById(answerId).parentNode.classList.remove('bg-danger', 'bg-success');
    });
}


function restartButton() {
    document.getElementById('headerImage').src = 'img/cart.jpg';
    document.getElementById('questionBody').style = ''; // questionBody wieder anzeigen
    document.getElementById('endScreen').style = 'display: none'; // Endscreen ausblenden 
    currentQuestion = 0;
    rightQuestions = 0; 
    init();// Spiel wird neu gestartet 
}