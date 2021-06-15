import {api} from '../utils/Api';
import { useState, useEffect, useContext } from "react";
import Card from './Card';
import Profile from './Profile';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({ onAddPlace, onEditAvatar, onEditProfile, onCardClick }) {
    const user = useContext(CurrentUserContext);
    const [cards, setCards] = useState([]);

    const apiGetCards = () => {
        api.getInitialCards()
            .then((data) => {
                setCards(data);
                console.log(data);
            })
            .catch((error) => {
                console.log('Error: ' + error.status);
            })
            .finally(() => {

            })
    }

    //TODO: in future want to add promiseAll and maybe modify stateVariables (start to use objects)
    useEffect(() => {
        apiGetCards();
    }, [])


    return (
        <>
            {/*секция с профилем*/}
            <Profile
                userAvatar={user.avatar}
                onEditAvatar={onEditAvatar}
                userName={user.name}
                onEditProfile={onEditProfile}
                userDescription={user.about}
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
