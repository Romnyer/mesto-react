import {useEffect, useState} from "react";

function ImagePopup(props) {
  const [card, setCard] = useState(false);

  useEffect(() => {
    if (Object.keys(props.card).length !== 0) {
      setCard(props.card);
    }
    else {
      setCard(false);
    }
  }, [props.card]);

  useEffect(() => {
    props.closeByEsc(props);
  });

  return (
    <div
      className={`popup popup_element_pic${card ? ' popup_opened' : ''}`}
      onClick={props.onClose}
    >
      <div className="popup__container">
        <img className="popup__pic-large" src={props.card.link} alt={props.card.name}/>
        <h2 className="popup__pic-title">{props.card.name}</h2>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Кнопка закрытия попапа картинки"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
