// CR7 QUESTIONS
const questions = {
    easy: [
        { q: "What is Ronaldo’s most famous nickname?", a: ["CR10", "CR7", "El Bicho", "Rocket Man"], c: 1 },
        { q: "Where is Ronaldo from?", a: ["Spain", "Brazil", "Portugal", "Italy"], c: 2 },
        { q: "Which club developed Ronaldo?", a: ["Porto", "Sporting CP", "Benfica", "Braga"], c: 1 },
        { q: "What number is Ronaldo iconic for?", a: ["9", "10", "28", "7"], c: 3 },
        { q: "What position does Ronaldo play?", a: ["Goalkeeper", "Forward", "Defender", "Midfielder"], c: 1 }
    ],

    medium: [
        { q: "When did Ronaldo win his first Ballon d'Or?", a: ["2005", "2008", "2010", "2007"], c: 1 },
        { q: "How many Ballon d'Or does Ronaldo have?", a: ["4", "5", "6", "7"], c: 1 },
        { q: "What number did Ronaldo wear at Sporting CP?", a: ["17", "7", "30", "28"], c: 3 },
        { q: "Who did Ronaldo score a WC hat-trick against in 2018?", a: ["Brazil", "Spain", "Germany", "France"], c: 1 },
        { q: "Which club suffered Ronaldo’s bicycle kick?", a: ["Juventus", "Chelsea", "AC Milan", "Benfica"], c: 0 }
    ],

    hard: [
        { q: "Who did Ronaldo score his first UCL goal against?", a: ["Roma", "Arsenal", "Barcelona", "Lyon"], c: 0 },
        { q: "What is Sporting CP's stadium called?", a: ["Luz", "Dragao", "Alvalade", "Bessa"], c: 2 },
        { q: "Whose international scoring record did he break?", a: ["Klose", "Pele", "Ali Daei", "Maradona"], c: 2 },
        { q: "Who did Ronaldo face in the 2008 UCL final?", a: ["Chelsea", "Barcelona", "Liverpool", "Inter"], c: 0 },
        { q: "How many goals did Ronaldo score for Madrid?", a: ["412", "450", "389", "430"], c: 1 }
    ]
};

let level = "";
let index = 0;
let score = 0;

/* UI elements */
const menuBox = document.getElementById("menu-box");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const feedback = document.getElementById("feedback");
const siuText = document.getElementById("siu-text");

/* START */
function startQuiz(lvl) {
    level = lvl;
    index = 0;
    score = 0;

    menuBox.classList.add("hidden");
    quizBox.classList.remove("hidden");

    loadQuestion();
}

/* LOAD QUESTION */
function loadQuestion() {
    const q = questions[level][index];

    document.getElementById("question").textContent = q.q;
    feedback.style.opacity = 0;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.a.forEach((text, i) => {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.onclick = () => checkAnswer(btn, i);
        answersDiv.appendChild(btn);
    });
}

/* CHECK ANSWER */
function checkAnswer(btn, selected) {
    const q = questions[level][index];

    document.querySelectorAll("#answers button").forEach(b => b.disabled = true);

    if (selected === q.c) {
        btn.classList.add("correct");
        score++;

        feedback.textContent = "Good answer! SIUUUU 🔥";
        feedback.style.color = "#ffd447";

        /* SIUUU ANIMATION */
        siuText.style.opacity = 1;
        siuText.style.transform = "translate(-50%, -50%) scale(1)";

        setTimeout(() => {
            siuText.style.opacity = 0;
            siuText.style.transform = "translate(-50%, -50%) scale(0.1)";
        }, 600);

    } else {
        btn.classList.add("wrong");
        document.querySelectorAll("#answers button")[q.c].classList.add("correct");

        feedback.textContent = "Wrong answer 😅";
        feedback.style.color = "#ff4d4d";
    }

    feedback.style.opacity = 1;
}

/* NEXT */
function nextQuestion() {
    index++;
    if (index >= questions[level].length) endQuiz();
    else loadQuestion();
}

/* END */
function endQuiz() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");

    const total = questions[level].length;
    const pct = Math.round((score / total) * 100);

    document.getElementById("score").innerHTML =
        `<strong>${score}/${total}</strong> correct<br>(${pct}%)`;
}

/* BACK HOME */
function goHome() {
    resultBox.classList.add("hidden");
    menuBox.classList.remove("hidden");
}
