function PopupWithForm(props) {
    return (
        <article className={props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}>
            <div className="popup__window">
                <button className="popup__close" type="button"></button>
                <form className="form" id="save-button" name="popup-form" noValidate>
                    <h2 className="form__title">{props.formTitle}</h2>
                    {/*TODO: repair paddings*/}
                    {props.children}
                    <button className="form__button" type="submit">{props.buttonTitle}</button>
                </form>
            </div>
        </article>
    )
}

export default PopupWithForm;
