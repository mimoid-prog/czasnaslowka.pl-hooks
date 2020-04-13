import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Arrow } from "images/arrow.svg";
import Loading from "components/utils/Loading";
import api from "api";

const PublicSets = () => {
  let location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [sets, setSets] = useState([]);

  useEffect(() => {
    api.publicSets.fetchPublicSets(location.state.language).then((data) => {
      setIsLoading(false);
      setSets(data);
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="categories">
          <h2 className="secondary-title">Zestawy:</h2>
          <ul>
            {sets.map((item, i) => (
              <li className="item set-field" key={i}>
                <Link
                  to={{
                    pathname: `/zacznij-nauke/tryb`,
                    state: {
                      id: item.id,
                      public: "yes",
                    },
                  }}
                >
                  <img
                    src={require(`images/icons/categories/${item.icon}.png`)}
                    alt={item.name}
                    className="icon"
                  />
                  <div>
                    <p className="set-name">{item.name}</p>
                    <p className="quantity-of-words">
                      ilość słów: {item.quantityOfWords}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/zacznij-nauke"
            className="no-border-btn no-bg-btn pure-btn back"
          >
            <Arrow className="back-icon" />
            <p>Wróć</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PublicSets;
