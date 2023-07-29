import React from "react";
export default function ImagePopup(props) {
    return (
        <div
            className={`popup popup-${props.name} ${
                props.isOpen ? `popup_opened` : ""
            }`}
        >
            <div className="popup__wrapper">
                <button
                    type="button"
                    aria-label="close"
                    className="popup__close"
                    onClick={props.onClose}
                ></button>
                <img
                    className="popup__image popup__image_thumb"
                    src={props.card && props.card.link}
                    alt={props.card && props.card.name}
                />
                <h3 className="popup__title popup__title_thumb">
                    {props.card && props.card.name}
                </h3>
            </div>
        </div>
    );
}
