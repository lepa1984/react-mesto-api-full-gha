import image01 from "../images/colisey.jpg";
import image02 from "../images/pisa.jpg";
import image03 from "../images/arhangelsk.jpg";
import image04 from "../images/astrahan.jpg";
import image05 from "../images/vityazevo.jpg";
import image06 from "../images/zmeyka.jpg";
export const openPopupProfile = document.querySelector(".profile__button-edit");
export const addCardButton = document.querySelector(".profile__button-add");
export const cardsContainer = document.querySelector(".cards");
export const formEdit = document.querySelector("#form-edit");
export const avatar = document.querySelector(".profile__avatar-wrapper");
export const formAdd = document.querySelector("#form-add");
export const formAvatar = document.querySelector("#form-avatar");
export const nameInput = formEdit.querySelector(".form__input_name_value");
export const jobInput = formEdit.querySelector(".form__input_about_value");
export const locationInput = formAdd.querySelector(
    ".form__input_location_value"
);
export const linkInput = formAdd.querySelector(".form__input_link_value");
export const initialCards = [
    {
        name: "Колизей",
        link: image01,
    },
    {
        name: "Пиза - падающая башня",
        link: image02,
    },
    {
        name: "Архангельск",
        link: image03,
    },
    {
        name: "Астрахань",
        link: image04,
    },
    {
        name: "Витязево",
        link: image05,
    },
    {
        name: "Гора Змейка",
        link: image06,
    },
];
export const objectValidation = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
};
