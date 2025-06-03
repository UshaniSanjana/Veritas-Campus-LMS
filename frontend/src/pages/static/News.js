import React from "react";
import '../../css/News.css';
//import newsFleet from '../../assets/news-fleet.png';
import convocationImage from '../../assets/convocation-image.png';
import sportImage from '../../assets/sport-image.png';

const newsData = [
  {
    title: 'VERITAS Convocation Day',
    date: '2025 Jan 12',
    image: convocationImage,
  },
  {
    title: 'VERITAS Sports Day',
    date: '2025 Jan 2',
    image: sportImage,
  },
  {
    title: 'VERITAS Convocation Day',
    date: '2025 Jan 12',
    image: convocationImage,
  },
  {
    title: 'VERITAS Sports Day',
    date: '2025 Jan 2',
    image: sportImage,
  },
  {
    title: 'VERITAS Convocation Day',
    date: '2025 Jan 12',
    image: convocationImage,
  },
  {
    title: 'VERITAS Sports Day',
    date: '2025 Jan 2',
    image: sportImage,
  },
];

const News = () => {
  return (
    <div className="news-page">
      <div className="news-header">
        <h1>NEWS & EVENTS OF VERITAS</h1>
        <p><center>
        Stay in the loop with all the latest happenings, exciting announcements, and upcoming events. This is your go-to space  for fresh updates, important news, and everything buzzing in our world. Don’t miss out—explore what’s new and stay connected with us
        </center></p>
      </div>
      <div className="latest-news">
        <h2 className="section-title">LATEST NEWS</h2>
        <div className="search-filter">
          <input type="text" placeholder="🔍 Search ..." />
          <select>
            <option>Filter By Date...</option>
          </select>
        </div>
        <div className="news-grid">
          {newsData.map((item, index) => (
            <div key={index} className="news-card">
              <img src={item.image} alt={item.title} />
              <div className="news-info">
                <h3>{item.title}</h3>
                <p>{item.date}</p>
                <button>Read more</button>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <span>«</span>
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <span key={n} className={n === 2 ? 'active' : ''}>{n}</span>
          ))}
          <span>»</span>
        </div>
      </div>
    </div>
  );
};

export default News;
