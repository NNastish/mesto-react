import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";

function Main({onAddPlace, onEditAvatar, onEditProfile}) {
    /*let popup = null;

    function close() {
        if (popup != null) {
            popup.classList.remove("popup_opened");
            document.removeEventListener("keydown", handleEscClose);
        }
    }*/

    /*function handleEscClose(evt) {
        if (evt.key === "Escape") {
            close();
        }
    }

    function handleEditAvatarClick() {
        popup = document.querySelector(".popup_type_avatar");
        popup.classList.add("popup_opened");
        //закрыл
        // document.addEventListener("keydown", handleEscClose);
        // popup.querySelector(".popup__close").addEventListener("click", () => close())
        // popup.addEventListener("click", (evt) => {
        //     if (evt.target.classList.contains("popup_opened")) {
        //         close();
        //     }
        // });
        console.log('handleEditAvatar');
    }

    function handleAddPlaceClick() {
        //открыл
        popup = document.querySelector(".popup_type_add");
        popup.classList.add("popup_opened");
        //закрыл
        // document.addEventListener("keydown", handleEscClose);
        // popup.querySelector(".popup__close").addEventListener("click", () => close())
        // popup.addEventListener("click", (evt) => {
        //     if (evt.target.classList.contains("popup_opened")) {
        //         close();
        //     }
        // });
        console.log('handleAddPlaceClick');
    }*/

    /*function handleEditProfileClick() {
        //открыл
        popup = document.querySelector(".popup_type_edit");
        popup.classList.add("popup_opened");
        //закрыл
        // document.addEventListener("keydown", handleEscClose);
        // popup.querySelector(".popup__close").addEventListener("click", () => close())
        // popup.addEventListener("click", (evt) => {
        //     if (evt.target.classList.contains("popup_opened")) {
        //         close();
        //     }
        // });
        console.log('handleEditProfileClick');
    }*/

    return (
        <>
            {/*секция с профилем*/}
            <section className="profile">
                <div className="profile__box">
                    <div className="profile__avatar">
                        <button type="button" className="profile__avatar-overlay" onClick={onEditAvatar}></button>
                    </div>
                    <img className="profile__photo" src="<%=require('./images/image.jpg')%>" alt="Аватар"/>

                    <div className="profile__info">
                        <div className="profile__header">
                            <h1 className="profile__title">Жак-Ив Кусто</h1>
                            <button type="button" className="profile__edit" id="edit" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__text">Исследователь океана</p>
                    </div>
                </div>

                <button type="button" className="profile__add" id="add" onClick={onAddPlace}></button>
            </section>

            {/*секция с основным массивом карточек */}
            <section className="cards"></section>
        </>
    )
}

export default Main;