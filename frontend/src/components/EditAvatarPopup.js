import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
    const ref = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: ref.current.value,
        });
    }

    React.useEffect(() => {
        ref.current.value = "";
    }, [props.isOpen]);

    return (
        <PopupWithForm
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name={props.name}
        >
            <label className="popup__label">
                <input
                    type="url"
                    className="form__input form__input_link_value"
                    name="link"
                    placeholder="Ссылка на аватар"
                    id="avatar-input"
                    required
                    ref={ref}
                />
                <span className="form__input-error avatar-input-error">
                    Введите адрес
                </span>
            </label>
        </PopupWithForm>
    );
}
