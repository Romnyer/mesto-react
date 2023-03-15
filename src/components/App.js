import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import {useState} from 'react';

const esc = 'Escape';

function App() {
  //Hooks for popups with inputs
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false),
        [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false),
        [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false),
        [selectedCard, setSelectedCard] = useState({});

  const allPopupSeters = [setIsEditProfilePopupOpen, setIsAddPlacePopupOpen, setIsEditAvatarPopupOpen, setSelectedCard];

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

  function closeByEsc(props) {
    function closePopupByEsc(evt) {
      if (evt.key === esc) {
        props.onClose();
      }
    }

    document.addEventListener('keydown', closePopupByEsc);

    return () => {
      document.removeEventListener('keydown', closePopupByEsc);
    }
  }

  function closeAllPopups() {
    allPopupSeters.forEach(seter => {
      seter(false);
    })
  }

  return (
    <div className="page">
      <Header/>
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
      <Footer/>

    {/*Profile popup*/}

      <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} closeByEsc={closeByEsc} children={
          <>
            <label className="popup__label">
              <input className="popup__field popup__field_type_name" id="popup-field-name" name="fieldName" type="text" placeholder="Имя" minLength="2" maxLength="40" required/>
              <span className="popup__field-error popup-field-name-error"></span>
            </label>
            <label className="popup__label">
              <input className="popup__field popup__field_type_info" id="popup-field-info" name="fieldInfo" type="text" placeholder="О себе" minLength="2" maxLength="200" required/>
              <span className="popup__field-error popup-field-info-error"></span>
            </label>
            <input className="popup__submit-button" name="popup__submit-button" type="submit" value="Сохранить"/>
          </>
        }
      />

    {/*Add element popup*/}

    <PopupWithForm name="add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} closeByEsc={closeByEsc} children={
        <>
          <label className="popup__label">
            <input className="popup__field popup__field_type_title" id="popup-field-title" name="fieldTitle" type="text" placeholder="Название" minLength="2" maxLength="30" required/>
            <span className="popup__field-error popup-field-title-error"></span>
          </label>
          <label className="popup__label">
            <input className="popup__field popup__field_type_link" id="popup-field-link" name="fieldLink" type="url" placeholder="Ссылка на картинку" required/>
            <span className="popup__field-error popup-field-link-error"></span>
          </label>
          <input className="popup__submit-button" name="popup__submit-button" type="submit" value="Создать"/>
        </>
      }
    />

    {/*Pic popup*/}

    <ImagePopup card={selectedCard} onClose={closeAllPopups} closeByEsc={closeByEsc}/>

    {/*Delete popup*/}

    <PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups} closeByEsc={closeByEsc} children={
        <>
          <input className="popup__submit-button popup__submit-button_for_delete" name="popup__submit-button" type="submit" value="Да"/>
        </>
      }
    />

    {/*Upload popup*/}

    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} closeByEsc={closeByEsc} children={
        <>
          <label className="popup__label popup__label_type_upload">
            <input className="popup__field popup__field_type_upload" id="popup-field-upload" name="fieldUpload" type="url" placeholder="Ссылка на картинку" required/>
            <span className="popup__field-error popup-field-upload-error"></span>
          </label>
          <input className="popup__submit-button popup__submit-button_for_upload" name="popup__submit-button" type="submit" value="Сохранить"/>
        </>
      }
    />

  </div>
  );
}

export default App;
