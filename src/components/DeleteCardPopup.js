import {React} from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopup({card, isOpen, onClose, onSubmit}) {
  function handleDeleteSubmit(evt) {
    console.log(card)
    evt.preventDefault();
    onSubmit(card);
  };

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteSubmit}
      valueText={"Да"}
      submitClass={" popup__submit-button_for_delete"}
    />
  );
};

export default DeleteCardPopup;
