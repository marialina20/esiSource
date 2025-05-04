import React from 'react';
import { Link } from 'react-router-dom';

import "./HomaPage.css";
import heroImage from '../images/Home1.png'; 
import aboutImage from '../images/Home2.png';
import { FiEdit } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { RiGroupLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import Navvbartwo from './Navvbartwo';
import AdminManager from'./AdminManager';
const HomePage = () => {
    return (
        <div className="homepage">
            
            <Navvbartwo />
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1><span>ESiSource:</span> Partager vos publications</h1>
                        <p>Publication facile des articles / médias sur les plateformes 
                        de l’École Nationale Supérieure d’Informatique (ESI).</p>
                        <Link to="/post" className="hero-button">
                            Poster <span>→</span>
                        </Link>
                    </div>
                    <div className="hero-image">
                        <img src={heroImage} alt="Illustration de partage de publications" />
                    </div>
                </div>
            </section>

            <section className="options-sectionx">
                <div className="options-containerx">
                    <div className="option">
                        <FiEdit className="option-icon" />
                        <span>Ajout d’articles</span>
                    </div>
                    <div className="option">
                        <HiOutlineDocumentText className="option-icon" />
                        <span>Feedback et planification</span>
                    </div>
                    <div className="option">
                        <MdDashboard className="option-icon" />
                        <span>Tableau de bord</span>
                    </div>
                    <div className="option">
                    <Link to="/AdminManager">
                            <RiGroupLine className="option-icon" />
                            <span>Gestion utilisateurs</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <div className="about-container">
                    <div className="about-image">
                        <img src={aboutImage} alt="Illustration de About Us" />
                    </div>
                    <div className="about-content">
                        <h2>About Us</h2>
                        <p>Welcome to <strong>ESiSource</strong> where we simplify the publication process and foster knowledge sharing within the ESI community.</p>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-logo">
                        <span className="logo-circle"></span>
                        <span className="logo-text">
                                <strong>ESI</strong>Source<span className="dot">.com</span>
                            </span>
                    </div>
                    <div className="footer-contact">
                        <h3>Contact Nous</h3>
                        <p>team@gmail.com</p>
                    </div>
                    <div className="footer-social">
                        <h3>Suis nous</h3>
                        <div className="social-icons">
                            <FaInstagram />
                            <FaFacebook />
                            <FaTwitter />
                            <FaLinkedin />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
