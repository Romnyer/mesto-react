import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import {useState, useEffect} from 'react';

const esc = 'Escape';

function App() {
  //Hooks for popups with inputs
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false),
        [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false),
        [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false),
        [selectedCard, setSelectedCard] = useState({});

  const allPopupSeters = [setIsEditProfilePopupOpen, setIsAddPlacePopupOpen, setIsEditAvatarPopupOpen];

  //Hadlers for popup open buttons
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  //Handle click on card pic
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    allPopupSeters.forEach(seter => {
      seter(false);
    })
  }

  function closeImagePopup() {
    setSelectedCard({});
  }

  useEffect(() => {
    function closePopupByEsc(evt) {
      if (evt.key === esc) {
        if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen) {
          closeAllPopups();
        }

        if (selectedCard.name) {
          closeImagePopup();
        }
      }
    }

    document.addEventListener('keydown', closePopupByEsc);

    return () => {
      document.removeEventListener('keydown', closePopupByEsc);
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, selectedCard])

  return (
    <div className="page">
      <Header/>
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
      <Footer/>

    {/*Profile popup*/}

      <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} valueText={"Сохранить"}>
        <label className="popup__label">
          <input className="popup__field popup__field_type_name" id="popup-field-name" name="fieldName" type="text" placeholder="Имя" minLength="2" maxLength="40" required/>
          <span className="popup__field-error popup-field-name-error"></span>
        </label>
        <label className="popup__label">
          <input className="popup__field popup__field_type_info" id="popup-field-info" name="fieldInfo" type="text" placeholder="О себе" minLength="2" maxLength="200" required/>
          <span className="popup__field-error popup-field-info-error"></span>
        </label>
      </PopupWithForm>

    {/*Add element popup*/}

    <PopupWithForm name="add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} valueText={"Создать"}>
      <label className="popup__label">
        <input className="popup__field popup__field_type_title" id="popup-field-title" name="fieldTitle" type="text" placeholder="Название" minLength="2" maxLength="30" required/>
        <span className="popup__field-error popup-field-title-error"></span>
      </label>
      <label className="popup__label">
        <input className="popup__field popup__field_type_link" id="popup-field-link" name="fieldLink" type="url" placeholder="Ссылка на картинку" required/>
        <span className="popup__field-error popup-field-link-error"></span>
      </label>
    </PopupWithForm>

    {/*Pic popup*/}

    <ImagePopup card={selectedCard} onClose={closeImagePopup}/>

    {/*Delete popup*/}

    <PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups} valueText={"Да"} submitClass={" popup__submit-button_for_delete"}/>

    {/*Upload popup*/}

    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} valueText={"Сохранить"} submitClass={" popup__submit-button_for_upload"}>
      <label className="popup__label popup__label_type_upload">
        <input className="popup__field popup__field_type_upload" id="popup-field-upload" name="fieldUpload" type="url" placeholder="Ссылка на картинку" required/>
        <span className="popup__field-error popup-field-upload-error"></span>
      </label>
    </PopupWithForm>

  </div>
  );
}

export default App;
