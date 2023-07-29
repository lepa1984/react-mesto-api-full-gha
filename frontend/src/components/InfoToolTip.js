import successImage from "../images/check.svg";
import unsuccessImage from "../images/error.svg";
function InfoToolTip(props) {
    console.log(props);
    return (
        <div
            className={`popup popup_${props.name} ${
                props.isOpen ? "popup_opened" : ""
            }`}
        >
            <div className="popup__container">
                <button
                    type="button"
                    aria-label="close"
                    className="popup__close"
                    onClick={props.onClose}
                ></button>

                <img
                    className="popup__image"
                    src={`${props.isSucceeded ? successImage : unsuccessImage}`}
                    alt=""
                />
                <h2 className="popup__title">{`${
                    props.isSucceeded
                        ? "Вы успешно зарегистрировались!"
                        : "Что-то пошло не так! Попробуйте ещё раз."
                }`}</h2>
            </div>
        </div>
    );
}
export default InfoToolTip;
