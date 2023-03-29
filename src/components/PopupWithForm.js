import {useRef} from 'react';

function PopupWithForm({name, title, isOpen, onClose, onSubmit, valueText, submitClass, children}) {
  const popup = useRef();

  function handleClose(evt) {
    if (evt.target === popup.current) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_${name}${isOpen ? ' popup_opened' : ''}`}
      onClick={handleClose}
      ref={popup}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Кнопка закрытия формы"
          onClick={onClose}>
        </button>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={`popup__form_type_${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <input className={`popup__submit-button${submitClass ? submitClass : ''}`} name="popup__submit-button" type="submit" value={valueText}/>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
