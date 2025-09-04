import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p>Direccion: Antonio Varas 666</p>
            <p>Telefono: +56 9 1234 5678</p>
            <p>Email: test@duocuc.cl</p>
            <div className="socials">
                <a href="https://facebook.com" target="_blank">Facebook</a>
                <a href="https://instagram.com" target="_blank">Instagram</a>
                <a href="https://x.com" target="_blank">X</a>
            </div>
        </footer>
    );
}

export default Footer;