function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="elements__item">
      <img
        className="elements__pic"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      {props.userId === props.card._id && (<button className="elements__trash-button" type="button" aria-label="Кнопка &#8243;удалить&#8243;"></button>)}
      <div className="elements__info">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__likes">
          <button className="elements__like-button" type="button" aria-label="Кнопка &#8243;мне нравится&#8243;"></button>
          <p className="elements__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
