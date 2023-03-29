import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, handleCardLike, handleDeleteClick}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">

      <section className="profile">
        <div className="profile__avatar">
          <div
            className="profile__container"
            onClick={onEditAvatar}>
            <img className="profile__pic" src={currentUser.avatar} alt="Аватар"/>
            <div className="profile__edit-pic"></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Кнопка редактирования профиля"
              onClick={onEditProfile}>
            </button>
          </div>
        </div>
        <button
          className="profile__add-button"
          id="profile__add-button"
          type="button"
          aria-label="Кнопка добавления изображений"
          onClick={onAddPlace}>
        </button>
      </section>

      <section className="elements">
        <ul className="elements__items">

          {/*Element template*/}
          {cards.map(item => (
            <Card
              card={item}
              userId={currentUser._id}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              key={item._id}
            />
          ))}

        </ul>
      </section>

    </main>
  );
}

export default Main;
