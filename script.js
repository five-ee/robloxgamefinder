document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');
    const loading = document.getElementById('loading');

    // Create stars dynamically with better distribution
    const starContainer = document.getElementById('star-container');
    const numStars = 100;
    const gridWidth = 10; // 10x10 grid
    const gridHeight = 10;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Calculate grid position
        const row = Math.floor(i / gridWidth);
        const col = i % gridWidth;
        
        // Add some randomness within the grid cell
        const cellWidth = 100 / gridWidth;
        const cellHeight = 100 / gridHeight;
        
        const left = (col * cellWidth) + (Math.random() * cellWidth);
        const top = (row * cellHeight) + (Math.random() * cellHeight);
        
        star.style.left = left + '%';
        star.style.top = top + '%';
        
        // Add random animation delay
        star.style.animationDelay = Math.random() * 10 + 's';
        
        starContainer.appendChild(star);
    }

    // Sample game data (in a real application, this would come from an API)
    const games = [
        {
            title: "Adventures in Roblox",
            description: "An exciting adventure game with puzzles and exploration",
            link: "https://www.roblox.com/games/1234567890",
            keywords: ["adventure", "puzzle", "exploration"]
        },
        {
            title: "Battle Arena",
            description: "Compete against other players in intense PvP battles",
            link: "https://www.roblox.com/games/2345678901",
            keywords: ["pvp", "battle", "combat"]
        },
        {
            title: "Creative Building",
            description: "Build amazing structures and share them with others",
            link: "https://www.roblox.com/games/3456789012",
            keywords: ["building", "creative", "construction"]
        },
        {
            title: "Mystery Island",
            description: "Solve mysteries and uncover secrets on a mysterious island",
            link: "https://www.roblox.com/games/4567890123",
            keywords: ["mystery", "adventure", "puzzle"]
        }
    ];

    function searchGames(query) {
        const keywords = query.toLowerCase().split(',').map(k => k.trim());
        const results = games.filter(game => {
            return game.keywords.some(keyword => 
                keywords.some(searchKeyword => 
                    keyword.toLowerCase().includes(searchKeyword.toLowerCase())
                )
            );
        });

        return results;
    }

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        loading.style.display = 'none';

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="no-results">No games found matching your search criteria.</p>';
            return;
        }

        results.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.innerHTML = `
                <h3 class="game-title">${game.title}</h3>
                <p class="game-description">${game.description}</p>
                <a href="${game.link}" target="_blank" class="game-link">Play Game →</a>
            `;
            resultsContainer.appendChild(gameCard);
        });
    }

    // Add mouse movement animation
    document.addEventListener('mousemove', (e) => {
        const cursor = document.body.querySelector('::after');
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query === '') {
            resultsContainer.classList.remove('show');
            return;
        }

        loading.style.display = 'block';
        const results = searchGames(query);
        displayResults(results);
        resultsContainer.classList.add('show');
    });

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.classList.remove('show');
        }
    });
});
