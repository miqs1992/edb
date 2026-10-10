window.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initPanel(document.getElementById('home'), 'army', armyRanks);
    initPanel(document.getElementById('profile'), 'navy', navyRanks);
});

function initTabs() {
    const tabs = document.querySelectorAll('[role="tab"]');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                const selected = t === tab;
                t.setAttribute('aria-selected', selected);
                t.classList.toggle('active', selected);
                t.tabIndex = selected ? 0 : -1;
                document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
            });
        });
    });
}

// Adds one <img> per rank to the panel's gallery, wires the draw button to show a random one
// and the name toggle to show or hide the drawn rank's name under the picture
function initPanel(panel, folder, ranks) {
    const gallery = panel.querySelector('.gallery__images');
    const caption = panel.querySelector('.rank-name');
    const toggle = panel.querySelector('.name-toggle');

    const images = ranks.map(rank => {
        const el = document.createElement('img');
        el.src = `assets/images/${folder}/${rank.file}.svg`;
        el.alt = rank.name;
        gallery.appendChild(el);
        return el;
    });

    panel.querySelector('.draw-button').addEventListener('click', () => {
        images.forEach(i => i.classList.remove('visible'));
        caption.classList.remove('animate');
        // Force a reflow so the entrance animation restarts even when the same rank is drawn again
        void gallery.offsetWidth;

        const index = Math.floor(Math.random() * images.length);
        images[index].classList.add('visible');
        caption.textContent = ranks[index].name;
        caption.classList.add('animate');
    });

    toggle.addEventListener('change', () => {
        caption.classList.toggle('visible', toggle.checked);
    });
}
