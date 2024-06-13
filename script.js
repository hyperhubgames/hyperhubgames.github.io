import { games } from './games.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar'),
        searchResultsCount = document.getElementById('search-results-count'),
        gameCardsContainer = document.getElementById('game-cards-container'),
        randomGameButton = document.getElementById('random-game'),
        logoContainer = document.getElementById('logo-container');

    const logoText = 'HyperHub';

    // Create the letters for the logo
    const letters = [...logoText].map(char => {
        const spanEl = `
            <span class="letter">${char}</span>
        `
        logoContainer.insertAdjacentHTML('beforeend', spanEl);
        return spanEl;
    });

    function createGameCard(game) {
        const { image, title, link } = game;
        const gameCard = `
            <div class="game-card">
                <img src="${image}" alt="${title}">
                <h3 class="game-title">${title}</h3>
                <a href="${link}" class="game-link">Play Now</a>
            </div>
        `;

        return gameCard;
    }

    function displayGames(games) {
        gameCardsContainer.innerHTML = '';
        // games.forEach(game => {
        //     const gameCard = createGameCard(game);
        //     gameCardsContainer.appendChild(gameCard);
        // });
        //
        // This code above is not efficient when there's lots of games because we're 
        // updating the DOM every single time we have a game. Instead, we should update 
        // it just once, here's how:

        const allGameCardsHTML = [...Array(games.length)].map(game => createGameCard(game)).join('');
        // This code above generates a string full of all of the HTML of each game combined.
        // This way, we can just append it once to the DOM to save lots of time and efficiency.
        console.log(allGameCardsHTML);
        // Updating the DOM once:
        gameCardsContainer.insertAdjacentHTML('beforeend', allGameCardsHTML);


        updateSearchResultsCount(games.length);
    }

    function updateSearchResultsCount(filteredGames) {
        searchResultsCount.textContent = `${filteredGames}/${games.length} games found`;
    }

    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredGames = games.filter(game => game.title.toLowerCase().includes(query));
        displayGames(filteredGames);
    });

    randomGameButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * games.length);
        window.location.href = games[randomIndex].link;
    });

    let isMouseOver = false;

    document.addEventListener('mousemove', (e) => {
        isMouseOver = true;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        letters.forEach(letter => {
            const rect = letter.getBoundingClientRect(),
                  letterX = rect.left + rect.width / 2,
                  letterY = rect.top + rect.height / 2,
                  dx = letterX - mouseX,
                  dy = letterY - mouseY,
                  distance = Math.sqrt(dx * dx + dy * dy),
                  maxDistance = 100;
            if (distance < maxDistance) {
                const angle = Math.atan2(dy, dx),
                      offsetX = Math.cos(angle) * (maxDistance - distance),
                      offsetY = Math.sin(angle) * (maxDistance - distance);
                letter.style.transition = 'transform 0.2s ease-out';
                letter.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            } else {
                letter.style.transition = 'transform 0.5s ease-in-out';
                letter.style.transform = 'translate(0, 0)';
            }
        });
    });

    document.addEventListener('mouseleave', () => {
        isMouseOver = false;
        letters.forEach(letter => {
            letter.style.transition = 'transform 1s ease-out';
            letter.style.transform = 'translate(0, 0)';
        });
    });

    // Ensure letters return to original position with a bounce effect
    function resetLetters() {
        if (!isMouseOver) {
            letters.forEach(letter => {
                letter.style.transition = 'transform 0.5s ease-in-out';
                letter.style.transform = 'translate(0, 0)';
            });
        }
        requestAnimationFrame(resetLetters);
    }

    resetLetters();

    displayGames(games);
});
