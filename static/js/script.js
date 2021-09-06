const questions = [
    {
        question: "Are you coughing for three days ?",
        optionA: "Yes",
        optionB: "No",
        correctOption: "optionA"
    },{
        question: "Are you having fever or chills ?",
        optionA: "Yes",
        optionB: "No",
        correctOption: "optionA"
    },{
        question: "Are you having shortness of breadth or difficulty in breathing",
        optionA: "Yes",
        optionB: "No",
        correctOption: "optionA"
    },{
        question: "Are you having Fatigue",
        optionA: "Yes",
        optionB: "No",
        correctOption: "optionA"
    },{
        question: "Are you having Muscle or body aches",
        optionA: "Yes",
        optionB: "No",
        correctOption: "optionA"
    },{
        question: "Are you having Headache ?",
        optionA: "Yes",
        optionB: "No",
        correctOption: "optionA"
    },{
        question: "Are you having new loss of taste or smell",
        optionA: "Yes",
        optionB: "No",
        correctOption: "optionA"
    },{
        question: "Are you having sore throat ?",
        optionA: "Yes",
        optionB: "No",
        correctOption: "optionA"
    },{
        question: "Are you having congestion or runny nose ?",
        optionA: "Yes",
        optionB: "No",
        correctOption: "optionA"
    },{
        question: "Are you having Nausea or vomiting",
        optionA: "Yes",
        optionB: "No",
        correctOption: "optionA"
    },{
        question: "Are you having Diarrhea ?",
        optionA: "Yes",
        optionB: "No",
        correctOption: "optionA"    
    }
]


let shuffledQuestions = [] 

function handleQuestions() { 
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]  
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            playerScore++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            wrongAttempt++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}

function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEndGame() {
    let remark = null
    let remarkColor = null

    if (playerScore <= 3) {
        remark = "There is no need to worry."
        remarkColor = "green"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Take necessary precaution and practice social distancing."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Please visit the nearest test center for covid test."
        remarkColor = "red"
    }
    const playerGrade = (playerScore / 10) * 100

    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('score-modal').style.display = "flex"

}

function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}