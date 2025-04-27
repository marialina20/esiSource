import React, { useState } from 'react';
import NavvbarAjoutArticle from './NavvbarAjoutArticle';
import { useNavigate } from 'react-router-dom';
import './AjoutArticle.css';
import addMediaIcon from '../images/add_media_icon.png';

const AjoutArticle = () => {
    const [article, setArticle] = useState('');
    const [selectedOption, setSelectedOption] = useState('Site web');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date()); //  point de départ pour les jours affichés

    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const today = new Date();

    // Fonction pour obtenir 7 jours à partir de startDate
    const getNextDays = () => {
        let dates = [];
        for (let i = 0; i < 7; i++) {
            const newDate = new Date(startDate);
            newDate.setDate(startDate.getDate() + i);
            dates.push(newDate);
        }
        return dates;
    };

    const nextDays = getNextDays();

    const navigate = useNavigate();

    const isSameDay = (date1, date2) => {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    };

    return (
        <>
            <NavvbarAjoutArticle />
            <div className="ajout-article-container">
                {/* Partie gauche : Écriture de l'article */}
                <div className="article-left">
                    <h2>✏️ creer votre article</h2>
                    <div className="textarea-container">
                        <textarea
                            value={article}
                            onChange={(e) => setArticle(e.target.value)}
                            placeholder="ecrivez votre article ici ..."
                        />
                        {/* Icône d'ajout de média en bas à droite */}
                        <label className="upload-icon">
                            <input type="file" accept="image/*, video/*" style={{ display: 'none' }} />
                            <img src={addMediaIcon} alt="Ajouter un média" />
                        </label>
                    </div>
                </div>

                {/* Partie droite : Options de publication */}
                <div className="article-right">
                    <div className="options">
                        <label>
                            <input
                                type="radio"
                                name="publication"
                                value="Site web"
                                checked={selectedOption === 'Site web'}
                                onChange={() => setSelectedOption('Site web')}
                            />
                            <span>Site web</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="publication"
                                value="Page Facebook"
                                checked={selectedOption === 'Page Facebook'}
                                onChange={() => setSelectedOption('Page Facebook')}
                            />
                            <span>Page Facebook</span>
                        </label>
                    </div>

                    {/* Calendrier de sélection de date */}
                    <div className="calendar-container">
                        <button onClick={() => setStartDate(prev => {
                            const newStart = new Date(prev);
                            newStart.setDate(prev.getDate() - 1);
                            return newStart;
                        })}>
                            ◀
                        </button>
                        {nextDays.map((date, index) => (
                            <div
                                key={index}
                                className={`day-box 
                                    ${isSameDay(date, selectedDate) ? 'selected' : ''}
                                    ${isSameDay(date, today) && !isSameDay(selectedDate, today) ? 'today' : ''}`
                                }
                                onClick={() => setSelectedDate(date)}
                            >
                                <span>{days[date.getDay()]}</span>
                                <span>{date.getDate()}</span>
                            </div>
                        ))}
                        <button onClick={() => setStartDate(prev => {
                            const newStart = new Date(prev);
                            newStart.setDate(prev.getDate() + 1);
                            return newStart;
                        })}>
                            ▶
                        </button>
                    </div>

                    {/* Boutons */}
                    {/*<button className="search-btn">Rechercher les trains</button>*/}
                    <button className="submit-btn">Submit</button>
                </div>
            </div>
        </>
    );
};

export default AjoutArticle;
