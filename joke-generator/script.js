const jokeDisplay = document.getElementById('jokeDisplay');
const jokeBtn = document.getElementById('jokeBtn');
const copyBtn = document.getElementById('copyBtn');
let currentJoke = '';

// Joke API: JokeAPI (free, no authentication needed)
const JOKE_API_URL = 'https://v2.jokeapi.dev/joke/Any?type=single';

// Fetch a random joke
async function getJoke() {
    jokeBtn.disabled = true;
    jokeDisplay.innerHTML = '<div class="loading"></div>';

    try {
        const response = await fetch(JOKE_API_URL);
        const data = await response.json();
        
        if (data.joke) {
            currentJoke = data.joke;
            jokeDisplay.innerHTML = `<p>${currentJoke}</p>`;
        } else {
            jokeDisplay.innerHTML = '<p>Failed to load joke. Try again!</p>';
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
        jokeDisplay.innerHTML = '<p>Error fetching joke. Please check your internet connection!</p>';
    } finally {
        jokeBtn.disabled = false;
    }
}

// Copy joke to clipboard
function copyJoke() {
    if (currentJoke) {
        navigator.clipboard.writeText(currentJoke).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copied!';
            copyBtn.classList.add('success');
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.classList.remove('success');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy joke');
        });
    } else {
        alert('Get a joke first!');
    }
}

// Event listeners
jokeBtn.addEventListener('click', getJoke);
copyBtn.addEventListener('click', copyJoke);

// Load a joke on page load
window.addEventListener('load', getJoke);
