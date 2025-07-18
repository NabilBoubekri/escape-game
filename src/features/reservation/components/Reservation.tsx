import React, { useEffect, useState } from 'react';
import type { BaseFormInfo, NewReservation, Session } from '../../shared/types';
import Select from 'react-select';
import type { GroupBase } from 'react-select';
import type { OptionType } from '../../shared/types';
import { customStyles } from '../../shared/customStyes';
import { useNavigate } from 'react-router-dom';

interface ReservationForm extends BaseFormInfo {
  session: string;
  date: string;
  time: string;
  players: number;
  phone: string;
}

export function Reservation() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [formData, setFormData] = useState<ReservationForm>({
    session: '',
    date: '',
    time: '',
    players: 2,
    name: '',
    email: '',
    phone: ''
  });

  useEffect(()=>{
    const fetchSessions = async () =>{
      const res = fetch('/api/v1/sessions');
      const data = await (await res).json();
      setSessions(data);
    }

    fetchSessions();
  }, []);

  const sessionOptions: OptionType[] = sessions.map(s => ({
    value: s.id,
    label: s.title,
  }));

  const selectedSession = sessions.find(s => s.id === formData.session);

  const dateToHoursMap: Record<string, string[]> = {};

  selectedSession?.creneaux.forEach((iso) => {
    const date = new Date(iso).toISOString().split('T')[0];
    const time = new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (!dateToHoursMap[date]) dateToHoursMap[date] = [];
    dateToHoursMap[date].push(time);
  });


  const availableDates = Object.keys(dateToHoursMap);

  const hourOptions: OptionType[] = (formData.date && dateToHoursMap[formData.date])
    ? dateToHoursMap[formData.date].map(h => ({
        value: h,
        label: h
      }))
    : [];



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isoDateTime = `${formData.date}T${formData.time}`;

    const reservationData: NewReservation = {
      email: formData.email,
      sessionId: formData.session,
      creneau: isoDateTime,
      participants: formData.players,
    };

    const res = await fetch('/api/v1/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationData),
    });

    if (res.ok){
      await fetch(`/api/v1/sessions/${formData.session}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creneaux: selectedSession!.creneaux.filter(c => c !== isoDateTime),
        }),
      });
      alert("Reservation réussie !");
      setFormData({ session: '', date: '', time: '', players: 2, name: '', email: '', phone: '' });
      navigate("/");
    }
    else{
      alert("Erreur lors de la réservation");
    }

  }

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
                    options={sessionOptions}
                    required
                    placeholder="Choisissez une session"
                    value={sessionOptions.find((opt) => opt.value === formData.session) || null}
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
                      list="available-dates"
                      className="form-control"
                      id="date"
                      value={formData.date}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (availableDates.includes(val)) {
                          setFormData({ ...formData, date: val });
                        } else {
                          alert("Cette date n’est pas disponible.");
                          setFormData({ ...formData, date: '' });
                        }
                      }}
                      required
                      disabled={!selectedSession}
                    />

                    <datalist id="available-dates">
                      {availableDates.map(date => (
                        <option key={date} value={date} />
                      ))}
                    </datalist>

                  </div>
                  <div className="col-md-6">
                    <label htmlFor="time" className="form-label">Heure</label>
                    <Select<OptionType, false, GroupBase<OptionType>>
                      classNamePrefix="select"
                      styles={customStyles}
                      isSearchable
                      id="time"
                      placeholder={formData.date ? "Choisissez une heure" : "Sélectionnez une date d'abord"}
                      options={hourOptions}
                      required
                      isDisabled={!formData.date}
                      value={hourOptions.find((opt) => opt.value === formData.time) || null}
                      onChange={(selected) => {
                        setFormData({ ...formData, time: selected?.value || '' });
                      }}
                    />

                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="players" className="form-label">Nombre de joueurs ({selectedSession?.participantsMin}-6)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="players"
                    min={selectedSession?.participantsMin}
                    max="6"
                    value={selectedSession?.participantsMin ? selectedSession?.participantsMin: formData.players}
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
                  <button 
                    type="submit" 
                    className="btn btn-danger btn-lg"
                    onClick={handleSubmit}
                  >
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