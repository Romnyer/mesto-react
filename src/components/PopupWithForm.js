import {useRef} from 'react';

function PopupWithForm({name, title, isOpen, onClose, onSubmit, submitClass, handleCloseByClick, valueText, valueLoadingText, isLoading, children}) {
  const popup = useRef();

  function handleClose(evt) {
    handleCloseByClick(evt, popup);
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
          onClick={onClose}
        />
        <form
          className={`popup__form popup__form_type_${name}`}
          name={`popup__form_type_${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <input
            className={`popup__submit-button${submitClass ? submitClass : ''}`}
            name="popup__submit-button"
            type="submit"
            value={isLoading ? valueLoadingText : valueText}/>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
