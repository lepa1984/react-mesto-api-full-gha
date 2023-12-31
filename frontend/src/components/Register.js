import { useState } from "react";
import { Link } from "react-router-dom";
function Register(props) {
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    });
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onRegister(formValue.email, formValue.password);
    }
    return (
        <div className="login">
            <p className="login__title">Регистрация</p>
            <form className="login__form" onSubmit={handleSubmit} name="login">
                <input
                    className="login__input"
                    name="email"
                    type="email"
                    value={formValue.email}
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    className="login__input"
                    name="password"
                    type="password"
                    value={formValue.password}
                    placeholder="Пароль"
                    onChange={handleChange}
                />
                <button type="submit" className="login__btn">
                    Зарегистрироваться
                </button>
            </form>
            <div className="login__inner">
                <p className="login__text">Уже зарегистрированы? </p>
                <Link className="login__link" to="/sign-in">
                    Войти
                </Link>
            </div>
        </div>
    );
}
export default Register;
