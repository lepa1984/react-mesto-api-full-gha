import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__heart ${
        isLiked && "card__heart_active"
    }`;

    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick() {
        props.onLikeClick(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <article className="card">
            {isOwn && (
                <button className="card__delete" onClick={handleDeleteClick} />
            )}
            <img
                src={props.card.link}
                alt={props.card.name}
                className="card__image"
                onClick={handleClick}
            />

            <h2 className="card__title">{props.card.name}</h2>
            <div className="card__inner">
                <button
                    type="button"
                    aria-label="heart"
                    className={cardLikeButtonClassName}
                    onClick={handleLikeClick}
                ></button>
                <div className="card__count">{props.card.likes.length}</div>
            </div>
        </article>
    );
}
