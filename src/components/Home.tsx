import { useTranslation } from "react-i18next";
import { i18n } from 'i18next';

const Test = () => {
    const[t, i18n]= useTranslation("global");

    const handleChangeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
      };
    return (
        <div>
            <p>{t("Next_Player")}</p>
            <p>{t("Player_Number")}</p>
            <p>{t("Settings")}</p>
            <p>{t("Background")}</p>
            <p>{t("Light")}</p>
            <p>{t("Dark")}</p>
            <p>{t("New_Game")}</p>
            <button onClick={() => handleChangeLanguage("en")}>EN</button>
            <br />
            <button onClick={() => handleChangeLanguage("hr")}>HR</button>
        </div>
    );
    }
    export default Test;