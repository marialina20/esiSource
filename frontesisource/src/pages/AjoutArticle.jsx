import React, { useState } from 'react';
import NavvbarAjoutArticle from './NavvbarAjoutArticle';
import { useNavigate } from 'react-router-dom';
import './AjoutArticle.css';
import addMediaIcon from '../images/add_media_icon.png';
import axios from 'axios'; // Nouvelle importation pour les requêtes API

const AjoutArticle = () => {
    const [article, setArticle] = useState('');
    const [selectedOption, setSelectedOption] = useState('siteWeb'); // Changé pour correspondre aux choix du modèle
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date()); //  point de départ pour les jours affichés
    const [mediaFiles, setMediaFiles] = useState([]); // Pour stocker les fichiers médias
    const [isSubmitting, setIsSubmitting] = useState(false); // État pour le bouton de soumission

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

    // Nouvelle fonction pour gérer l'upload de fichiers
    const handleFileChange = (e) => {
        if (e.target.files) {
            setMediaFiles([...mediaFiles, ...Array.from(e.target.files)]);
        }
    };

    // Nouvelle fonction pour soumettre le formulaire
    const handleSubmit = async () => {
        if (!article.trim()) {
            alert("Veuillez écrire un article avant de soumettre");
            return;
        }

        setIsSubmitting(true);

        try {
            // Créer un objet FormData pour envoyer les données et les fichiers
            const formData = new FormData();
            formData.append('contenu', article);
            formData.append('type', selectedOption); // Changé type_publication en type
            
            // Formater la date avec heure pour correspondre à DateTimeField
            const dateTime = new Date(selectedDate);
            // Format ISO pour Django: YYYY-MM-DDTHH:MM:SS
            formData.append('date_planifiee', dateTime.toISOString()); // Changé date_publication en date_planifiee
            
            formData.append('statut', 'en_attente'); // Utilisez le statut par défaut ou choisissez parmi les options

            // Ajouter les fichiers médias s'il y en a
            mediaFiles.forEach((file) => {
                formData.append('media_files', file);
            });

            // Configuration pour inclure les tokens d'authentification (si nécessaire)
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Décommentez la ligne suivante si vous utilisez JWT
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            };

            // Envoyer la requête POST à l'API
            const response = await axios.post('http://localhost:8000/api/publications/', formData, config);
            
            alert('Publication soumise avec succès!');
            navigate('/publications'); // Ajustez ce chemin selon votre structure de routes
        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
            alert('Erreur lors de la soumission de la publication. Veuillez réessayer.');
        } finally {
            setIsSubmitting(false);
        }
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
                            <input 
                                type="file" 
                                accept="image/*, video/*" 
                                style={{ display: 'none' }} 
                                onChange={handleFileChange}
                                multiple
                            />
                            <img src={addMediaIcon} alt="Ajouter un média" />
                        </label>
                    </div>
                    
                    {/* Affichage des fichiers sélectionnés */}
                    {mediaFiles.length > 0 && (
                        <div className="selected-files">
                            <h4>Fichiers sélectionnés:</h4>
                            <ul>
                                {mediaFiles.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Partie droite : Options de publication */}
                <div className="article-right">
                    <div className="options">
                        <label>
                            <input
                                type="radio"
                                name="publication"
                                value="siteWeb"
                                checked={selectedOption === 'siteWeb'}
                                onChange={() => setSelectedOption('siteWeb')}
                            />
                            <span>Site web</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="publication"
                                value="pageFacebook"
                                checked={selectedOption === 'pageFacebook'}
                                onChange={() => setSelectedOption('pageFacebook')}
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

                    <button className="search-btn">Rechercher les trains</button>
                    <button 
                        className="submit-btn"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Envoi en cours...' : 'Submit'}
                    </button>

                    {/*<button className="search-btn">Rechercher les trains</button>*/}
                    <button className="submit-btn">Submit</button>
                </div>
            </div>
        </>
    );
};

export default AjoutArticle;