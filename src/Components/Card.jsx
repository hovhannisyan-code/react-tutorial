const Card = ({title, text, img, imgAlt, active}) => {
    return (
        <div className={`card ${active ? 'active' : ''}`}>
            <img src={img} alt={imgAlt} />
            <h2 className="card-title">{title}</h2>
            <p>{text}</p>
        </div>
    )
}
export default Card;