import React from "react";
import f1 from "images/f1.png";
import f2 from "images/f2.png";
import f3 from "images/f3.png";
import "./main.css";

const Main = () => {
  return (
    <div className="main">
      <div className="container">
        <div className="main-content">
          <div className="main-text">
            <h2 className="secondary-title">Własne zestawy słówek</h2>
            <p>Korzystaj z gotowych zestawów słówek lub utwórz swoje własne.</p>
            <p>
              Dzięki temu możesz powtarzać słownictwo na którym dokładnie ci
              zależy.
            </p>
            <p>
              Zaloguj się na swoje konto, wejdź w zakładkę "Moje zestawy" i
              utwórz nowy zestaw, a potem zacznij naukę w zakładce "Wybierz
              zestaw".
            </p>
          </div>
          <div className="main-grid">
            <img
              className="img1"
              src={f1}
              alt="Screenshot of czasnaslowka.pl"
            />
            <img
              className="img2"
              src={f2}
              alt="Screenshot of czasnaslowka.pl"
            />
            <img
              className="img3"
              src={f3}
              alt="Screenshot of czasnaslowka.pl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
