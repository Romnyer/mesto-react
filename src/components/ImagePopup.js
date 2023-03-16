function ImagePopup({card, onClose}) {
  return (
    <div
      className={`popup popup_element_pic${card.name ? ' popup_opened' : ''}`}
      onClick={onClose}
    >
      <div className="popup__container">
        <img className="popup__pic-large" src={card.link} alt={card.name}/>
        <h2 className="popup__pic-title">{card.name}</h2>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Кнопка закрытия попапа картинки"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
