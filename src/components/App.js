import {useState, useEffect} from 'react';

import Header from './Header.js';
import Main from './Main.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import PopupWithForm from './PopupWithForm.js';
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
        [selectedCard, setSelectedCard] = useState({}),
        [currentUser, setCurrentUser] = useState({}),
        [cards, setCards] = useState([]);

  const allPopupSeters = [setIsEditProfilePopupOpen, setIsAddPlacePopupOpen, setIsEditAvatarPopupOpen, setIsDeletePopupOpen];


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
    console.log(card)
    setSelectedCard(card);
    setIsDeletePopupOpen(true);
  }


  //Handle click on card pic
  function handleCardClick(card) {
    setSelectedCard(card);
  };

  //Handle card like
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  };

  //Handle card delete
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  };


  /* Submits */


  //Submit profile
  function handleUpdateUser(name, description) {
    api.changeUserInfo(name, description)
      .then(userData => {
        setCurrentUser({
          ...currentUser,
          name: userData.name,
          about: userData.about
        });
        closeAllPopups();
      })
  };

  //Submit avatar
  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then(userData => {
        setCurrentUser({
          ...currentUser,
          avatar: userData.avatar
        });
        closeAllPopups();
      })
  };

  //Sumbit place
  function handleAddPlace(place, link) {
    api.addCard(place, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
  };


  /* Popups close */


  function closeAllPopups() {
    allPopupSeters.forEach(seter => {
      seter(false);
    })
  };

  function closeImagePopup() {
    setSelectedCard({});
  };

  //Close popups by Esc
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
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, selectedCard]);


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
        />

        {/*Add element popup*/}

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        {/*Pic popup*/}

        <ImagePopup card={selectedCard} onClose={closeImagePopup}/>

        {/*Delete popup*/}

        <DeleteCardPopup
          card={selectedCard}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />

        {/*Upload popup*/}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
