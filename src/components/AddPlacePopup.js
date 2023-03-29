import {useRef} from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({isOpen, onClose, onAddPlace, handleCloseByClick, isLoading}) {
  const place = useRef(),
        link = useRef();

  function handlePlaceSubmit(evt) {
    evt.preventDefault();
    onAddPlace(place.current.value, link.current.value);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handlePlaceSubmit}
      handleCloseByClick={handleCloseByClick}
      valueText={'Создать'}
      valueLoadingText={'Создание...'}
      isLoading={isLoading}
    >
      <label className="popup__label">
        <input
          className="popup__field popup__field_type_title"
          id="popup-field-title"
          name="fieldTitle"
          ref={place}
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__field-error popup-field-title-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__field popup__field_type_link"
          id="popup-field-link"
          name="fieldLink"
          ref={link}
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__field-error popup-field-link-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
