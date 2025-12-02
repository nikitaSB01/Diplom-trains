import React from 'react';

import styles from './Footer.module.css';
import { ReactComponent as PhoneIcon } from '../../../assets/icons/Footer/icon1_phone.svg';
import { ReactComponent as MailIcon } from '../../../assets/icons/Footer/icon2_sms.svg';
import { ReactComponent as SkypeIcon } from '../../../assets/icons/Footer/icon3_skype.svg';
import { ReactComponent as LocationIcon } from '../../../assets/icons/Footer/icon4_geo.svg';

import { ReactComponent as YoutubeIcon } from '../../../assets/icons/Footer/icon1_youTube.svg';
import { ReactComponent as LinkedinIcon } from '../../../assets/icons/Footer/icon2_in.svg';
import { ReactComponent as GoogleIcon } from '../../../assets/icons/Footer/icon3_g.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/icons/Footer/icon4_f.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/icons/Footer/icon5_tw.svg';

import { ReactComponent as ArrowUpIcon } from '../../../assets/icons/Footer/iconUp.svg';
import PopupMessage from "../../PopupMessage/PopupMessage";

const Contacts: React.FC = () => {

  const [email, setEmail] = React.useState("");
  const [popup, setPopup] = React.useState<null | { type: "error" | "success"; title: string; text: string }>(null);
  const handleSubscribe = async () => {
    const trimmed = email.trim();

    if (!trimmed || !trimmed.includes("@")) {
      setPopup({
        type: "error",
        title: "Некорректный email",
        text: "Введите действительный адрес электронной почты.",
      });
      return;
    }

    try {
      await fetch(
        `https://students.netoservices.ru/fe-diplom/subscribe?email=${encodeURIComponent(trimmed)}`
      );

      // по ТЗ подписка всегда успешна
      setPopup({
        type: "success",
        title: "Вы успешно подписались!",
        text: "Теперь вы будете получать наши новости.",
      });
      setEmail("");

    } catch {
      setPopup({
        type: "success",
        title: "Вы успешно подписались!",
        text: "Система обработки выполнена.",
      });
      setEmail("");
    }
  };

  return (
    <section id="contacts" className={styles.contacts}>
      {/* Верхний блок */}
      <div className={styles.topBlock}>
        <div className={styles.container}>
          {/* Левая часть — контакты */}
          <div className={styles.contactInfo}>
            <h2 className={styles.title}>Свяжитесь с нами</h2>
            <ul className={styles.list}>
              <li className={styles.item}>
                <PhoneIcon className={styles.icon} />
                <p>8 (800) 000 00 00</p>
              </li>
              <li className={styles.item}>
                <MailIcon className={styles.icon} />
                <p>inbox@mail.ru</p>
              </li>
              <li className={styles.item}>
                <SkypeIcon className={styles.icon} />
                <p>tu.train.tickets</p>
              </li>
              <li className={styles.item}>
                <LocationIcon className={styles.icon} />
                <p>
                  г. Москва
                  <br />
                  ул. Московская 27-35
                  <br />
                  555 555
                </p>
              </li>
            </ul>
          </div>

          {/* Правая часть — подписка */}
          <div className={styles.subscribe}>
            <h2 className={styles.title}>Подписка</h2>
            <label htmlFor="email" className={styles.label}>
              Будьте в курсе событий
            </label>
            <div className={styles.form}>
              <input
                type="email"
                id="email"
                placeholder="e-mail"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>

              </div>
              <button
                type="button"
                className={styles.button}
                onClick={handleSubscribe}
              >
                ОТПРАВИТЬ
              </button>
              {popup && (
                <PopupMessage
                  type={popup.type}
                  title={popup.title}
                  text={popup.text}
                  onClose={() => setPopup(null)}
                />
              )}
            </div>

            <h2 className={styles.title}>Подписывайтесь на нас</h2>
            <div className={styles.socials}>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <YoutubeIcon />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <LinkedinIcon />
              </a>
              <a href="https://google.com" target="_blank" rel="noreferrer">
                <GoogleIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FacebookIcon />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <TwitterIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Нижний блок */}
      <div className={styles.bottomBlock}>
        <div className={styles.bottomContainer}>
          <div className={styles.logo}>Лого</div>
          <ArrowUpIcon
            className={styles.upButton}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          <div className={styles.copy}>2018 WEB</div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
