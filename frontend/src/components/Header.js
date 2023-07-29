import logo from "../images/logo.svg";
import React from "react";
import { Route, Routes, Link } from "react-router-dom";
export default function Header(props) {
    return (
        <header className="header">
            <img className="logo" src={logo} alt="Логотип" />
            <Routes>
                <Route
                    path="/sign-in"
                    element={
                        <Link to="/sign-up" className="header__link">
                            Регистрация
                        </Link>
                    }
                />
                <Route
                    path="/sign-up"
                    element={
                        <Link to="/sign-in" className="header__link">
                            Войти
                        </Link>
                    }
                />
                <Route
                    path="/"
                    element={
                        <div className="header__user">
                            <span className="header__email">{props.email}</span>
                            <Link
                                to="/sign-in"
                                className="header__link header__link_logout"
                                onClick={props.onLogOut}
                            >
                                Выйти
                            </Link>
                        </div>
                    }
                />
            </Routes>
        </header>
    );
}
