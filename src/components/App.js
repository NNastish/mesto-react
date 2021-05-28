import logo from '../images/logo.svg';
import {useEffect, useState} from 'react';

import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import {popupTypeAdd, popupTypeAvatar, popupTypeEdit} from "./Constants";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }


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
          />
          {/*футер */}
          {/*popup добавления новой карточки профиля*/}

          <PopupWithForm
              name={"add"}
              buttonTitle={"Создать"}
              formTitle={"Новое место"}
              isOpen={isAddPlacePopupOpen}
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

          popup редактирования профиля

          <PopupWithForm
              name={"edit"}
              buttonTitle={"Сохранить"}
              formTitle={"Редактировать профиль"}
              isOpen={isEditProfilePopupOpen}
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

          popup добавления нового аватара

          <PopupWithForm
              name={"avatar"}
              buttonTitle={"Создать"}
              formTitle={"Обновить аватар"}
              isOpen={isEditAvatarPopupOpen}
          >
              <component>
                  <input className="form__input form__input_link" id="link" type="url" name="avatar" value=""
                         placeholder="Ссылка на фототографию" required/>
                  <span className="form__input-error" id="link-error"></span>
              </component>
          </PopupWithForm>

          popup для увеличения фото

          <ImagePopup/>

          popup для подтверждения удаления карточки
          TODO: check after card realisation
          <PopupWithForm
              name={"delete"}
              buttonTitle={"Да"}
              formTitle={"Вы уверены?"}
              isOpen={false}
          >
              <component/>
          </PopupWithForm>


          заготовка карточки для клонирования

          <template id="template">
              <article className="card">
                  <button type="button" className="card__delete"></button>
                  <img className="card__photo" alt="фотография"/>
                  <div className="card__lists">
                      <h2 className="card__title"></h2>
                      <div className="card__like-box">
                          <button type="button" className="card__like"></button>
                          <p className="card__like-numb">0</p>
                      </div>
                  </div>
              </article>
          </template>
          <Footer/>
      </div>
      </body>
    );
}

export default App;