import {useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext),
        isOwn = card.owner._id === currentUser._id,
        isLiked = card.likes.some(like => like._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  };

  function handleLike() {
    onCardLike(card);
  };

  function handleDelete() {
    onCardDelete(card);
  };

  return (
    <li className="elements__item">
      <img
        className="elements__pic"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="elements__trash-button"
          type="button"
          aria-label="Кнопка &#8243;удалить&#8243;"
          onClick={handleDelete}
        />
      )}
      <div className="elements__info">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__likes">
          <button className={`elements__like-button ${isLiked && 'elements__like-button_active'}`}
            type="button"
            aria-label="Кнопка &#8243;мне нравится&#8243;"
            onClick={handleLike}
          ></button>
          <p className="elements__like-number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
