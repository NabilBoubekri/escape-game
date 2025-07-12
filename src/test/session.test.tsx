import { afterEach, beforeAll, describe, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { server } from "./server";
import { http, HttpResponse } from "msw";
import { Session } from "../features/session/components/Session";

describe("Session", () => {
  afterEach(() => cleanup());

  beforeAll(() => {
    server.use(
      http.get("*/escape-game/api/v1/sessions", () => {
        return HttpResponse.json([
          {
            id: 1,
            imgUrl:
              "https://lirp.cdn-website.com/1501bd63/dms3rep/multi/opt/ascenseur-escape-game-paris-1920w.jpg",
            title: "L'ASCENSEUR",
            description:
              "Détectives mondialement connus, menez votre enquête sur de mystérieuses disparitions dans un ancien immeuble parisien.",
          },
          {
            id: 2,
            imgUrl:
              "https://irp.cdn-website.com/1501bd63/files/uploaded/LE-MUSEE-V3-WEB-04142ff0.png",
            title: "LE MUSÉE",
            description:
              'Incarnez des agents secrets, les "Black King", pour le cambriolage du Diamant Régent dans un musée à la demande d\'un client anonyme.',
          },
          {
            id: 3,
            imgUrl:
              "https://irp.cdn-website.com/1501bd63/files/uploaded/LE-PHARAON-V5-WEB-7d17f94f.png",
            title: "LE PHARAON",
            description:
              "Aventuriers des temps modernes, partez pour l'exploration d'un tombeau égyptien.",
          },
        ]);
      })
    );
    server.listen();
  });

  it("should render header and description", () => {
    render(<Session />);
    screen.getByText("Les Sessions");
    screen.getByText("Vous retrouvez ici toutes nos sessions disponibles!");
  });

  it("should display fetched sessions", async () => {
    render(<Session />);
    await screen.findByText("L'ASCENSEUR");
    await screen.findByText("LE MUSÉE");
    await screen.findByText("Détectives mondialement connus, menez votre enquête sur de mystérieuses disparitions dans un ancien immeuble parisien.");
    await screen.findByText("Incarnez des agents secrets, les \"Black King\", pour le cambriolage du Diamant Régent dans un musée à la demande d'un client anonyme.");
  });
});