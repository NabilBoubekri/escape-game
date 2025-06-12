import { useState } from 'react';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  return (
    <div className="container py-5 animate-fade-in">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-dark text-light shadow-lg">
            <div className="card-header bg-danger text-white">
              <h2 className="text-center mb-0">Contactez-nous</h2>
            </div>
            <div className="card-body">
              <div className="mb-4 text-center">
                <p className="lead">
                  Une question ? Une suggestion ? N'hésitez pas à nous contacter !
                </p>
              </div>

              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nom complet</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Sujet</label>
                  <select
                    className="form-select"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  >
                    <option value="">Choisissez un sujet</option>
                    <option value="reservation">Question sur une réservation</option>
                    <option value="information">Demande d'information</option>
                    <option value="reclamation">Réclamation</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  ></textarea>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-danger btn-lg">
                    Envoyer le message
                  </button>
                </div>
              </form>
            </div>

            <div className="card-footer text-light">
              <div className="row text-center mt-3">
                <div className="col-md-4 mb-3">
                  <p className="mb-0">01 23 45 67 89</p>
                </div>
                <div className="col-md-4 mb-3">
                  <p className="mb-0">contact@maison-horrifique.fr</p>
                </div>
                <div className="col-md-4 mb-3">
                  <p className="mb-0">123 Rue de l'Horreur, Paris</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}