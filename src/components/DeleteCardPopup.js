import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopup({card, isOpen, onClose, onSubmit, valueText}) {
  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    onSubmit(card, valueText);
  };

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteSubmit}
      valueText={valueText}
      submitClass={" popup__submit-button_for_delete"}
    />
  );
};

export default DeleteCardPopup;
