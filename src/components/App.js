import {useEffect, useState} from 'react';
import {api} from '../utils/Api';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [popupSubmitSaveButton, setPopupSubmitSaveButton] = useState('Сохранить');
    const [popupSubmitCreateButton, setPopupSubmitCreateButton] = useState('Создать');

    const apiGetCards = () => {
        api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((error) => {
                console.log('Error: ' + error.status);
            })
            .finally(() => {

            })
    }

    const apiGetUserInfo = () => {
        api.getUserInfo()
            .then(data => {
                setCurrentUser(data);
            })
            .catch(error => {
                console.log('Error: ' + error);
                setCurrentUser({});
            })
            .finally()
    }

//TODO: объединить монтирование
    useEffect(() => {
        apiGetCards();
    }, [])

    useEffect(() => {
        apiGetUserInfo();
    }, [])

    function handleCardLike(card) {
        //check if like is clicked already
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        //send request to API and get updated data
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(showError);
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(data => {
                const refreshedCards = cards.filter(everyCard => everyCard._id !== card._id);
                setCards(refreshedCards);
                console.log(data);
            })
            .catch(showError);
    }


    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }


    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setSelectedCard(null);
    }


    const closeViaClick = (e) => {
        if (e.target.classList.contains("popup_opened")) {
            closeAllPopups();
        }
    }



    useEffect(() => {
        const handleEscClose = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }

        window.addEventListener("keydown", handleEscClose);
        return () => {
            window.removeEventListener("keydown", handleEscClose);
        }
    })

    function renderLoading(description) {
        const { flag, popup } = description;
        if (popup === 'profile') {
            flag ? setPopupSubmitSaveButton('Сохранение...') : setPopupSubmitSaveButton('Сохранить');
        } else {
            flag ? setPopupSubmitCreateButton('Создание...') : setPopupSubmitCreateButton('Создать');
        }
    }

    function showError(error) {
        console.log('Error: ' + error);
    }

    function handleUpdateUser(formData) {
        renderLoading({flag: true, popup: 'profile'});
        api.editProfileInfo(formData)
            .then(response => {
                setCurrentUser(response);
                closeAllPopups();
            })
            .catch(showError)
            .finally(() => {
                renderLoading({flag: false, popup: 'profile'});
            })
    }

    function handleUpdateAvatar(avatar) {
        renderLoading({ flag: true, popup: 'avatar'});
        api.editAvatar(avatar)
            .then(response => {
                setCurrentUser(response);
                closeAllPopups();
            })
            .catch(showError)
            .finally(() => {
                renderLoading({ flag: false, popup: 'avatar'});
            })
    }

    function handleAddPlace(card) {
        renderLoading({ flag: true, popup: 'addPlace'});
        console.log(card);
        api.addCard(card)
            .then(newCard => {
                // setCards([card, ...cards]);
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(showError)
            .finally(() => {
                renderLoading({ flag: false, popup: 'addPlace' });
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <div className="container">

                <div className="page">
                    {/*шапка с логотипом */}
                    <Header/>
                    {/*секция с профилем*/}
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={setSelectedCard}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />


                    {/*popup добавления новой карточки профиля*/}

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onClickClose={closeViaClick}
                        onAddPlace={handleAddPlace}
                        submitButton={popupSubmitCreateButton}
                    />

                    {/*popup редактирования профиля*/}

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onClickClose={closeViaClick}
                        onUpdateUser={handleUpdateUser}
                        submitButton={popupSubmitSaveButton}
                    />

                    {/*popup добавления нового аватара*/}

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClickClose={closeViaClick}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        submitButton={popupSubmitCreateButton}
                    />

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
                    />

                    {/*футер */}
                    <Footer/>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

