import {useState, useEffect} from 'react';

import Header from './Header.js';
import Main from './Main.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer.js';

import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';

const esc = 'Escape';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false),
        [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false),
        [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false),
        [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false),
        [isImagePopupOpen, setIsImagePopupOpen] = useState(false),
        [selectedCard, setSelectedCard] = useState({}),
        [currentUser, setCurrentUser] = useState({}),
        [cards, setCards] = useState([]);

  const allPopupSeters = [setIsEditProfilePopupOpen,
                          setIsAddPlacePopupOpen,
                          setIsEditAvatarPopupOpen,
                          setIsDeletePopupOpen,
                          setIsImagePopupOpen],
        allPopunIsOpen = [isEditProfilePopupOpen,
                          isAddPlacePopupOpen,
                          isEditAvatarPopupOpen,
                          isDeletePopupOpen,
                          isImagePopupOpen];


  const [profileSubmitValue, setProfileSubmitValue] = useState('Сохранить'),
        [avatarSubmitValue, setAvatarSubmitValue] = useState('Сохранить'),
        [placeSubmitValue, setPlaceSubmitValue] = useState('Создать'),
        [deleteSubmitValue, setDeleteSubmitValue] = useState('Да');


  /* Set user info and cards array from fetch */


  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getCards()])
      .then(([userData, cardList]) => {
        setCurrentUser(userData);
        setCards(cardList);
      })
      .catch(err => console.log(err));
  }, []);


  /* Handlers */


  //Hadlers for popup open buttons
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };
  function handleDeleteClick(card) {
    setSelectedCard(card);
    setIsDeletePopupOpen(true);
  }


  //Handle click on card pic
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  //Handle card like
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  };


  /* Submits */


  //Timeout for visual effect
  //Without timeout user will see effect of setPopupSubmitValue() before popup closed
  const timeoutClosing = (seter, text) => {
    setTimeout(() => {
      seter(text);
    },500)
  };

  //Submit profile
  function handleUpdateUser(name, description, valueText) {
    setProfileSubmitValue('Сохранение');
    api.changeUserInfo(name, description)
      .then(userData => {
        setCurrentUser({
          ...currentUser,
          name: userData.name,
          about: userData.about
        });
        closeAllPopups();
      })
      .catch(err => console.log(err))
        .finally(() => timeoutClosing(setProfileSubmitValue, valueText))
  };

  //Submit avatar
  function handleUpdateAvatar(avatar, valueText) {
    setAvatarSubmitValue('Сохранение');
    api.changeAvatar(avatar)
      .then(userData => {
        setCurrentUser({
          ...currentUser,
          avatar: userData.avatar
        });
        closeAllPopups();
      })
      .catch(err => console.log(err))
        .finally(() => timeoutClosing(setAvatarSubmitValue, valueText))
  };

  //Sumbit place
  function handleAddPlace(place, link, valueText) {
    setPlaceSubmitValue('Создание');
    api.addCard(place, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
        .finally(() => timeoutClosing(setPlaceSubmitValue, valueText))
  };

  //Submit delete card
  function handleCardDelete(card, valueText) {
    setDeleteSubmitValue('Удаление');
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
      closeAllPopups();
    })
    .catch(err => console.log(err))
      .finally(() => timeoutClosing(setDeleteSubmitValue, valueText))

  };


  /* Popups close */


  function closeAllPopups() {
    allPopupSeters.forEach(seter => {
      seter(false);
    })
  };

  //Close popups by Esc
  useEffect(() => {
    function closePopupByEsc(evt) {
      if (evt.key === esc) {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closePopupByEsc);

    return () => {
      document.removeEventListener('keydown', closePopupByEsc);
    }
  }, [allPopunIsOpen]);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header/>
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          handleCardLike={handleCardLike}
          handleDeleteClick={handleDeleteClick}
        />
        <Footer/>

        {/*Profile popup*/}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          valueText={profileSubmitValue}
        />

        {/*Add element popup*/}

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          valueText={placeSubmitValue}
        />

        {/*Pic popup*/}

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        {/*Delete popup*/}

        <DeleteCardPopup
          card={selectedCard}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          valueText={deleteSubmitValue}
        />

        {/*Upload popup*/}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          valueText={avatarSubmitValue}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
