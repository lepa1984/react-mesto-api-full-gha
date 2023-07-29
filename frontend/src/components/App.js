import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoToolTip from "./InfoToolTip.js";
import auth from "../utils/Auth.js";
export default function App() {
    const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isSucceeded, setIsSucceeded] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState("");
    const navigate = useNavigate();
    React.useEffect(() => {
        if (isLoggedIn) {
            api.getCards()
                .then((data) => {
                    setCards(data);
                })
                .catch((err) => {
                    console.log(`Ошибка сервера ${err}`);
                });
            api.getUserInfo()
                .then((data) => {
                    setCurrentUser(data);
                })
                .catch((err) => console.log(err));
        }
    }, [isLoggedIn]);

    function handleEditAvatarClick() {
        setAvatarPopupOpen(true);
    }
    function handleEditProfileClick(e) {
        setProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setAddPopupOpen(true);
    }
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        if (isLiked) {
            api.removeLike(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => console.log(err));
        } else {
            api.addLike(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((err) => console.log(err));
        }
    }

    function handleCardDelete(card) {
        api.deleteCards(card._id)
            .then(() => {
                setCards((state) =>
                    state.filter((item) => item._id !== card._id)
                );
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateUser(data) {
        api.updateUserInfo(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(avatar) {
        api.updateAvatarInfo(avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(data) {
        api.newCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function closeAllPopups() {
        setAddPopupOpen(false);
        setProfilePopupOpen(false);
        setAvatarPopupOpen(false);
        setSelectedCard(null);
        setIsInfoTooltipOpen(false);
    }
    React.useEffect(() => {
        const jwt = localStorage.getItem("jwt");

        if (jwt) {
            auth.checkToken(jwt)
                .then((res) => {
                    setUserEmail(res.data.email);
                    setIsLoggedIn(true);
                    navigate("/");
                })
                .catch((err) => console.log(err));
        }
    }, []);
    function handleRegister(email, password) {
        auth.register(email, password)
            .then((res) => {
                setIsInfoTooltipOpen(true);
                setIsSucceeded(true);
                navigate("/sign-in", { replace: true });
            })
            .catch((err) => {
                setIsInfoTooltipOpen(true);
                setIsSucceeded(false);
                console.log(`Ошибка: ${err}`);
            });
    }
    function handleLogin(email, password) {
        auth.login(email, password)
            .then((res) => {
                if (res) {
                    setIsLoggedIn(true);
                    navigate("/", { replace: true });
                    setUserEmail(email);
                }
            })
            .catch((err) => {
                setIsInfoTooltipOpen(true);
                setIsSucceeded(false);
                console.log(`Ошибка: ${err}`);
            });
    }
    function handleLogout() {
        localStorage.removeItem("jwt");
        navigate("/sign-in", { replace: true });
        setIsLoggedIn(false);
    }
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page">
                    <Header onLogOut={handleLogout} email={userEmail} />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute
                                    isLoggedIn={isLoggedIn}
                                    element={Main}
                                    onEditAvatar={handleEditAvatarClick}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onCardClick={handleCardClick}
                                    onLikeClick={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                    cards={cards}
                                />
                            }
                        />
                        <Route
                            path="/sign-up"
                            element={<Register onRegister={handleRegister} />}
                        />
                        <Route
                            path="/sign-in"
                            element={<Login onLogin={handleLogin} />}
                        />
                    </Routes>
                    <Footer />
                    <ImagePopup
                        name="img"
                        card={selectedCard}
                        onClose={closeAllPopups}
                        isOpen={selectedCard}
                    />
                    <EditProfilePopup
                        name="profile"
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    <EditAvatarPopup
                        name="avatar"
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <AddPlacePopup
                        name="add"
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                    <InfoToolTip
                        name={"info"}
                        isSucceeded={isSucceeded}
                        isOpen={isInfoTooltipOpen}
                        onClose={closeAllPopups}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}
