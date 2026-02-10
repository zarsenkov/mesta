import React, { useState } from 'react';
import { cardsData } from './data';

// --- КОМПОНЕНТ ОДИНОЧНОЙ КАРТОЧКИ ---
// Используем функцию для генерации случайного наклона
const CityCard = ({ item, index }) => {
  const rotation = (Math.random() * 4 - 2).toFixed(1) + 'deg';
  
  return (
    <div className="card" style={{ '--r': rotation }}>
      <div className="card-meta">
        <span>{item.city.toUpperCase()} // {item.category.toUpperCase()}</span>
        <span>ID:{1000 + index}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
      <div className="card-address">
        <strong>LOC:</strong> {item.address}
      </div>
      <div className="hint-box">
        "Заметка: {item.hint}"
      </div>
    </div>
  );
};

export default function App() {
  const [activeCity, setActiveCity] = useState('all'); // Стейт для города
  const [activeCat, setActiveCat] = useState('all');   // Стейт для категории

  // Словарь для заголовков
  const cityTitles = {
    all: <>РОССИЯ<span>ПУТЕВОДИТЕЛЬ</span></>,
    msk: <>МОСКВА<span>ДЕФОЛТ-СИТИ</span></>,
    spb: <>ПИТЕР<span>КУЛЬТУРНО</span></>,
    sochi: <>СОЧИ<span>НА ЮГАХ</span></>,
    ekb: <>ЕКБ<span>УРАЛЬСКИЙ ВАЙБ</span></>,
    kazan: <>КАЗАНЬ<span>ТРЕТЬЯ СТОЛИЦА</span></>
  };

  // --- ЛОГИКА ФИЛЬТРАЦИИ ---
  // Оставляем только те карточки, которые подходят под фильтры
  const filteredCards = cardsData.filter(card => {
    const cityMatch = activeCity === 'all' || card.city === activeCity;
    const catMatch = activeCat === 'all' || card.category === activeCat;
    return cityMatch && catMatch;
  });

  return (
    <div className="app-container">
      <div className="paper-overlay"></div>
      
      <div className="back-nav">
        <a href="https://lovecouple.ru/" className="back-btn">← НАЗАД</a>
      </div>

      <header>
        <div className="logo">РФ<span>АРХИВ</span></div>
        <div className="city-nav">
          <div className="city-badge">
            <span style={{fontSize: '0.6rem', fontWeight: 900, color: '#ff0033'}}>LOCATION:</span>
            <select 
              id="city-selector" 
              value={activeCity} 
              onChange={(e) => setActiveCity(e.target.value)}
            >
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
          <h1>{cityTitles[activeCity] || cityTitles.all}</h1>
          <div className="stamp">КОПИЯ ВЕРНА</div>
        </section>

        <nav className="categories">
          {[
            { id: 'all', label: 'ВСЁ СРАЗУ' },
            { id: 'bar', label: 'ВЫПИТЬ' },
            { id: 'place', label: 'ГЛЯНУТЬ' },
            { id: 'event', label: 'ДВИЖ' }
          ].map(cat => (
            <button 
              key={cat.id}
              className={`filter-btn ${activeCat === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCat(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        <div className="zine-grid">
          {filteredCards.map((item, index) => (
            <CityCard key={index} item={item} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
