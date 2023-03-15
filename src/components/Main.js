import {useEffect, useState} from "react";
import api from '../utils/Api.js';
import Card from "./Card.js";

function Main(props) {
  const [userName, setUserName] = useState(),
        [userDescription, setUserDescription] = useState(),
        [userAvatar, setUserAvatar] = useState(),
        [userId, setUserId] = useState(),
        [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getCards()])
      .then(([userData, cardList]) => {

        //Set user's avatar, name, about and ID
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setUserId(userData._id);

        setCards(cardList);
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <main className="main">

      <section className="profile">
        <div className="profile__avatar">
          <div
            className="profile__container"
            onClick={props.onEditAvatar}>
            <img className="profile__pic" src={userAvatar} alt="Аватар"/>
            <div className="profile__edit-pic"></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <p className="profile__subtitle">{userDescription}</p>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Кнопка редактирования профиля"
              onClick={props.onEditProfile}>
            </button>
          </div>
        </div>
        <button
          className="profile__add-button"
          id="profile__add-button"
          type="button"
          aria-label="Кнопка добавления изображений"
          onClick={props.onAddPlace}>
        </button>
      </section>

      <section className="elements">
        <ul className="elements__items">

          {/*Element template*/}
          {cards.map(item => (
            <Card onCardClick={props.onCardClick} card={item} userId={userId} key={item._id}/>
          ))}

        </ul>
      </section>

    </main>
  );
}

export default Main;
