import React, { useState } from 'react';

import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import "./Upload.css";
import img1 from '../images/Group 15.png';
import img2 from '../images/iconamoon_cloud-add-thin.png';
import NavvbarAjoutArticle from './NavvbarAjoutArticle';

function Upload() {
    const [isConnected, setIsConnected] = useState(true);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const userProfile = {
        name: 'John Doe',
        image: 'https://via.placeholder.com/40',
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        setIsConnected(false);
    };

    const onDrop = (acceptedFiles) => {
        const newFiles = acceptedFiles.map(file => ({
            name: file.name,
            status: 'uploading',
            preview: URL.createObjectURL(file),
        }));

        setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
        setTimeout(() => {
            const updatedFiles = newFiles.map(file => ({
                ...file,
                status: Math.random() > 0.2 ? 'uploaded' : 'failed',
            }));
            setUploadedFiles(prevFiles => prevFiles.map(file => {
                const updatedFile = updatedFiles.find(f => f.name === file.name);
                return updatedFile || file;
            }));
        }, 2000);
    };

    const handleDelete = (fileName) => {
        setUploadedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'application/pdf' });

    const handleShownext = () => {
        /*navigation to the next page */ 
    };

    return (
        <div className="upload-page">
            <NavvbarAjoutArticle />

            <div className="upload-title">
                {/*<img src={img1} alt="Illustration" className="upload-icon" />*/}
                <h2 className="upload-title">Importez votre article</h2>
            </div>

            <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <img src={img2} alt="Upload Icon" className="dropzone-icon" />
                <p>Choisiser un fichier</p>
                
            </div>

            <div className="upload-progress">
                

                {uploadedFiles.map((file, index) => (
                    <div key={index} className={`upload-item ${file.status}`}>
                        <p>{file.name}</p>
                        {file.status === 'uploading' && <progress value="50" max="100" />}
                        {file.status === 'uploaded' && <span className="status uploaded">Importé</span>}
                        {file.status === 'failed' && <span className="status failed">Echoué</span>}
                        <button onClick={() => handleDelete(file.name)} className="delete-btn">Supprimer</button>
                    </div>
                ))}
            </div>

            <button onClick={handleShownext} className="show-next-btn">Next</button>
        </div>
    );
}

export default Upload;
