import PopupWithForm from "./PopupWithForm";
import { useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onClickClose, onUpdateAvatar, submitButton }) {
    const currentUser = useContext(CurrentUserContext);
    const inputRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();

        onUpdateAvatar({
            avatar: inputRef.current
        });
    }

    // function handleChange(event) {
    //     inputRef.current = event.target.value;
    // }

    // useEffect(() => {
    //     inputRef.current = currentUser.avatar;
    // }, [currentUser]);

    return (
        <PopupWithForm
            name={"avatar"}
            buttonTitle={submitButton}
            formTitle={"Обновить аватар"}
            isOpen={isOpen}
            onClose={onClose}
            onClickClose={onClickClose}
            onSubmit={handleSubmit}
        >

            <input className="form__input form__input_link" id="link"
                   ref={inputRef}
                   type="url" name="avatar" defaultValue=""
                   placeholder="Ссылка на фототографию" required/>
            <span className="form__input-error" id="link-error"></span>

        </PopupWithForm>
    );
}

export default EditAvatarPopup;