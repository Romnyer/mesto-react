function Card({onCardClick, card, userId}) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="elements__item">
      <img
        className="elements__pic"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {userId === card._id && (<button className="elements__trash-button" type="button" aria-label="Кнопка &#8243;удалить&#8243;"></button>)}
      <div className="elements__info">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__likes">
          <button className="elements__like-button" type="button" aria-label="Кнопка &#8243;мне нравится&#8243;"></button>
          <p className="elements__like-number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
