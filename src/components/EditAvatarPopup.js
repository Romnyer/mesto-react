import {useRef} from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, handleCloseByClick, isLoading}) {
  const avatar = useRef();

  function handleAvatarSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatar.current.value);
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      submitClass={" popup__submit-button_for_upload"}
      onSubmit={handleAvatarSubmit}
      handleCloseByClick={handleCloseByClick}
      valueText={'Сохранить'}
      valueLoadingText={'Сохранение...'}
      isLoading={isLoading}
    >
      <label className="popup__label popup__label_type_upload">
        <input
          className="popup__field popup__field_type_upload"
          id="popup-field-upload"
          name="fieldUpload"
          ref={avatar}
          type="url"
          placeholder="Ссылка на картинку"
          required/>
        <span className="popup__field-error popup-field-upload-error"></span>
      </label>
    </PopupWithForm>
  )
};

export default EditAvatarPopup;
