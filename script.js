// JavaScript Document
console.log("Melkweg: script.js geladen.");

/*********************************/
/* 1. GLOBALE SETUP & SELECTOREN */
/*********************************/

// Elementen en variabelen voor navigatie, toegankelijkheid en thema's.

// --- Menu Elementen ---
const openMenuKnop = document.getElementById('open-menu-knop');
const fullscreenMenu = document.getElementById('fullscreen-menu');

// --- Bewegingsreductie Elementen ---
const motionToggleButton = document.getElementById('verminder-beweging');
const motionIcon = motionToggleButton ? motionToggleButton.querySelector('img') : null;
const motionClass = 'motion-reduced';
const storageKey = 'motionPreference'; // Sleutel voor localStorage

// --- Theme Switcher Elementen ---
const themeSwitcher = document.querySelector('.theme-switcher');
const themeButtons = themeSwitcher ? themeSwitcher.querySelectorAll('button') : [];
const themeStorageKey = 'selectedTheme';
const defaultTheme = 'light';

// --- Homepagina Filter Elementen (Geselecteerd op basis van structuur) ---
const programmaSectie = document.querySelector('main section:nth-of-type(2)');

if (programmaSectie) {
    // Selecteer de filterknoppen en de lijst, geconditioneerd op de aanwezigheid van de sectie.
    var justAnnouncedButton = programmaSectie.querySelector('ul:first-of-type li:first-of-type button');
    var nextUpButton = programmaSectie.querySelector('ul:first-of-type li:nth-of-type(2) button');
    var eventList = programmaSectie.querySelector('ul:nth-of-type(2)');
    var buttons = programmaSectie.querySelectorAll('.button-list button'); // Let op: deze class staat nog in de code.
    
    // Data voor de filter-states (Voorbeelddata)
    var justAnnouncedEvents = [
        { name: 'Rinse FM: Flowdan + more', date: 'vr 28 nov', type: 'Club' },
        { name: 'Good Neighbours', date: 'ma 2 mrt', type: 'Concert' },
        { name: 'Fierce', date: 'vr 3 okt', type: 'Club' },
        { name: 'Raving Charlie', date: 'vr 17 okt', type: 'Club' },
        { name: 'Nyege Nyege 10 years', date: 'zo 26 okt', type: 'Club' },
        { name: 'Lord of the lost', date: 'do 09 apr', type: 'Concert' }
    ];

    var nextUpEvents = [
        { name: '80`s Verantwoord', date: 'vr 19 sep', time: '19:00', type: 'Club' },
        { name: 'Just for Kicks (2005)', date: 'vr 19 sep', time: '19:00', type: 'Film' },
        { name: 'East Africa Conekt', date: 'vr 19 sep', time: '22:00', type: 'Club' },
        { name: 'No name', date: 'vr 19 sep', time: '23:59', type: 'Club' },
        { name: 'Miyazaki: Spirit of Nature (2024)', date: 'za 20 sep', time: '17:00', type: 'Film' },
        { name: 'Rowwen Héze', date: 'zo 21 sep', time: '19:00', type: 'Concert' },
    ];
}


/*********************************/
/* 2. NAVIGATIE TOGGLE LOGICA */
/*********************************/

/**
 * Opent het fullscreen menu en voorkomt scrollen op de body.
 */
function openMenu() {
    if (fullscreenMenu) {
        fullscreenMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Sluit het fullscreen menu en herstelt scrollen.
 */
function sluitMenu() {
    if (fullscreenMenu) {
        fullscreenMenu.classList.remove('open');
        // Wacht tot de animatie klaar is (0.2s) voordat scrollen wordt hersteld
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 200); 
    }
}

/**
 * Wisselt de open/gesloten staat van het menu.
 */
function toggleMenu() {
    const isMenuOpen = fullscreenMenu.classList.contains('open');
    isMenuOpen ? sluitMenu() : openMenu();
}

// Event Listener: Koppel de toggle functie aan de hamburgerknop
if (openMenuKnop && fullscreenMenu) {
    openMenuKnop.addEventListener('click', toggleMenu);
}


/******************************************/
/* 3. BEWEGINGSREDUCTIE LOGICA (PREFERENCE) */
/******************************************/

/**
 * Synchroniseert het icoon en ARIA-label van de bewegingsknop met de huidige status.
 * @param {boolean} isReduced - Geeft aan of beweging is gereduceerd.
 */
function updateButtonIcon(isReduced) {
    if (motionIcon) {
        // Wisselt tussen 'pauze' en 'play' iconen.
        const newSrc = isReduced ? 'images/play.svg' : 'images/pauze.svg'; 
        motionIcon.src = newSrc;
    }
    
    if (motionToggleButton) {
        motionToggleButton.setAttribute('aria-label', isReduced ? 'Herstel animaties' : 'Verminder animaties');
    }
}

/**
 * Schakelt de 'motion-reduced' class op de body en slaat de voorkeur op.
 */
function toggleMotion() {
    const isReduced = document.body.classList.toggle(motionClass);
    localStorage.setItem(storageKey, isReduced);
    updateButtonIcon(isReduced);
}

/**
 * Laadt de opgeslagen voorkeur of de systeemvoorkeur voor beweging bij het laden.
 */
function loadMotionPreference() {
    const preference = localStorage.getItem(storageKey);
    
    // Controleert handmatige override in localStorage
    if (preference === 'true') {
        document.body.classList.add(motionClass);
        updateButtonIcon(true);
        return;
    } 
    
    // Controleert systeeminstelling als er geen handmatige override is
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        updateButtonIcon(true); 
    } else {
        updateButtonIcon(false);
    }
}


