import games from './games.js'

document.addEventListener('DOMContentLoaded', () => {

    const gameCardContainer = document.getElementById('game-card-container');

    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        gameCard.innerHTML = `
            <img src="${game.image}" alt="${game.name}">
            <div class="game-card-content">
                <h2>${game.name}</h2>
                <a href="${game.path}" target="_blank">Play Now</a>
            </div>
        `;

        gameCardContainer.appendChild(gameCard);
    });

    // Random game functionality
    document.getElementById('random-game').addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * games.length);
        const randomGame = games[randomIndex];
        window.location.href = randomGame.path;
    });

    // Search functionality
    document.getElementById('search-bar').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll('.game-card').forEach(card => {
            const gameName = card.querySelector('h2').innerText.toLowerCase();
            gameName.includes(searchTerm)
                ? card.style.display = 'block'
                : card.style.display = 'none'
        });
    });
});
