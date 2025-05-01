import React, { useState } from 'react';
import Navvbartwo from './Navvbartwo';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import './AdminManager.css';

const AdminManager = () => {
    // State for the list of users
    const [users, setUsers] = useState([
        { id: 1, username: 'Walaa', name: 'Walaa', surname: 'Beltreche', email: 'In_beltreche@esi.dz' },
        { id: 2, username: 'NHADbell', name: 'NHAD', surname: 'Beltreche', email: 'In_beltreche@esi.dz' },
        { id: 3, username: 'Walaa', name: 'Walaa', surname: 'Beltreche', email: 'In_beltreche@esi.dz' },
        { id: 4, username: 'NHADbell', name: 'NHAD', surname: 'Beltreche', email: 'In_beltreche@esi.dz' },
        { id: 5, username: 'Walaa', name: 'Walaa', surname: 'Beltreche', email: 'In_beltreche@esi.dz' },
        { id: 6, username: 'Maria', name: 'Maria', surname: 'Beltreche', email: 'In_beltreche@esi.dz' },
        { id: 7, username: 'Douae', name: 'Douae', surname: 'Beltreche', email: 'In_beltreche@esi.dz' },

    ]);

    // State for controlling the modal visibility and mode (add or edit)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentUserId, setCurrentUserId] = useState(null); // Track the user being edited

    // State for the form fields in the modal
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        surname: '',
        email: '',
        phone: '',
        password: '',
    });

    // Function to handle deleting a user
    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    // Function to open the modal in "add" mode
    const openAddModal = () => {
        setModalMode('add');
        setFormData({
            username: '',
            name: '',
            surname: '',
            email: '',
            phone: '',
            password: '',
        });
        setIsModalOpen(true);
    };

    // Function to open the modal in "edit" mode with pre-filled data
    const handleEdit = (id) => {
        const userToEdit = users.find(user => user.id === id);
        if (userToEdit) {
            setModalMode('edit');
            setCurrentUserId(id);
            setFormData({
                username: userToEdit.username,
                name: userToEdit.name,
                surname: userToEdit.surname,
                email: userToEdit.email,
                phone: '',
                password: '',
            });
            setIsModalOpen(true);
        }
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentUserId(null);
        setFormData({
            username: '',
            name: '',
            surname: '',
            email: '',
            phone: '',
            password: '',
        });
    };

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Function to handle form submission (add or edit user)
    const handleSubmit = () => {
        if (!formData.username || !formData.name || !formData.surname || !formData.email || !formData.phone || !formData.password) {
            alert('Please fill in all fields.');
            return;
        }

        if (modalMode === 'add') {
            // Add new user
            const newUser = {
                id: users.length ? users[users.length - 1].id + 1 : 1,
                username: formData.username,
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
            };
            setUsers([...users, newUser]);
        } else if (modalMode === 'edit' && currentUserId !== null) {
            // Edit existing user
            setUsers(users.map(user =>
                user.id === currentUserId
                    ? {
                        ...user,
                        username: formData.username,
                        name: formData.name,
                        surname: formData.surname,
                        email: formData.email,
                    }
                    : user
            ));
        }

        closeModal();
    };

    return (
        <div className="admin-manager-pagee" >
            <div className="admin-manager-page">
                <Navvbartwo />
                <div className="header">
                    <h1>Bienvenue dans la gestion des utilisateurs</h1>
                    <p>Consulter et gérer les utilisateurs</p>
                    <button className="add-user-btn" onClick={openAddModal}>
                        Ajouter un utilisateur
                    </button>
                </div>

                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h2>{modalMode === 'add' ? 'Ajouter un utilisateur' : 'Modifier un utilisateur'}</h2>
                                <p>
                                    {modalMode === 'add'
                                        ? 'Remplissez les champs ci-dessous pour ajouter un nouvel utilisateur.'
                                        : 'Modifiez les champs ci-dessous pour mettre à jour l\'utilisateur.'}
                                </p>
                                <button className="close-btn" onClick={closeModal}>×</button>
                            </div>
                            <div className="modal-body">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="NHADbell"
                                />
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="NHAD"
                                />
                                <label>Surname</label>
                                <input
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleInputChange}
                                    placeholder="Beltreche"
                                />
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="In_beltreche@esi.dz"
                                />
                                <label>Phone number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="0550555555"
                                />
                                <label>{modalMode === 'add' ? 'Set a password' : 'Reset password'}</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                />
                                {formData.password && (
                                    <span className="password-feedback">✓ Good password</span>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="save-btn" onClick={handleSubmit}>
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>&nbsp;UserName</th>
                            <th>&nbsp;&nbsp;Name</th>
                            <th>&nbsp;&nbsp;Surname</th>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email</th>
                            <th>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        className="action-btn edit-btn"
                                        onClick={() => handleEdit(user.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-logo">
                        <span className="logo-circle"></span>
                        <span className="logo-text">
                            ESISource.com
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

export default AdminManager;