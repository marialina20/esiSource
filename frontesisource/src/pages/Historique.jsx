import React, { useState } from 'react';
import NavvbarAjoutArticle from './NavvbarAjoutArticle';
import './Historique.css';

const Historique = () => {
    // State for the list of articles
    const [articles, setArticles] = useState([
        { id: 1, title: 'Article1', date: '15/02/2025', status: 'En cours' },
        { id: 2, title: 'Article2', date: '15/02/2025', status: 'En cours' },
        { id: 3, title: 'Article2', date: '15/02/2025', status: 'En cours' },
        { id: 4, title: 'Article2', date: '15/02/2025', status: 'En cours' },
        { id: 5, title: 'Article2', date: '19/02/2025', status: 'Acceptée' },
        { id: 6, title: 'Article2', date: '15/02/2025', status: 'Acceptée' },
        { id: 7, title: 'Article2', date: '18/02/2025', status: 'Acceptée' },
    ]);

    // Function to handle deleting an article
    const handleDelete = (id) => {
        setArticles(articles.filter(article => article.id !== id));
    };

    return (
        <div className="historique-page">
            <NavvbarAjoutArticle />
            <h1 className="page-title">Suivez vos articles</h1>
            <div className="articles-label">Articles</div>
            <table className="article-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titre</th>
                        <th>Date</th>
                        <th>État</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (
                        <tr key={article.id}>
                            <td>{article.id}</td>
                            <td>{article.title}</td>
                            <td>{article.date}</td>
                            <td>{article.status}</td>
                            <td>
                                <button
                                    className="action-btn delete-btn"
                                    onClick={() => handleDelete(article.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Historique;