import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function EditProfilePopup(props) {
    const [name, setName] = React.useState();
    const [description, setDescription] = React.useState();
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }
    return (
        <PopupWithForm
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name={props.name}
        >
            <label className="popup__label">
                <input
                    type="text"
                    className="form__input form__input_name_value"
                    name="name"
                    id="name-input"
                    required
                    minlength="2"
                    maxlength="40"
                    placeholder="Имя"
                    onChange={handleNameChange}
                    value={name}
                />
                <span className="form__input-error name-input-error">
                    Вы пропустили это поле.
                </span>
            </label>
            <label className="popup__label">
                <input
                    type="text"
                    className="form__input form__input_about_value"
                    name="about"
                    id="about-input"
                    required
                    minlength="2"
                    maxlength="200"
                    placeholder="О себе"
                    onChange={handleDescriptionChange}
                    value={description}
                />
                <span className="form__input-error about-input-error">
                    Вы пропустили это поле.
                </span>
            </label>
        </PopupWithForm>
    );
}
