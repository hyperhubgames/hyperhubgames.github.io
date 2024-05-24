import { games } from './games.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const searchResultsCount = document.getElementById('search-results-count');
    const gameCardsContainer = document.getElementById('game-cards-container');
    const randomGameButton = document.getElementById('random-game');
    const logoContainer = document.getElementById('logo-container');

    const logoText = 'HyperHub';

    // Create the letters for the logo
    const letters = [...logoText].map(char => {
        const span = document.createElement('span');
        span.classList.add('letter');
        span.textContent = char;
        logoContainer.appendChild(span);
        return span;
    });

    
    // logoText.split('').forEach(char => {
    //     const span = document.createElement('span');
    //     span.classList.add('letter');
    //     span.textContent = char;
    //     logoContainer.appendChild(span);
    //     letters.push(span);
    // });

    

    function createGameCard(game) {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        const gameImage = document.createElement('img');
        gameImage.src = game.image;
        gameImage.alt = game.title;

        const gameTitle = document.createElement('h3');
        gameTitle.classList.add('game-title');
        gameTitle.textContent = game.title;

        const gameLink = document.createElement('a');
        gameLink.href = game.link;
        gameLink.textContent = 'Play Now';
        gameLink.classList.add('game-link');

        gameCard.appendChild(gameImage);
        gameCard.appendChild(gameTitle);
        gameCard.appendChild(gameLink);

        return gameCard;
    }

    function displayGames(games) {
        gameCardsContainer.innerHTML = '';
        games.forEach(game => {
            const gameCard = createGameCard(game);
            gameCardsContainer.appendChild(gameCard);
        });
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
            const rect = letter.getBoundingClientRect();
            const letterX = rect.left + rect.width / 2;
            const letterY = rect.top + rect.height / 2;
            const dx = letterX - mouseX;
            const dy = letterY - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 100;
            if (distance < maxDistance) {
                const angle = Math.atan2(dy, dx);
                const offsetX = Math.cos(angle) * (maxDistance - distance);
                const offsetY = Math.sin(angle) * (maxDistance - distance);
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
