import { useState } from 'react';

interface ReservationForm {
  session: string;
  date: string;
  time: string;
  players: number;
  name: string;
  email: string;
  phone: string;
}

export function Reservation() {
  const [formData, setFormData] = useState<ReservationForm>({
    session: '',
    date: '',
    time: '',
    players: 2,
    name: '',
    email: '',
    phone: ''
  });

  return (
    <div className="container py-5 animate-fade-in">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-dark text-light shadow-lg">
            <div className="card-header bg-danger text-white">
              <h2 className="text-center mb-0">Réserver votre session</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="session" className="form-label">Session</label>
                  <select 
                    className="form-select"
                    id="session"
                    value={formData.session}
                    onChange={(e) => setFormData({...formData, session: e.target.value})}
                    required
                  >
                    <option value="">Choisissez une session</option>
                    <option value="ascenseur">L'ASCENSEUR</option>
                    <option value="musee">LE MUSÉE</option>
                    <option value="pharaon">LE PHARAON</option>
                    <option value="braquage">LE BRAQUAGE</option>
                    <option value="crime">LE CRIME</option>
                  </select>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="time" className="form-label">Heure</label>
                    <select
                      className="form-select"
                      id="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      required
                    >
                      <option value="">Choisissez un horaire</option>
                      <option value="10:00">10:00</option>
                      <option value="11:30">11:30</option>
                      <option value="14:00">14:00</option>
                      <option value="15:30">15:30</option>
                      <option value="17:00">17:00</option>
                      <option value="18:30">18:30</option>
                      <option value="20:00">20:00</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="players" className="form-label">Nombre de joueurs (2-6)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="players"
                    min="2"
                    max="6"
                    value={formData.players}
                    onChange={(e) => setFormData({...formData, players: parseInt(e.target.value)})}
                    required
                  />
                </div>

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

                <div className="mb-4">
                  <label htmlFor="phone" className="form-label">Téléphone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-danger btn-lg">
                    Réserver maintenant
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}