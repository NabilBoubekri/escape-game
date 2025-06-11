import type { JSX } from "react";
import "../../assets/styles/Footer.css";

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-dark text-white py-4 w-100 footer">
      <div className="container-fluid px-0">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-3">
              <h5 className="border-bottom pb-2 text-white">
                Réseaux sociaux
              </h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light d-flex align-items-center"
                  >
                    Facebook
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light d-flex align-items-center"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-3">
              <h5 className="border-bottom pb-2 text-white">Nos sessions</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="/sessions/lascenseur" className="text-light">
                    L'ASCENSEUR
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/sessions/le-musee" className="text-light">
                    LE MUSÉE
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/sessions/le-pharaon" className="text-light">
                    LE PHARAON
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/sessions/tous" className="text-light">
                    Toutes nos horribles sessions...
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-3">
              <h5 className="border-bottom pb-2 text-white">Informations</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="/mentions-legales" className="text-light">
                    Mentions légales
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/politique-conf" className="text-light">
                    Politique de confidentialité
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/conditions-de-ventes" className="text-light">
                    Conditions Générales de Vente
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/decharge" className="text-light">
                    Décharge de responsabilité
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-3">
              <h5 className="border-bottom pb-2 text-white">Contact</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="/contact" className="text-light">
                    Formulaire de contact
                  </a>
                </li>
                <li className="mb-2">
                  <a href="tel:+33123456789" className="text-light">
                    01 23 45 67 89
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="mailto:contact@maison-horrifique.fr"
                    className="text-light"
                  >
                    contact@maison-horrifique.fr
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-3 mt-3 border-top border-secondary">
            <p className="text-white mb-0">
              &copy; 2025 La Maison Horrifique - ESGI - CONFIDENTIAL
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
