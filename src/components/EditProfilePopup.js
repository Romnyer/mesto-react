import {useState, useEffect, useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser, valueText}) {
  const [name, setName] = useState(''),
        [description, setDescription] = useState(''),
        currentUser = useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value)
  };

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value)
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(name, description, valueText);
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      valueText={valueText}
    >
      <label className="popup__label">
        <input
          className="popup__field popup__field_type_name"
          id="popup-field-name"
          name="fieldName"
          value={name || 'Имя'}
          onChange={handleNameChange}
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__field-error popup-field-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__field popup__field_type_info"
          id="popup-field-info"
          name="fieldInfo"
          value={description || 'О себе'}
          onChange={handleDescriptionChange}
          type="text"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__field-error popup-field-info-error"></span>
      </label>
    </PopupWithForm>
  )
};

export default EditProfilePopup;
