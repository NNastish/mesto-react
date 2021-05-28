import {api} from './utils/Api';
import {useState, useEffect} from "react";
import Card from './Card'

function Main({onAddPlace, onEditAvatar, onEditProfile}) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [nameFlag, setNameFlag] = useState(false);
    const [descriptionFlag, setDescriptionFlag] = useState(false);
    const [cards, setCards] = useState([]);

    const apiGetUserInfo = () => {
        api.getUserInfo()
            .then(data => {
                console.log('data');
                console.log(data);
                const {name, avatar, about} = data;
                setUserName(name);
                setNameFlag(true);
                setUserAvatar(avatar);
                setUserDescription(about);
                setDescriptionFlag(true);
            })
            .catch((error) => {
                console.log(error.status)
                setDescriptionFlag(false);
                setNameFlag(false);
            })
            .finally(() => {
            })
    }

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

    useEffect(() => {
        apiGetUserInfo();
        apiGetCards();
    }, [])


    return (
        <>
            {/*секция с профилем*/}
            <section className="profile">
                <div className="profile__box">
                    <div className="profile__avatar">
                        <img className="profile__photo" src={userAvatar} alt="Avatar"/>
                        <button
                            type="button"
                            className="profile__avatar-overlay"
                            // style={{ backgroundImage: `url(${userAvatar})` }}
                            onClick={onEditAvatar}>
                        </button>
                    </div>


                    <div className="profile__info">
                        <div className="profile__header">
                            <h1 className="profile__title">{nameFlag ? userName: "Жак-Ив Кусто"}</h1>
                            <button type="button" className="profile__edit" id="edit" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__text">{descriptionFlag ? userDescription: "Исследователь океана"}</p>
                    </div>
                </div>

                <button type="button" className="profile__add" id="add" onClick={onAddPlace}></button>
            </section>

            {/*секция с основным массивом карточек */}
            <section className="cards">
                {
                    cards.map((cardEntity, i) => (
                        <Card card={cardEntity} i={i}/>
                    ))
                }
            </section>
        </>
    )
}

export default Main;
