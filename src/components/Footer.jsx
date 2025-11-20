import './Footer.css';
import ClimaWidget from './ClimaWidget';
import React from 'react';

function Footer() {
    return (
        
        <footer className="footer">
            <div className="footer-left">
                <ClimaWidget />
            </div>
            <div className="footer-center">
            <p>Direccion: Antonio Varas 666</p>
            <p>Telefono: +56 9 1234 5678</p>
            <p>Email: test@duocuc.cl</p>
            </div>
            <div className="footer-socials">
                <a href="https://facebook.com" target="_blank">Facebook</a>
                <a href="https://instagram.com" target="_blank">Instagram</a>
                <a href="https://x.com" target="_blank">X</a>
            </div>
        </footer>
    );
}

export default Footer;