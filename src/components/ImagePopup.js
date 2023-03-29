import {useRef} from 'react';

function ImagePopup({card, isOpen, onClose, handleCloseByClick}) {
  const popup = useRef();

  function handleClose(evt) {
    handleCloseByClick(evt, popup);
  }

  return (
    <div
      className={`popup popup_element_pic${isOpen ? ' popup_opened' : ''}`}
      onClick={handleClose}
      ref={popup}
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
