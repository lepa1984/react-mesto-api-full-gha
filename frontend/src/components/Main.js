import React from "react";

import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div
                    className="profile__avatar-wrapper"
                    onClick={props.onEditAvatar}
                >
                    <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="profile__avatar"
                    />
                </div>
                <div className="profile__wrapper">
                    <div className="profile__inner">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button
                            type="button"
                            aria-label="profile"
                            className="profile__button-edit"
                            onClick={props.onEditProfile}
                        ></button>
                    </div>

                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button
                    type="button"
                    aria-label="add-card"
                    className="profile__button-add"
                    onClick={props.onAddPlace}
                ></button>
            </section>
            <section className="cards">
                {props.cards.map((card) => {
                    return (
                        <Card
                            className="card"
                            card={card}
                            key={card._id}
                            onCardDelete={props.onCardDelete}
                            onCardClick={props.onCardClick}
                            onLikeClick={props.onLikeClick}
                        />
                    );
                })}
            </section>
        </main>
    );
}
