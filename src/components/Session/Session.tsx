import Card from "./Card";

const data = [
  {
    imgUrl:
      "https://lirp.cdn-website.com/1501bd63/dms3rep/multi/opt/ascenseur-escape-game-paris-1920w.jpg",
    title: "L'ASCENSEUR",
    description:
      "Détectives mondialement connus, menez votre enquête sur de mystérieuses disparitions dans un ancien immeuble parisien.",
  },
  {
    imgUrl:
      "https://irp.cdn-website.com/1501bd63/files/uploaded/LE-MUSEE-V3-WEB-04142ff0.png",
    title: "LE MUSÉE",
    description:
      'Incarnez des agents secrets, les "Black King", pour le cambriolage du Diamant Régent dans un musée à la demande d\'un client anonyme. ',
  },
  {
    imgUrl:
      "https://irp.cdn-website.com/1501bd63/files/uploaded/LE-PHARAON-V5-WEB-7d17f94f.png",
    title: "LE PHARAON",
    description:
      "Aventuriers des temps modernes, partez pour l'exploration d'un tombeau égyptien.",
  },
  {
    imgUrl:
      "https://lirp.cdn-website.com/1501bd63/dms3rep/multi/opt/Le+Braquage-poster-6d64d570-1920w.jpg",
    title: "LE BRAQUAGE",
    description:
      "Pour cette mission à haute tension, vous devez réaliser un braquage à l'italienne. Objectif de l'opération : voler des lingots d'or !",
  },
  {
    imgUrl:
      "https://lirp.cdn-website.com/1501bd63/dms3rep/multi/opt/2023-06-28+00_32_39-LE+CRIME+V3.pdf+-+Foxit+PDF+Reader-1920w.jpg",
    title: "LE CRIME",
    description:
      "De l'amour, du drame : commetez le meurtre parfait au sein d'un Hôtel de luxe.",
  },
];

export function Session() {
  return (
    <div className="pb-5">
      <h1 className="text-center mt-5 mb-3">Présentation</h1>
      <p className="text-center container-sm text-muted">
        Découvrez nos sessions d'escape game, où vous pourrez tester vos
        compétences en résolution d'énigmes et en travail d'équipe.
        Plongez dans des univers captivants et résolvez des mystères palpitants
        avec vos amis ou votre famille. Chaque session est conçue pour offrir
        une expérience immersive unique, alliant réflexion, aventure et
        divertissement. Que vous soyez un novice ou un expert, nos sessions
        s'adaptent à tous les niveaux. Préparez-vous à vivre des moments
        inoubliables et à relever des défis passionnants. Réservez dès maintenant
        votre session et embarquez pour une aventure inédite !
      </p>
      <h2 className="text-center">Les Session</h2>
      <p className="text-center">Vous retrouvez ici toutes nos sessions disponibles!</p>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {data.map((session, index) => (
            <div className="col" key={index}>
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
