import {useEffect} from "react";

function PopupWithForm(props) {
  useEffect(() => {
    props.closeByEsc(props);
  });

  return (
    <div
      className={`popup popup_type_${props.name}${props.isOpen ? ' popup_opened' : ''}`}
      onClick={props.onClose}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Кнопка закрытия формы"
          onClick={props.onClose}>
        </button>
        <form className={`popup__form popup__form_type_${props.name}`} name={`popup__form_type_${props.name}`} noValidate>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
