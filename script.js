document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cards-container');
    const citySelector = document.getElementById('city-selector');
    const cityTitle = document.getElementById('city-title');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Названия для заголовков городов
    const cityNames = {
        all: "РОССИЯ<span>ПУТЕВОДИТЕЛЬ</span>",
        msk: "МОСКВА<span>ДЕФОЛТ-СИТИ</span>",
        spb: "ПИТЕР<span>КУЛЬТУРНО</span>",
        sochi: "СОЧИ<span>НА ЮГАХ</span>",
        ekb: "ЕКБ<span>УРАЛЬСКИЙ ВАЙБ</span>",
        kazan: "КАЗАНЬ<span>ТРЕТЬЯ СТОЛИЦА</span>"
    };

    // Функция отрисовки карточек
    function render() {
        container.innerHTML = '';
        const currentCity = citySelector.value;
        const currentCat = [...filterBtns].find(b => b.classList.contains('active')).dataset.cat;

        cityTitle.innerHTML = cityNames[currentCity] || cityNames['all'];

        // Фильтруем данные из cards.js
        const filtered = cardsData.filter(item => {
            const cityMatch = currentCity === 'all' || item.city === currentCity;
            const catMatch = currentCat === 'all' || item.category === currentCat;
            return cityMatch && catMatch;
        });

        // Создаем DOM элементы для каждой карточки
        filtered.forEach((card, index) => {
            const el = document.createElement('div');
            el.className = 'card';
            const randomRotate = (Math.random() * 4 - 2).toFixed(1);
            el.style.setProperty('--r', `${randomRotate}deg`);
            
            el.innerHTML = `
                <div class="card-meta">
                    <span>${card.city.toUpperCase()} // ${card.category.toUpperCase()}</span>
                    <span>ID:${1000 + index}</span>
                </div>
                <h3>${card.title}</h3>
                <p>${card.desc}</p>
                <div class="card-address">
                    <strong>LOC:</strong> ${card.address || 'Адрес уточняется'}
                </div>
                <div class="hint-box">
                    "Заметка: ${card.hint}"
                </div>
            `;
            container.appendChild(el);
        });
    }

    // Слушатели событий
    citySelector.addEventListener('change', render);
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            render();
        });
    });

    // Первый запуск
    render();
});
