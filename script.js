document.addEventListener('DOMContentLoaded', () => {
    const games = [
        { name: 'Alien Thief', path: 'swf/alientheif/base.html', image: 'img/alienthief.jpg' },
        { name: '1v1.lol', path: 'html/1v1/index.html', image: 'img/1v1.webp' }
    ];

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
            if (gameName.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
