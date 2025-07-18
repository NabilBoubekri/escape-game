import { http, HttpResponse } from "msw";
import type { LoginRequest, Session, Reservation, NewReservation } from '../features/shared/types'

let sessions: Session[] = [
  {
    id: "1",
    theme: "Enquête",
    duree: 60,
    prix: 28,
    participantsMin: 2,
    creneaux: ["2024-07-14T18:00", "2024-07-15T20:00"],
    imgUrl: "https://lirp.cdn-website.com/1501bd63/dms3rep/multi/opt/ascenseur-escape-game-paris-1920w.jpg",
    title: "L'ASCENSEUR",
    description: "Détectives mondialement connus, menez votre enquête sur de mystérieuses disparitions dans un ancien immeuble parisien."
  },
  {
    id: "2",
    theme: "Cambriolage",
    duree: 60,
    prix: 30,
    participantsMin: 3,
    creneaux: ["2024-07-16T19:00", "2024-07-17T21:00"],
    imgUrl: "https://irp.cdn-website.com/1501bd63/files/uploaded/LE-MUSEE-V3-WEB-04142ff0.png",
    title: "LE MUSÉE",
    description: 'Incarnez des agents secrets, les "Black King", pour le cambriolage du Diamant Régent dans un musée à la demande d\'un client anonyme.'
  },
  {
    id: "3",
    theme: "Aventure",
    duree: 75,
    prix: 32,
    participantsMin: 2,
    creneaux: ["2024-07-18T17:00", "2024-07-19T20:00"],
    imgUrl: "https://irp.cdn-website.com/1501bd63/files/uploaded/LE-PHARAON-V5-WEB-7d17f94f.png",
    title: "LE PHARAON",
    description: "Aventuriers des temps modernes, partez pour l'exploration d'un tombeau égyptien."
  },
  {
    id: "4",
    theme: "Action",
    duree: 60,
    prix: 29,
    participantsMin: 3,
    creneaux: ["2024-07-20T18:30", "2024-07-21T20:30"],
    imgUrl: "https://lirp.cdn-website.com/1501bd63/dms3rep/multi/opt/Le+Braquage-poster-6d64d570-1920w.jpg",
    title: "LE BRAQUAGE",
    description: "Pour cette mission à haute tension, vous devez réaliser un braquage à l'italienne. Objectif de l'opération : voler des lingots d'or !"
  },
  {
    id: "5",
    theme: "Crime",
    duree: 60,
    prix: 27,
    participantsMin: 2,
    creneaux: ["2024-07-22T19:00", "2024-07-23T21:00"],
    imgUrl: "https://lirp.cdn-website.com/1501bd63/dms3rep/multi/opt/2023-06-28+00_32_39-LE+CRIME+V3.pdf+-+Foxit+PDF+Reader-1920w.jpg",
    title: "LE CRIME",
    description: "De l'amour, du drame : commetez le meurtre parfait au sein d'un Hôtel de luxe."
  }
];

let reservations: Reservation[] = [];

let employeConnecte = false;

export const handlers = [
  http.get("*/api/v1/sessions", () => {
    return HttpResponse.json(sessions);
  }),

  http.post("*/api/v1/login", async ({ request }) => {
    const { email, password } = await request.json() as LoginRequest;
    if (email === "admin@gmail.com" && password === "admin") {
      employeConnecte = true;
      return HttpResponse.json({ success: true, role: "admin" });
    }
    return HttpResponse.json({ success: false }, { status: 401 });
  }),

  http.get("*/api/v1/is-auth", () => {
    return HttpResponse.json({ isAuthenticated: employeConnecte });
  }),

  http.post("*/api/v1/sessions", async ({ request }) => {
    if (!employeConnecte)
      return HttpResponse.json({ error: "Non autorisé" }, { status: 403 });
    const session = await request.json() as Session;
    session.id = crypto.randomUUID();
    sessions.push(session);
    return HttpResponse.json(session);
  }),

  http.put("*/api/v1/sessions/:id", async ({ params, request }) => {
    const { id } = params;
    const data = await request.json() as Partial<Session>;
    sessions = sessions.map((s) => (s.id === id ? { ...s, ...data } : s));
    return HttpResponse.json({ success: true, sessions });
  }),

  http.delete("*/api/v1/sessions/:id", ({ params }) => {
    if (!employeConnecte)
      return HttpResponse.json({ error: "Non autorisé" }, { status: 403 });
    const { id } = params;
    sessions = sessions.filter((s) => s.id !== id);
    return HttpResponse.json({ success: true });
  }),

  http.post("*/api/v1/reservations", async ({ request }) => {
    const data = await request.json() as NewReservation;
    reservations.push({ id: crypto.randomUUID(), ...data });
    return HttpResponse.json({ success: true });
  }),

  http.get("*/api/v1/reservations", () => {
    if (!employeConnecte)
      return HttpResponse.json({ error: "Non autorisé" }, { status: 403 });
    return HttpResponse.json(reservations);
  }),

  http.delete("*/api/v1/reservations/:id", ({ params }) => {
    if (!employeConnecte)
      return HttpResponse.json({ error: "Non autorisé" }, { status: 403 });
    const { id } = params;
    reservations = reservations.filter((r) => r.id !== id);
    return HttpResponse.json({ success: true });
  }),
];
