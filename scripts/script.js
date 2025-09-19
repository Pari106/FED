// JavaScript Document
console.log("hi");
// Selecteer de knoppen en de lijst
const justAnnouncedButton = document.getElementById('just-announced');
const nextUpButton = document.getElementById('next-up');
const eventList = document.getElementById('event-list');

// Data voor de 'Just announced' evenementen
const justAnnouncedEvents = [
    { name: 'Rinse FM: Flowdan + more', date: 'vr 28 nov', type: 'Club' },
    { name: 'Good Neighbours', date: 'ma 2 mrt', type: 'Concert' },
    { name: 'Fierce', date: 'vr 3 okt', type: 'Club' },
    { name: 'Raving Charlie', date: 'vr 17 okt', type: 'Club' },
    { name: 'Nyege Nyege 10 years', date: 'zo 26 okt', type: 'Club' },
    { name: 'Lord of the lost', date: 'do 09 apr', type: 'Concert' }
];

// Data voor de 'Next up' evenementen
const nextUpEvents = [
    { name: 'Arty Party: Photography Graduates 2025', date: 'za 13 sep', time: '11:00', type: 'Expositie' },
    { name: '80`s Verantwoord', date: 'vr 19 sep', time: '19:00', type: 'Club' },
    { name: 'Just for Kicks (2005)', date: 'vr 19 sep', time: '19:00', type: 'Film' },
    { name: 'East Africa Conekt', date: 'vr 19 sep', time: '22:00', type: 'Club' },
    { name: 'No name', date: 'vr 19 sep', time: '23:59', type: 'Club' },
    { name: 'Miyazaki: Spirit of Nature (2024)', date: 'za 20 sep', time: '17:00', type: 'Film' }
];

// Functie om de lijst te renderen
function renderEvents(events) {
    // Maak de lijst leeg
    eventList.innerHTML = '';
    
    // Voeg de nieuwe evenementen toe
    events.forEach(event => {
        const listItem = document.createElement('li');
        
        // We controleren of 'time' en 'type' bestaan
        const timeHTML = event.time ? `<a class="time">${event.time}</a>` : '';
        const typeHTML = event.type ? `<a class="type">${event.type}</a>` : '';

        listItem.innerHTML = `
            <div class="event-details-top">
                <a href="#" class="name">${event.name}</a>
                ${typeHTML}
            </div>
            <div class="event-details-bottom">
                <a class="date">${event.date}</a>
                ${timeHTML}
            </div>
            <hr>
        `;
        eventList.appendChild(listItem);
    });
}


// Event listener voor de 'Just announced' knop
justAnnouncedButton.addEventListener('click', () => {
    renderEvents(justAnnouncedEvents);
});

// Event listener voor de 'Next up' knop
nextUpButton.addEventListener('click', () => {
    renderEvents(nextUpEvents);
});

// Zorg dat de pagina bij het laden de 'Just announced' evenementen toont
document.addEventListener('DOMContentLoaded', () => {
    renderEvents(justAnnouncedEvents);
});