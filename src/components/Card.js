function Card({ card, onClick }) {

    const handleCardClick = () => {
        onClick(card);
    }

    return (
        <article className="card">
            <button type="button" className="card__delete"></button>
            <img className="card__photo" alt={card.name} src={card.link} onClick={handleCardClick}/>
            <div className="card__lists">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-box">
                    <button type="button" className="card__like"></button>
                    <p className="card__like-numb">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;
