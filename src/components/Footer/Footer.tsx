import type { JSX } from 'react';

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-dark text-white py-4 w-100 mt-auto position-relative">
      <div className="container-fluid px-0">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-3">
              <h5 className="border-bottom pb-2 text-danger">Réseaux sociaux</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light d-flex align-items-center"><span className="me-2">📘</span> Facebook</a></li>
                <li className="mb-2"><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light d-flex align-items-center"><span className="me-2">📷</span> Instagram</a></li>
                <li className="mb-2"><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light d-flex align-items-center"><span className="me-2">🐦</span> Twitter</a></li>
              </ul>
            </div>

            <div className="col-md-3 mb-3">
              <h5 className="border-bottom pb-2 text-danger">Nos sessions</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="/sessions/horreur-manoir" className="text-light">Le Manoir</a></li>
                <li className="mb-2"><a href="/sessions/apocalypse-zombie" className="text-light">Cimetière de Zombie</a></li>
                <li className="mb-2"><a href="/sessions/asylum" className="text-light">Le parc d'attraction Abandonné</a></li>
                <li className="mb-2"><a href="/sessions/tous" className="text-light">Toutes nos horribles sessions</a></li>
              </ul>
            </div>
            
            <div className="col-md-3 mb-3">
              <h5 className="border-bottom pb-2 text-danger">Informations</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="/mentions-legales" className="text-light">Mentions légales</a></li>
                <li className="mb-2"><a href="/politique-conf" className="text-light">Politique de confidentialité</a></li>
                <li className="mb-2"><a href="/conditions-de-ventes" className="text-light">Conditions Générales de Vente</a></li>
                <li className="mb-2"><a href="/decharge" className="text-light">Décharge de responsabilité</a></li>
              </ul>
            </div>
            
            <div className="col-md-3 mb-3">
              <h5 className="border-bottom pb-2 text-danger">Contact</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="/contact" className="text-light">Formulaire de contact</a></li>
                <li className="mb-2"><a href="tel:+33123456789" className="text-light">01 23 45 67 89</a></li>
                <li className="mb-2"><a href="mailto:contact@maison-horrifique.fr" className="text-light">contact@maison-horrifique.fr</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center pt-3 mt-3 border-top border-secondary">
            <p className="text-muted">&copy; 2025 La Maison Horrifique - ESGI - CONFIDENTIAL</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;