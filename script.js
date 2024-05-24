import games from "./games.js"

document.addEventListener('DOMContentLoaded', () => {

    const gameCardContainer = document.getElementById('game-card-container');
    const searchBar = document.getElementById('search-bar');
    const smallText = document.getElementById('smallText');
    
    const totalGames = games.length;

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
        const randomIndex = Math.floor(Math.random() * totalGames);
        const randomGame = games[randomIndex];
        window.location.href = randomGame.path;
    });

    const gameCards = Array.from(document.querySelectorAll('.game-card'));

    // Search functionality
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        let displayedGamesCount = 0;
        
        gameCards.forEach(card => {
            const gameName = card.querySelector('h2').innerText.toLowerCase();
            if (gameName.includes(searchTerm)) {
                card.style.display = 'block'
                displayedGamesCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        smallText.style.display = searchTerm ? 'block' : 'none'
        
        smallText.textContent = `${displayedGamesCount} out of ${totalGames} games`;
    });
    
    // Small text appearing to display number of games when searching
    searchBar.addEventListener('focus', (e) => {
        smallText.style.display = 'block';
        gameCards.forEach(card => card.style.display = 'block');
        e.target.value = '';
        smallText.textContent = `${totalGames} out of ${totalGames} games`;
    });
    searchBar.addEventListener('blur', (e) => {
        if (e.target.value) return;
        smallText.style.display = 'none';
    })
});