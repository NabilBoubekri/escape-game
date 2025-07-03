import { useState } from 'react';
import type { BaseFormInfo } from '../../shared/types';
import Select from 'react-select';
import type { GroupBase } from 'react-select';
import type { OptionType } from '../../shared/types';
import { customStyles } from '../../shared/customStyes';

interface ReservationForm extends BaseFormInfo {
  session: string;
  date: string;
  time: string;
  players: number;
  phone: string;
}


const options: OptionType[] = [
  { value: 'ascenseur', label: "L'ASCENSEUR" },
  { value: 'musee', label: 'LE MUSÉE' },
  { value: 'pharaon', label: 'LE PHARAON' },
  { value: 'braquage', label: 'LE BRAQUAGE' },
  { value: 'crime', label: 'LE CRIME' },
];

const hoursOptions: OptionType[] = [
  { value: '10:00', label: '10:00' },
  { value: '11:30', label: '11:30' },
  { value: '14:00', label: '14:00' },
  { value: '15:30', label: '15:30' },
  { value: '17:00', label: '17:00' },
  { value: '18:30', label: '18:30' },
  { value: '20:00', label: '20:00' },
];

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
                  <Select<OptionType, false, GroupBase<OptionType>>
                    classNamePrefix="select"
                    styles={customStyles}
                    isSearchable
                    name="session"
                    options={options}
                    required
                    placeholder="Choisissez une session"
                    value={options.find((opt) => opt.value === formData.session) || null}
                    onChange={(selected) => {
                      setFormData({ ...formData, session: selected?.value || '' });
                    }}
                  />
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
                    <Select<OptionType, false, GroupBase<OptionType>>
                      classNamePrefix="select"
                      styles={customStyles}
                      isSearchable
                      id="time"
                      placeholder="Choisissez une heure"
                      options={hoursOptions}
                      required
                      value={hoursOptions.find((opt) => opt.value === formData.time) || null}
                      onChange={(selected) => {
                        setFormData({ ...formData, time: selected?.value || '' });
                      }}
                    />
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