function ImagePopup({card, onClose, onClickClose}) {
    return (
        <article
            className={`popup popup_type_image popup_opacity ${card != null ? 'popup_opened' : ''}`}
            onMouseUp={onClickClose}
        >
            <div className="popup__container">
                <figure className="popup__figure">
                    <img src={card != null ? card.link : "#"} alt="фотография" className="popup__photo"/>
                    <figcaption className="popup__caption"></figcaption>
                </figure>
                <button className="popup__close" type="button" onClick={onClose}></button>
            </div>
        </article>
    );
}

export default ImagePopup;