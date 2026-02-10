import React, { useState, useMemo } from 'react';
// Импортируем данные (создадим этот файл отдельно)
import { cardsData } from './data';

// --- КОМПОНЕНТ КАРТОЧКИ ---
// Отвечает за отрисовку одной карточки с её уникальным поворотом
const Card = ({ card, index }) => {
  // Генерируем случайный наклон один раз при отрисовке
  const rotation = useMemo(() => (Math.random() * 4 - 2).toFixed(1), []);

  return (
    <div className="card" style={{ '--r': `${rotation}deg` }}>
      <div className="card-meta">
        <span>{card.city.toUpperCase()} // {card.category.toUpperCase()}</span>
        <span>ID:{1000 + index}</span>
      </div>
      <h3>{card.title}</h3>
      <p>{card.desc}</p>
      
      <div className="card-address">
        <strong>LOC:</strong> {card.address || 'Адрес уточняется'}
      </div>

      <div className="hint-box">
        "Заметка: {card.hint}"
      </div>
    </div>
  );
};

export default function App() {
  const [city, setCity] = useState('all'); // Состояние выбранного города
  const [category, setCategory] = useState('all'); // Состояние категории

  // Словарь заголовков для городов
  const cityNames = {
    all: <>РОССИЯ<span>ПУТЕВОДИТЕЛЬ</span></>,
    msk: <>МОСКВА<span>ДЕФОЛТ-СИТИ</span></>,
    spb: <>ПИТЕР<span>КУЛЬТУРНО</span></>,
    sochi: <>СОЧИ<span>НА ЮГАХ</span></>,
    ekb: <>ЕКБ<span>УРАЛЬСКИЙ ВАЙБ</span></>,
    kazan: <>КАЗАНЬ<span>ТРЕТЬЯ СТОЛИЦА</span></>
  };

  // --- ФИЛЬТРАЦИЯ ДАННЫХ ---
  // Фильтруем массив в зависимости от выбранных значений
  const filteredCards = cardsData.filter(item => {
    const cityMatch = city === 'all' || item.city === city;
    const catMatch = category === 'all' || item.category === category;
    return cityMatch && catMatch;
  });

  return (
    <div className="app-container">
      <div className="paper-overlay"></div>
      
      {/* КНОПКА НАЗАД */}
      <div className="back-nav">
        <a href="https://lovecouple.ru/" className="back-btn">
          <span className="arrow">←</span> НАЗАД
        </a>
      </div>

      <header>
        <div className="logo">РФ<span>АРХИВ</span></div>
        <div className="city-nav">
          <div className="city-badge">
            <span className="label">LOCATION:</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} id="city-selector">
              <option value="all">ВСЯ РОССИЯ</option>
              <option value="msk">МОСКВА</option>
              <option value="spb">ПИТЕР</option>
              <option value="sochi">СОЧИ</option>
              <option value="ekb">ЕКБ</option>
              <option value="kazan">КАЗАНЬ</option>
            </select>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <h1 id="city-title">{cityNames[city] || cityNames.all}</h1>
          <div className="stamp">КОПИЯ ВЕРНА</div>
        </section>

        {/* ПЕРЕКЛЮЧАТЕЛИ КАТЕГОРИЙ */}
        <nav className="categories">
          {['all', 'bar', 'place', 'event'].map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat === 'all' ? 'ВСЁ СРАЗУ' : cat === 'bar' ? 'ВЫПИТЬ' : cat === 'place' ? 'ГЛЯНУТЬ' : 'ДВИЖ'}
            </button>
          ))}
        </nav>

        {/* СЕТКА КАРТОЧЕК */}
        <div className="zine-grid">
          {filteredCards.map((card, index) => (
            <Card key={index} card={card} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
