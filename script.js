import { games } from './games.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar'),
          searchResultsCount = document.getElementById('search-results-count'),
          gameCardsContainer = document.getElementById('game-cards-container'),
          randomGameButton = document.getElementById('random-game'),
          logoContainer = document.getElementById('logo-container');

    function createGameCard(game) {
        const { title, image, link } = game;
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
        const allGameCardsHTML = games.map(game => createGameCard(game)).join('');
        gameCardsContainer.innerHTML = allGameCardsHTML;
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

    // Fancy logo text hover effect start -------------------------------------------------

    const logoTextEl = document.getElementById("logo-container"),
          logoTextContent = logoTextEl.textContent;

    const newLogoHTML = [...logoTextContent].map(char => (
        char !== ' '
            ? `<span>${char}</span>`
            : char
    )).join("");

    logoTextEl.innerHTML = newLogoHTML;

    const logoTextSpanEls = Array.from(document.querySelectorAll("#logo-container span"));

    // Triggering animation when mouse enters
    logoTextEl.addEventListener("mouseenter", () => {
        logoTextSpanEls.forEach((span, i) => {
            span.style.animation = `letter-pulse 0.2s ease-in-out alternate ${i * 0.03}s`;
        });
    });

    // Removing animation when mouse leaves
    logoTextEl.addEventListener("mouseleave", () => {
        logoTextSpanEls.forEach(span => {
            span.style.animation = "none";
        });
    });

    // End of fancy logo hover effect ----------------------------------------------------

    displayGames(games);
});
