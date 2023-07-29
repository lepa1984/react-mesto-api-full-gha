export default function PopupWithForm(props) {
    return (
        <div
            className={`popup popup-${props.name} ${
                props.isOpen ? `popup_opened` : ""
            }`}
        >
            <div className="popup__container">
                <button
                    type="button"
                    aria-label="close"
                    className="popup__close"
                    onClick={props.onClose}
                />
                <h2 className="popup__title">{props.title}</h2>
                <form
                    name={`form-${props.name}`}
                    className="form"
                    id={`form-${props.name}`}
                    onSubmit={props.onSubmit}
                >
                    {props.children}
                    <button
                        type="submit"
                        className="form__button form__button-edit"
                    >
                        {props.buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}
