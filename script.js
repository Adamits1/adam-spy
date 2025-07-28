
class SpyGame {
    constructor() {
        this.gameState = 'setup';
        this.playerCount = 4;
        this.spyCount = 1;
        this.selectedPacks = ['locations'];
        this.currentPlayer = 1;
        this.players = [];
        this.secretWord = '';
        this.roleRevealed = false;
        this.adminClickCount = 0;
        this.theme = localStorage.getItem('spy-game-theme') || 'light';
        
        this.defaultWordPacks = [
            {
                id: 'locations',
                name: 'Vietas',
                words: [
                    'Pludmale', 'Skola', 'Bibliotēka', 'Tirgus', 'Ūdenskrātuve', 'Origo', "Origo tuneļi", 'Autobusu pietura', 'Stadions',
                    'Skate', 'Skatu tornis', 'Skurstenis', 'Spēju parks', 'Baseins', 'Viesnīca', 'Restorāns', 'Parks', "Vecrīga", "Divāns", "Tualete",
                    'Kino', 'Teātris', 'Muzejs', 'Birojs', 'Bērnudārzs', 'Universitāte', 'Zooloģiskais dārzs', 'Botāniskais dārzs',
                    'Pils', 'Lidosta', 'Dzelzceļa stacija', 'Veikals', 'Tirdzniecības centrs', 'Bārs', 'Kafejnīca', 'Pirts', 'Sauna',
                    'Banka', 'Policija', 'Benzīntanks', 'Būvlaukums', 'Dzirnavas', 'Ezers', 'Upe', 'Mežs', 'Kalns', 'Ala'
                ]
            },
            {
                id: 'objects',
                name: 'Priekšmeti',
                words: [
                    'Grāmatplaukts', 'Zīmulis', 'Glāze', 'Telefons', 'Dzeramais kauss', 'Kombinētais atslēgu turētājs',
                    'Dāvanpapīrs', 'Ķivere', 'Spilvens', 'Lampa', 'Spilvens', 'Austiņas', 'Miskaste', 'Skolas soma', 'Krūzīte',
                    'Galda lampa', 'Ventilators', 'Grāmata', 'Burtnīca', 'Dators', 'Pildspalva', 'Šķīvji', 'Dakšiņa',
                    'Karote', 'Nazis', 'Durvis', 'Dvielis', 'Trauku veļas mašīna', 'Ledusskapis', 'Mikroviļņu krāsns',
                    'Trauki', 'Trauku žāvētājs', 'Grīdas slotas', 'Putekļu sūcējs', 'Knaģis', 'Rozetes', 'Paklājs', 'Galdauts'
                ]
            },
            {
                id: 'activities',
                name: 'Aktivitātes',
                words: [
                    'Skraidīšana', 'Peldēšana', 'Iepirkšanās', 'Zīmēšana', 'Fotografēšana', 'Makšķerēšana',
                    'Puķu stādīšana', 'Krāsošana', 'Ceļošana', 'Rakstēšana', 'Pastaigāšanās', 'Ritenbraukšana',
                    'Skrituļošana', "Piedzeršanās", 'Sniega šķūrēšana',
                    'Dejošana', 'Dziedāšana', 'Kokapstrāde', 'Dārzniecība', 'Medības', 'Pārgājiens', 'Kempings',
                    'Pārgājiens', 'Airēšana', 'Burāšana', 'Slēpošana', 'Distanču slidošana', 'Basketbols', 'Futbols',
                    'Hokejs', 'Teniss', 'Badmintons', 'Vingrošana', 'Joga', 'Meditācija', 'Lasīšana', 'Filmēšana'
                ]
            },
            {
                id: 'animals',
                name: 'Dzīvnieki',
                words: [
                    'Kaķis', 'Suns', 'Gailis', 'Vista', 'Zivs', 'Tauriņš', 'Skudra', 'Bites',
                    'Krēvētāja', 'Pūce', 'Lapsa', 'Govs', 'Cūka', 'Kāmis', 'Trusis', 'Zilonis'
                ]
            },
            {
                id: 'klava',
                name: 'Klāva',
                words: [
                    'Roblox', 'MrBeast', 'Pepsi', 'Čipši', 'Kaka', 'Brainrot', 'TikToks',
                    'Minecrafts', 'YouTube', 'Šokolāde', 'Fortnite', 'Burgeris', 'PlayStation', 'Slime', 'Enerģijas dzēriens'
                ]
            },
            {
                id: 'lilu',
                name: 'Lilū',
                words: [
                    'Suņu barība', 'Kauls', 'Pavada', 'Kaklasiksna', 'Rotaļlieta', 'Bumba', 'Kucēns',
                    'Vetārsts', 'Suņu būda', 'Ķepas dvielis', 'Ūdens bļoda', 'Kakām maisiņš',
                    'Suņu šampūns', 'Knaģu knaibles', 'Skrāpējamā suka', 'Čipēšana'
                ]
            },
            {
                id: 'zubris',
                name: 'Zubris',
                words: [
                    'Konstitūcija', 'Hipotēze', 'Antropoloģija', 'Demokrātija', 'Relatīvitātes teorija',
                    'Kosmoloģija', 'Paradokss', 'Fenomenoloģija', 'Ekstrapolācija', 'Pitagora teorēma'
                ]
            },
            {
                id: 'food',
                name: 'Ēdiens',
                words: [
                    'Pica', 'Zupa', 'Maize', 'Cepumi', 'Jogurts', 'Siers', 'Burgers', 'Kartupeļi',
                    'Salāti', 'Olas', 'Makaroni', 'Biezpiens', 'Pankūkas', 'Čipsi', "Aukstā zupa", "Boršs", "Banāns"
                ]
            },
            {
                id: 'countries',
                name: 'Valstis',
                words: [
                    'Latvija', 'Igaunija', 'Lietuva', 'Polija', 'Vācija', 'Francija', 'Spānija', 'Itālija',
                    'Somija', 'Norvēģija', 'Krievija', 'Ķīna', 'Japāna', 'Kanāda', 'Austrālija', 'Brazīlija'
                ]
            }
        ];
        

        this.wordPacks = JSON.parse(localStorage.getItem('spy-game-packs')) || this.defaultWordPacks;
        
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.setupEventListeners();
        this.renderWordPacks();
        this.updateUI();
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('spy-game-theme', theme);
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.setTheme(this.theme === 'light' ? 'dark' : 'light');
        });

        // Player count controls
        document.getElementById('decrease-players').addEventListener('click', () => {
            if (this.playerCount > 1) {
                this.playerCount--;
                this.updateSpyCountMax();
                this.updateUI();
            }
        });

        document.getElementById('increase-players').addEventListener('click', () => {
            if (this.playerCount < 20) {
                this.playerCount++;
                this.updateUI();
            }
        });

        // Spy count controls
        document.getElementById('decrease-spies').addEventListener('click', () => {
            if (this.spyCount > 1) {
                this.spyCount--;
                this.updateUI();
            }
        });

        document.getElementById('increase-spies').addEventListener('click', () => {
            const maxSpies = Math.min(10, this.playerCount - 1);
            if (this.spyCount < maxSpies) {
                this.spyCount++;
                this.updateUI();
            }
        });

        // Game controls

        document.getElementById('start-game').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('reveal-role').addEventListener('click', () => {
            this.revealRole();
        });

        document.getElementById('next-player').addEventListener('click', () => {
            this.nextPlayer();
        });

        document.getElementById('reset-game').addEventListener('click', () => {
            this.resetGame();
        });

        // Admin controls
        document.getElementById('game-title').addEventListener('click', () => {
            this.handleTitleClick();
        });

        document.getElementById('admin-submit').addEventListener('click', () => {
            this.handleAdminLogin();
        });

        document.getElementById('admin-password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleAdminLogin();
            }
        });

        document.getElementById('admin-cancel').addEventListener('click', () => {
            this.showSetupScreen();
        });

        document.getElementById('admin-back').addEventListener('click', () => {
            this.showSetupScreen();
        });

        document.getElementById('add-pack').addEventListener('click', () => {
            this.addNewPack();
        });

        document.getElementById('new-pack-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addNewPack();
            }
        });
    }

    updateSpyCountMax() {
        const maxSpies = Math.min(10, this.playerCount - 1);
        if (this.spyCount > maxSpies) {
            this.spyCount = maxSpies;
        }
    }

    updateUI() {
        document.getElementById('player-count').textContent = this.playerCount;
        document.getElementById('spy-count').textContent = this.spyCount;
        
        const startBtn = document.getElementById('start-game');
        startBtn.disabled = this.selectedPacks.length === 0;
        
        if (this.gameState === 'playing') {
            document.getElementById('current-player-num').textContent = this.currentPlayer;
            document.getElementById('total-players').textContent = this.playerCount;
            document.getElementById('player-instruction').textContent = `Nododiet ${this.currentPlayer}. spēlētājam`;
        }
    }

    renderWordPacks() {
        const container = document.getElementById('word-packs');
        container.innerHTML = '';

        this.wordPacks.forEach(pack => {
            const packElement = document.createElement('div');
            packElement.className = 'pack-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'pack-checkbox';
            checkbox.id = pack.id;
            checkbox.checked = this.selectedPacks.includes(pack.id);
            
            checkbox.addEventListener('change', (e) => {
                this.handlePackSelection(pack.id, e.target.checked);
            });

            const label = document.createElement('label');
            label.className = 'pack-label';
            label.htmlFor = pack.id;
            label.textContent = `${pack.name} (${pack.words.length})`;

            packElement.appendChild(checkbox);
            packElement.appendChild(label);
            
            packElement.addEventListener('click', (e) => {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                    this.handlePackSelection(pack.id, checkbox.checked);
                }
            });

            container.appendChild(packElement);
        });
    }

    handlePackSelection(packId, checked) {
        if (checked) {
            if (!this.selectedPacks.includes(packId)) {
                this.selectedPacks.push(packId);
            }
        } else {
            this.selectedPacks = this.selectedPacks.filter(id => id !== packId);
        }
        this.updateUI();
    }

