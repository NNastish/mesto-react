import {api} from '../utils/Api';
import {useState, useEffect} from "react";
import Card from './Card';
import Profile from './Profile';

function Main({ onAddPlace, onEditAvatar, onEditProfile, onCardClick }) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [nameFlag, setNameFlag] = useState(false);
    const [descriptionFlag, setDescriptionFlag] = useState(false);
    const [cards, setCards] = useState([]);

    const apiGetUserInfo = () => {
        api.getUserInfo()
            .then(data => {
                const {name, avatar, about} = data;
                setUserName(name);
                setNameFlag(true);
                setUserAvatar(avatar);
                setUserDescription(about);
                setDescriptionFlag(true);
            })
            .catch((error) => {
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

    //TODO: in future want to add promiseAll and maybe modify stateVariables (start to use objects)
    useEffect(() => {
        apiGetUserInfo();
        apiGetCards();
    }, [])


    return (
        <>
            {/*секция с профилем*/}
            <Profile
                userAvatar={userAvatar}
                onEditAvatar={onEditAvatar}
                nameFlag={nameFlag}
                userName={userName}
                onEditProfile={onEditProfile}
                descriptionFlag={descriptionFlag}
                userDescription={userDescription}
                onAddPlace={onAddPlace}
            />


            {/*секция с основным массивом карточек */}
            <section className="cards">
                {
                    cards.map((card) => (
                        <Card key={card._id} card={card} onClick={onCardClick}/>
                    ))
                }
            </section>
        </>
    )
}

export default Main;
