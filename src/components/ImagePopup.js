function ImagePopup() {
    return (
        <article className="popup popup_type_image popup_opacity">
            <div className="popup__container">
                <figure className="popup__figure">
                    <img src="#" alt="фотография" className="popup__photo"/>
                    <figcaption className="popup__caption"></figcaption>
                </figure>
                <button className="popup__close" type="button"></button>
            </div>
        </article>
    );
}

export default ImagePopup;