startGame() {
     if (this.selectedPacks.length === 0) return;

     // Combine words and select a random word for the round
     const combinedWords = this.selectedPacks.flatMap(packId => {
         const pack = this.wordPacks.find(p => p.id === packId);
         return pack ? pack.words : [];
     });

     const randomWord = combinedWords[Math.floor(Math.random() * combinedWords.length)];
     this.secretWord = randomWord;

     const spyIndices = new Set();
     while (spyIndices.size < this.spyCount) {
         spyIndices.add(Math.floor(Math.random() * this.playerCount));
     }

     // Reset players with new roles
     this.players = [];
     for (let i = 0; i < this.playerCount; i++) {
         this.players.push({
             id: i + 1,
             isSpy: spyIndices.has(i),
             word: spyIndices.has(i) ? undefined : randomWord
         });
     }

     this.currentPlayer = 1;
     this.roleRevealed = false;  // Reset the flag here
     this.showPlayingScreen();
     this.updateUI();
 }


    revealRole() {
        this.roleRevealed = true;
        const currentPlayerData = this.players.find(p => p.id === this.currentPlayer);
        
        document.getElementById('role-hidden').classList.add('hidden');
        document.getElementById('role-shown').classList.remove('hidden');

        if (currentPlayerData.isSpy) {
            document.getElementById('spy-role').classList.remove('hidden');
            document.getElementById('civilian-role').classList.add('hidden');
        } else {
            document.getElementById('spy-role').classList.add('hidden');
            document.getElementById('civilian-role').classList.remove('hidden');
            document.getElementById('secret-word-display').textContent = currentPlayerData.word;
        }

        const nextBtn = document.getElementById('next-player');
        nextBtn.textContent = this.currentPlayer < this.playerCount ? 'Nākamais spēlētājs' : 'Sākt spēlēt!';
    }

    nextPlayer() {
        if (this.currentPlayer < this.playerCount) {
            this.currentPlayer++;
            this.roleRevealed = false;
            document.getElementById('role-hidden').classList.remove('hidden');
            document.getElementById('role-shown').classList.add('hidden');
            document.getElementById('spy-role').classList.add('hidden');
            document.getElementById('civilian-role').classList.add('hidden');
            this.updateUI();
        } else {
            this.showSetupScreen();
            this.resetGame()
        }
    }

    resetGame() {
        this.gameState = 'setup';
        this.currentPlayer = 1;
        this.roleRevealed = false;
        this.players = [];
        this.adminClickCount = 0;
        this.showSetupScreen();
        this.secretWord = '';
        document.getElementById('role-hidden').classList.remove('hidden');
        document.getElementById('role-shown').classList.add('hidden');
    }

    handleTitleClick() {
        this.adminClickCount++;
        if (this.adminClickCount >= 7) {
            this.showAdminScreen();
            this.adminClickCount = 0;
        }
        setTimeout(() => {
            this.adminClickCount = 0;
        }, 3000);
    }

    handleAdminLogin() {
        const password = document.getElementById('admin-password').value;
        if (password === 'adams123') {
            document.getElementById('admin-login').classList.add('hidden');
            document.getElementById('admin-panel').classList.remove('hidden');
            this.renderAdminPacks();
        } else {
            alert('Nepareiza parole!');
        }
    }

    addNewPack() {
        const nameInput = document.getElementById('new-pack-name');
        const name = nameInput.value.trim();
        
        if (name) {
            const newPack = {
                id: Date.now().toString(),
                name: name,
                words: []
            };
            
            this.wordPacks.push(newPack);
            this.saveWordPacks();
            nameInput.value = '';
            this.renderAdminPacks();
            this.renderWordPacks();
        }
    }

    renderAdminPacks() {
        const container = document.getElementById('admin-word-packs');
        container.innerHTML = '';

        this.wordPacks.forEach(pack => {
            const packCard = this.createAdminPackCard(pack);
            container.appendChild(packCard);
        });
    }

    createAdminPackCard(pack) {
        const card = document.createElement('div');
        card.className = 'card admin-pack';

        card.innerHTML = `
            <div class="card-header">
                <div class="pack-header">
                    <h3 class="pack-title">
                        ${pack.name}
                        <span class="pack-count">${pack.words.length}</span>
                    </h3>
                    <div class="pack-actions">
                        <button class="pack-btn edit" onclick="spyGame.editPackName('${pack.id}')">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button class="pack-btn delete" onclick="spyGame.deletePack('${pack.id}')">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 6h18"/>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                                <path d="M8 6V4c0-1 1-2 2-2h4c-1 0 2 1 2 2v2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <div class="add-word-form">
                    <input type="text" class="word-input" placeholder="Pievienot jaunu vārdu" 
                           onkeypress="if(event.key==='Enter') spyGame.addWordToPack('${pack.id}', this)">
                    <button class="add-btn" onclick="spyGame.addWordToPack('${pack.id}', this.previousElementSibling)">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14"/>
                            <path d="M12 5v14"/>
                        </svg>
                    </button>
                </div>
                <div class="words-grid">
                    ${pack.words.map((word, index) => `
                        <div class="word-item">
                            <span class="word-text" onclick="spyGame.editWord('${pack.id}', ${index}, this)">${word}</span>
                            <button class="word-btn" onclick="spyGame.removeWord('${pack.id}', ${index})">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M18 6 6 18"/>
                                    <path d="M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        return card;
    }

    editPackName(packId) {
        const pack = this.wordPacks.find(p => p.id === packId);
        if (pack) {
            const newName = prompt('Ievadiet jaunu nosaukumu:', pack.name);
            if (newName && newName.trim()) {
                pack.name = newName.trim();
                this.saveWordPacks();
                this.renderAdminPacks();
                this.renderWordPacks();
            }
        }
    }

    deletePack(packId) {
        if (confirm('Vai tiešām vēlaties dzēst šo komplektu?')) {
            this.wordPacks = this.wordPacks.filter(p => p.id !== packId);
            this.selectedPacks = this.selectedPacks.filter(id => id !== packId);
            this.saveWordPacks();
            this.renderAdminPacks();
            this.renderWordPacks();
            this.updateUI();
        }
    }

    addWordToPack(packId, input) {
        const word = input.value.trim();
        if (word) {
            const pack = this.wordPacks.find(p => p.id === packId);
            if (pack) {
                pack.words.push(word);
                this.saveWordPacks();
                input.value = '';
                this.renderAdminPacks();
                this.renderWordPacks();
            }
        }
    }

    editWord(packId, wordIndex, element) {
        const pack = this.wordPacks.find(p => p.id === packId);
        if (pack && pack.words[wordIndex]) {
            const newWord = prompt('Rediģēt vārdu:', pack.words[wordIndex]);
            if (newWord && newWord.trim()) {
                pack.words[wordIndex] = newWord.trim();
                this.saveWordPacks();
                this.renderAdminPacks();
                this.renderWordPacks();
            }
        }
    }

    removeWord(packId, wordIndex) {
        const pack = this.wordPacks.find(p => p.id === packId);
        if (pack) {
            pack.words.splice(wordIndex, 1);
            this.saveWordPacks();
            this.renderAdminPacks();
            this.renderWordPacks();
        }
    }

    saveWordPacks() {
        localStorage.setItem('spy-game-packs', JSON.stringify(this.wordPacks));
    }

    showSetupScreen() {
        this.gameState = 'setup';
        document.getElementById('setup-screen').classList.add('active');
        document.getElementById('playing-screen').classList.remove('active');
        document.getElementById('admin-screen').classList.remove('active');
        document.getElementById('admin-password').value = '';
        document.getElementById('admin-login').classList.remove('hidden');
        document.getElementById('admin-panel').classList.add('hidden');
    }

    showPlayingScreen() {
        this.gameState = 'playing';
        document.getElementById('setup-screen').classList.remove('active');
        document.getElementById('playing-screen').classList.add('active');
        document.getElementById('admin-screen').classList.remove('active');
    }

    showAdminScreen() {
        this.gameState = 'admin';
        document.getElementById('setup-screen').classList.remove('active');
        document.getElementById('playing-screen').classList.remove('active');
        document.getElementById('admin-screen').classList.add('active');
    }
}

// Initialize the game when the page loads
window.addEventListener('DOMContentLoaded', () => {
    window.spyGame = new SpyGame();
});
