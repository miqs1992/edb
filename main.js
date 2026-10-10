window.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initArmy();
    initNavy();
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

const armyImages = [
    'Army-POL-OR-01',
    'Army-POL-OR-02',
    'Army-POL-OR-03',
    'Army-POL-OR-04a',
    'Army-POL-OR-04b',
    'Army-POL-OR-05',
    'Army-POL-OR-06',
    'Army-POL-OR-07',
    'Army-POL-OR-08',
    'Army-POL-OR-09a',
    'Army-POL-OR-09b',
    'Army-POL-OF-01b',
    'Army-POL-OF-01a',
    'Army-POL-OF-02',
    'Army-POL-OF-03',
    'Army-POL-OF-04',
    'Army-POL-OF-05',
    'Army-POL-OF-06',
    'Army-POL-OF-07',
    'Army-POL-OF-08',
    'Army-POL-OF-09',
    'Army-POL-OF-10',
]

const navyImages = [
    'POL_PMW_pagon1_marynarz',
    'POL_PMW_pagon1_starszy_marynarz',
    'POL_PMW_pagon1_mat',
    'POL_PMW_pagon1_starszy_mat',
    'POL_PMW_pagon1_bosmanmat',
    'POL_PMW_pagon1_bosman',
    'POL_PMW_pagon1_starszy_bosman',
    'POL_PMW_pagon1_młodszy_chorąży_marynarki',
    'POL_PMW_pagon1_chorąży_marynarki',
    'POL_PMW_pagon1_starszy_chorąży_marynarki',
    'POL_PMW_pagon1_starszy_chorąży_sztabowy_marynarki',
    'POL_PMW_pagon1_podporucznik_marynarki',
    'POL_PMW_pagon1_porucznik_marynarki',
    'POL_PMW_pagon1_kapitan_marynarki',
    'POL_PMW_pagon1_komandor_podporucznik',
    'POL_PMW_pagon1_komandor_porucznik',
    'POL_PMW_pagon1_komandor',
    'POL_PMW_pagon1_kontradmirał',
    'POL_PMW_pagon1_wiceadmirał',
    'POL_PMW_pagon1_admirał_floty',
    'POL_PMW_pagon1_admirał',
]

function appendImages(div, folder, images) {
    return images.map(name => {
        const el = document.createElement("img");
        el.src = encodeURI(`assets/images/${folder}/${name}.svg`);
        el.classList.add("js-army");
        div.appendChild(el);
        return el;
    })
}

function assignListener(images, button) {
    button.addEventListener('click', (event) => {
		event.preventDefault();
		images.map(i => i.classList.remove("visible"));
		const image = images[Math.floor(Math.random() * images.length)];
		image.classList.add("visible");
   })
}

function initArmy() {
    const div = document.getElementById("pictures-div");
    const images = appendImages(div, "army", armyImages);
    const button = document.getElementById("army-pick");
    assignListener(images, button);
}

function initNavy() {
    const div = document.getElementById("pictures-div2");
    const images = appendImages(div, "navy", navyImages);
    const button = document.getElementById("navy-pick");
    assignListener(images, button);
}
