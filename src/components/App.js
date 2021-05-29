import {useEffect, useState} from 'react';

import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleCardClick() {
        setSelectedCard(!selectedCard);
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setSelectedCard(null);
    }

    const handleEscClose = (e) => {
        if (e.key === 'Escape') {
            closeAllPopups();
        }
    }

    const closeViaClick = (e) => {
        if (e.target.classList.contains("popup_opened")) {
            closeAllPopups();
        }
    }

    useEffect(() => {

        window.addEventListener("keydown", handleEscClose);
        return () => {
            window.removeEventListener("keydown", handleEscClose);
        }
    })


    return (
        <body className="container">
        <div className="page">
            {/*шапка с логотипом */}
            <Header/>
            {/*секция с профилем*/}
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={setSelectedCard}
            />
            {/*футер */}
            {/*popup добавления новой карточки профиля*/}

            <PopupWithForm
                name={"add"}
                buttonTitle={"Создать"}
                formTitle={"Новое место"}
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onClickClose={closeViaClick}
            >
                <component>
                    <input className="form__input form__input_title" id="input-title" type="text" name="name" value=""
                           placeholder="Название" minLength="2" maxLength="30" required/>
                    <span className="form__input-error" id="input-title-error"></span>

                    <input className="form__input form__input_link" id="input-link" type="url" name="link" value=""
                           placeholder="Ссылка на картинку" required/>
                    <span className="form__input-error" id="input-link-error"></span>
                </component>
            </PopupWithForm>

            {/*popup редактирования профиля*/}

            <PopupWithForm
                name={"edit"}
                buttonTitle={"Сохранить"}
                formTitle={"Редактировать профиль"}
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onClickClose={closeViaClick}
            >
                <component>
                    <input className="form__input form__input_name" id="name" type="text" name="name" value=""
                           placeholder="Имя" minLength="2" maxLength="40" required/>
                    <span className="form__input-error" id="name-error"></span>

                    <input className="form__input form__input_about" id="about" type="text" name="about" value=""
                           placeholder="О себе" minLength="2" maxLength="200" required/>
                    <span className="form__input-error" id="about-error"></span>
                </component>
            </PopupWithForm>

            {/*popup добавления нового аватара*/}

            <PopupWithForm
                name={"avatar"}
                buttonTitle={"Создать"}
                formTitle={"Обновить аватар"}
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onClickClose={closeViaClick}
            >
                <component>
                    <input className="form__input form__input_link" id="link" type="url" name="avatar" value=""
                           placeholder="Ссылка на фототографию" required/>
                    <span className="form__input-error" id="link-error"></span>
                </component>
            </PopupWithForm>

            {/*popup для увеличения фото*/}

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
                onClickClose={closeViaClick}
            />

            {/*popup для подтверждения удаления карточки*/}
            {/*TODO: check after card realisation*/}
            <PopupWithForm
                name={"delete"}
                buttonTitle={"Да"}
                formTitle={"Вы уверены?"}
                isOpen={false}
            >
                <component/>
            </PopupWithForm>

            <Footer/>
        </div>
        </body>
    );
}

export default App;

