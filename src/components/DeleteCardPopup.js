import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopup({card, isOpen, onClose, onSubmit, handleCloseByClick, isLoading}) {
  function handleDeleteSubmit(evt) {
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
      submitClass={" popup__submit-button_for_delete"}
      handleCloseByClick={handleCloseByClick}
      valueText={'Да'}
      valueLoadingText={'Удаление...'}
      isLoading={isLoading}
    />
  );
};

export default DeleteCardPopup;
