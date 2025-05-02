import React, { useState } from 'react';
import NavvbarAjoutArticle from './NavvbarAjoutArticle';
import { useNavigate } from 'react-router-dom';
import './AjoutArticle.css';
import addMediaIcon from '../images/add_media_icon.png';
import axios from 'axios';

const AjoutArticle = () => {
    const [article, setArticle] = useState('');
    const [selectedOption, setSelectedOption] = useState('siteWeb');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [mediaFiles, setMediaFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Fonction pour gérer l'upload de fichiers
    const handleFileChange = (e) => {
        if (e.target.files) {
            setMediaFiles([...mediaFiles, ...Array.from(e.target.files)]);
        }
    };

    // Fonction pour soumettre le formulaire
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
            formData.append('type', selectedOption);
            
            // Formater la date avec heure pour correspondre à DateTimeField
            const dateTime = new Date(selectedDate);
            formData.append('date_planifiee', dateTime.toISOString());
            
            formData.append('statut', 'en_attente');

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
            setLastPublication(response.data);
        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
            alert('Erreur lors de la soumission de la publication. Veuillez réessayer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const [lastPublication, setLastPublication] = useState(null);

    return (
        <>
            <NavvbarAjoutArticle />
            <div className="ajout-article-container">
                <h2 className="title">Créer votre article</h2>
        
                <div className="article-body">
                    <div className="editor">
                        {/* Affichage des médias sélectionnés */}
                        
                        <textarea
                            value={article}
                            onChange={(e) => setArticle(e.target.value)}
                            placeholder="Écrivez votre article ici ..."
                        />
                        {mediaFiles.length > 0 && (
                            <div className="media-preview">
                                <h4>Fichiers sélectionnés :</h4>
                                <div className="media-files">
                                    {mediaFiles.map((file, index) => (
                                        <div key={index} className="media-item">
                                            {file.type.startsWith('image/') && (
                                                <img src={URL.createObjectURL(file)} alt={`media-${index}`} width="150" />
                                            )}
                                            {file.type.startsWith('video/') && (
                                                <video width="150" controls>
                                                    <source src={URL.createObjectURL(file)} type="video/mp4" />
                                                </video>
                                            )}
                                            {!file.type.startsWith('image/') && !file.type.startsWith('video/') && (
                                                <p>Média non supporté</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
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
        
                    <div className="right-panel">
                        <div className="publication-type">
                            <label className={selectedOption === 'siteWeb' ? 'selected' : ''}>
                                <input
                                    type="radio"
                                    name="publication"
                                    value="siteWeb"
                                    checked={selectedOption === 'siteWeb'}
                                    onChange={() => setSelectedOption('siteWeb')}
                                />
                                Site web
                            </label>
                            <label className={selectedOption === 'pageFacebook' ? 'selected' : ''}>
                                <input
                                    type="radio"
                                    name="publication"
                                    value="pageFacebook"
                                    checked={selectedOption === 'pageFacebook'}
                                    onChange={() => setSelectedOption('pageFacebook')}
                                />
                                Page Facebook
                            </label>
                        </div>
        
                        <div className="calendar-nav">
                            <button onClick={() => setStartDate(prev => {
                                const newStart = new Date(prev);
                                newStart.setDate(prev.getDate() - 1);
                                return newStart;
                            })}>❮</button>
        
                            {nextDays.map((date, index) => (
                                <div
                                    key={index}
                                    className={`calendar-day ${isSameDay(date, selectedDate) ? 'active' : ''}`}
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
                            })}>❯</button>
                        </div>
        
                        <button 
                            className="submit-button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Envoi en cours...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
            {lastPublication && (
                <div className="publication-preview">
                    <h3>Publication soumise :</h3>
                    <p>{lastPublication.contenu}</p>
        
                    {lastPublication.medias.map((media, index) => {
                        if (media.type === 'image') {
                            return <img key={index} src={media.url} alt={`media-${index}`} width="250" />;
                        } else if (media.type === 'video') {
                            return (
                                <video key={index} width="320" controls>
                                    <source src={media.url} type="video/mp4" />
                                </video>
                            );
                        } else {
                            return <p key={index}>Média non supporté</p>;
                        }
                    })}
                </div>
            )}
        </>
    );
};

export default AjoutArticle;
