let correctCount = 0;
const maxCorrect = 5;

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*', '/'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    let question, answer;
    switch(op) {
        case '+':
            question = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case '-':
            if (num1 < num2) [num1, num2] = [num2, num1]; // ensure positive
            question = `${num1} - ${num2}`;
            answer = num1 - num2;
            break;
        case '*':
            question = `${num1} * ${num2}`;
            answer = num1 * num2;
            break;
        case '/':
            const product = num1 * num2;
            question = `${product} / ${num1}`;
            answer = num2;
            break;
    }
    document.getElementById('question').textContent = `What is ${question}?`;
    return answer;
}

let currentAnswer;

document.addEventListener('DOMContentLoaded', () => {
    currentAnswer = generateQuestion();
    document.getElementById('submit').addEventListener('click', () => {
        const userAnswer = parseInt(document.getElementById('answer').value);
        if (userAnswer === currentAnswer) {
            correctCount++;
            document.getElementById('feedback').textContent = 'Correct!';
            document.getElementById('correct-count').textContent = correctCount;
            if (correctCount === maxCorrect) {
                document.getElementById('feedback').textContent = 'You win!';
                document.getElementById('submit').style.display = 'none';
                document.getElementById('restart').style.display = 'block';
            } else {
                currentAnswer = generateQuestion();
            }
        } else {
            document.getElementById('feedback').textContent = 'Incorrect. Try again.';
        }
        document.getElementById('answer').value = '';
    });
    document.getElementById('restart').addEventListener('click', () => {
        correctCount = 0;
        document.getElementById('correct-count').textContent = correctCount;
        document.getElementById('feedback').textContent = '';
        document.getElementById('submit').style.display = 'block';
        document.getElementById('restart').style.display = 'none';
        currentAnswer = generateQuestion();
    });
});