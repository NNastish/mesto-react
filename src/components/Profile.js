function Profile({userAvatar, onEditAvatar, nameFlag, userName,
                     onEditProfile, descriptionFlag, userDescription, onAddPlace }) {
    return (
        <section className="profile">
            <div className="profile__box">
                <div
                    className="profile__avatar"
                    style={{ backgroundImage: `url(${userAvatar}`}}>
                    <button
                        type="button"
                        className="profile__avatar-overlay"
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
    )
}

export default Profile;