// Initialisatie: Koppel de toggle functie aan de knop en laad de voorkeur.
if (motionToggleButton && motionIcon) {
    motionToggleButton.addEventListener('click', toggleMotion);
    loadMotionPreference();
}


/**************************************************/
/* 4. THEMA SWITCHER LOGICA */
/**************************************************/

/**
 * Past de actieve class aan op de body en de knoppen om het thema te wijzigen.
 * @param {string} theme - De te activeren mode ('light', 'dark', 'club').
 */
function applyTheme(theme) {
    // 1. Update de BODY class
    document.body.classList.remove('dark-mode', 'club-mode');
    if (theme !== 'light') {
        document.body.classList.add(`${theme}-mode`);
    }

    // 2. Update de actieve knop (visuele feedback)
    themeButtons.forEach(button => {
        button.classList.remove('active-theme');
        if (button.dataset.theme === theme) {
            button.classList.add('active-theme');
        }
    });

    // 3. Persistentie: Sla de voorkeur op
    localStorage.setItem(themeStorageKey, theme);
}

/**
 * Bepaalt de initiële mode op basis van opgeslagen voorkeur of systeeminstellingen.
 */
function loadInitialTheme() {
    const savedTheme = localStorage.getItem(themeStorageKey);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let initialTheme = defaultTheme;
    
    if (savedTheme) {
        initialTheme = savedTheme;
    } else if (systemPrefersDark) {
        initialTheme = 'dark';
    }
    
    applyTheme(initialTheme);
}

// Event Listener: Schakel de mode bij een klik op de knop
if (themeSwitcher) {
    themeSwitcher.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const selectedTheme = event.target.dataset.theme;
            if (selectedTheme) {
                applyTheme(selectedTheme);
            }
        }
    });
    
    // Initialisatie: Laad de mode zodra de pagina geladen is
    document.addEventListener('DOMContentLoaded', loadInitialTheme);
}


/*******************************************************************/
/* 5. EVENEMENTEN FILTER LOGICA (HOME PAGINA) */
/*******************************************************************/

// Deze logica wordt alleen uitgevoerd als de programma sectie op de pagina bestaat.
if (programmaSectie) {
    
    /**
     * Markeer de actieve knop en deactiveer de andere.
     */
    function setActiveButton(activeButton) {
        // Gebruikt de 'buttons' variabele die eerder is geselecteerd.
        buttons.forEach(button => {
            button.classList.remove('active-button');
        });
        activeButton.classList.add('active-button');
    }

    /**
     * Genereert de HTML voor de evenementenlijst op basis van de geleverde data.
     */
    function renderEvents(events) {
        eventList.innerHTML = '';
        
        events.forEach(event => {
            const listItem = document.createElement('li');
            
            const timeHTML = event.time ? `<a class="time">${event.time}</a>` : '';
            const typeHTML = event.type ? `<a class="type">${event.type}</a>` : '';

            // De bestaande HTML structuur wordt hier gereproduceerd
            listItem.innerHTML = `
                <div>
                    <a>${event.name}</a>
                    ${typeHTML}
                </div>
                <div>
                    <a>${event.date}</a>
                    ${timeHTML}
                </div>
                <hr>
            `;
            eventList.appendChild(listItem);
        });
    }

    // Event listeners koppelen aan de filterknoppen
    if (justAnnouncedButton && nextUpButton) {
        justAnnouncedButton.addEventListener('click', () => {
            setActiveButton(justAnnouncedButton);
            renderEvents(justAnnouncedEvents);
        });

        nextUpButton.addEventListener('click', () => {
            setActiveButton(nextUpButton);
            renderEvents(nextUpEvents);
        });
        
        // Standaard laad de 'Just announced' lijst bij het opstarten
        document.addEventListener('DOMContentLoaded', () => {
            setActiveButton(justAnnouncedButton);
            renderEvents(justAnnouncedEvents);
        });
    }
}