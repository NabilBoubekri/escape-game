export default function Card({ imgUrl, title, description }: { imgUrl: string; title: string; description: string; }) {
    return (
        <div className="card h-100 shadow-sm">
            <img src={imgUrl} className="card-img-top" alt={title} style={{ objectFit: "cover", height: "200px" }} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
            </div>
        </div>
    );
}