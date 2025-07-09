import { useEffect, useState } from "react";
import Card from "./Card";

export function Session() {
  const [sessions, setSessions] = useState<{ id: number; imgUrl: string; title: string; description: string; }[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("escape-game/api/v1/sessions");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setSessions(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="pb-5 animate-fade-in">
      <h2 className="text-center">Les Sessions</h2>
      <p className="text-center">Vous retrouvez ici toutes nos sessions disponibles!</p>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {sessions.map((session) => (
            <div className="col" key={session.id}>
              <Card
                imgUrl={session.imgUrl.toString()}
                title={session.title}
                description={session.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
