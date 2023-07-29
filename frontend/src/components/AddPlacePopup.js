import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
    const refName = React.useRef();
    const refLink = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: refName.current.value,
            link: refLink.current.value,
        });
    }

    React.useEffect(() => {
        refName.current.value = "";
        refLink.current.value = "";
    }, [props.isOpen]);

    return (
        <PopupWithForm
            title="Новое место"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name={props.name}
        >
            <label className="popup__label">
                <input
                    type="text"
                    className="form__input form__input_location_value"
                    name="location"
                    placeholder="Название"
                    id="location-input"
                    required
                    ref={refName}
                    minlength="2"
                    maxlength="30"
                />
                <span className="form__input-error location-input-error">
                    Вы пропустили это поле.
                </span>
            </label>
            <label className="popup__label">
                <input
                    type="url"
                    className="form__input form__input_link_value"
                    name="link"
                    placeholder="Ссылка на картинку"
                    id="link-input"
                    required
                    ref={refLink}
                />
                <span className="form__input-error link-input-error">
                    Введите адрес сайта.
                </span>
            </label>
        </PopupWithForm>
    );
}
