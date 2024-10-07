import { questions, answers } from './data.js';

let currentQuestionIndex = 0;
let score = [0, 0, 0, 0];
let total = 5;

const questionContainer = document.getElementById('question-container');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionNumber.textContent = `Question ${currentQuestionIndex + 1}`;
    questionText.textContent = question.question;

    answersContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('input');
        button.type = 'radio';
        button.name = 'answer';
        button.value = index;
        const label = document.createElement('label');
        if (index === 0) {
            label.textContent = option.A;
        } else if (index === 1) {
            label.textContent = option.B;
        } else {
            label.textContent = option.C;
        }
        button.addEventListener('click', () => handleAnswer(index));
        answersContainer.appendChild(button);
        answersContainer.appendChild(label);
    });
}

function handleAnswer(index) {
    console.log(index);
    score[index]++;
    currentQuestionIndex++;
}

const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < total) {
        displayQuestion();
    } else {
        displayResults();
    }
});

const prevButton = document.getElementById('prev-button');
prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

function displayResults() {
    let result;
    for (let i = 0; i < score.length; i++) {
        if (score[i] >= 3) {
            result = i;
            break;
        }
    }
    if (result == null) result = 3;

    console.log(result);

    // Text result
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    let html = `<h1 id="quiz-title" class="text-3xl font-bold text-center mb-6">Avatar Quiz</h1>`;
    html += `<p class="text-xl mb-4">Your result: ${answers[result].animal}</p>`;
    html += `<p class="text-xl mb-4">${answers[result].description}</p>`;

    quizContainer.innerHTML = html;
    getImg(answers[result].animal);
}

function getImg(animal) {
    fetch(`https://image.pollinations.ai/prompt/A%20beautiful%20${animal}?width=1280&height=720&seed=42`)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            console.log('Image URL:', imageUrl);
            
            // Create an image element and set its source to the blob URL
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.style.width = '100%';
            imageElement.style.height = 'auto';
            
            const quizContainer = document.getElementById('quiz-container');
            quizContainer.appendChild(imageElement);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

displayQuestion();


