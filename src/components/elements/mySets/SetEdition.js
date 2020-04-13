import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";
import BubbleLoading from "components/utils/BubbleLoading";
import faq from "images/faq.png";
import Select from "react-select";

const SetEdition = (props) => {
  const scrollbar = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", error: true });
  const [showHelp, setShowHelp] = useState(false);

  const [originalSet, setOriginalSet] = useState(props.set);
  const [set, setSet] = useState(props.set);
  let amountOfLines = set.foreignWords.length;

  const selectOptions = [
    { value: "english", label: "angielski" },
    { value: "czech", label: "czeski" },
    { value: "danish", label: "duński" },
    { value: "finnish", label: "fiński" },
    { value: "french", label: "francuski" },
    { value: "greek", label: "grecki" },
    { value: "spanish", label: "hiszpański" },
    { value: "dutch", label: "holenderski" },
    { value: "icelandic", label: "islandzki" },
    { value: "german", label: "niemiecki" },
    { value: "norwegian", label: "norweski" },
    { value: "portuguese", label: "portugalski" },
    { value: "russian", label: "rosyjski" },
    { value: "swedish", label: "szwedzki" },
    { value: "hungarian", label: "węgierski" },
    { value: "italian", label: "włoski" },
  ];

  const handleKeyPress = (e) => {
    if (e.which === 13) e.preventDefault();
  };

  const handleChange = (e) => {
    setSet({
      ...set,
      [e.target.name]: e.target.value,
    });

    props.changeHappened();
  };

  const handleLanguageChange = (selectedOption) => {
    setSet({
      ...set,
      language: selectedOption,
    });

    props.changeHappened();
  };

  const handleWordsChange = (e) => {
    const lang = e.target.getAttribute("data-lang");
    const number = Number(e.target.getAttribute("data-number"));

    if (lang === "foreign") {
      const arr = set.foreignWords.slice(0);
      arr[number] = e.target.value;
      setSet({
        ...set,
        foreignWords: arr,
      });
    } else {
      const arr = set.polishWords.slice(0);
      arr[number] = e.target.value;
      setSet({
        ...set,
        polishWords: arr,
      });
    }

    props.changeHappened();
  };

  const addInput = () => {
    const fArr = set.foreignWords.slice(0);
    const pArr = set.polishWords.slice(0);

    if (fArr[amountOfLines - 2] !== "" || pArr[amountOfLines - 2] !== "") {
      fArr.push("");
      pArr.push("");

      setSet({
        ...set,
        foreignWords: fArr,
        polishWords: pArr,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    //Check if every row has a pair of words
    let arePairs = true;
    for (let j = 0; j < set.foreignWords.length; j++) {
      if (
        (set.foreignWords[j] === "" && set.polishWords[j] !== "") ||
        (set.foreignWords[j] !== "" && set.polishWords[j] === "")
      ) {
        setMessage({
          text:
            "Nie wszystkie słowa mają parę. Dodaj brakujące słowa lub zostaw oba pola w rzędzie puste.",
          error: true,
        });
        setIsLoading(false);
        arePairs = false;
        break;
      }
    }
    if (arePairs === false) return false;

    //Check if name or polishWords or foreignWords are not empty
    const fNoEmptyInputs = set.foreignWords.filter((word) => word !== "");
    const pNoEmptyInputs = set.polishWords.filter((word) => word !== "");
    if (
      set.name === "" ||
      set.language.value === "" ||
      fNoEmptyInputs.length === 0 ||
      pNoEmptyInputs.length === 0
    ) {
      setMessage({
        text:
          "Wypełnij wszystkie wymagane pola, czyli nazwa zestawu, język i co najmniej jedna para wyrazów.",
        error: true,
      });
      setIsLoading(false);
      return false;
    } else {
      if (set._id === "") {
        const newSet = {
          ...set,
          language: set.language.value,
          foreignWords: fNoEmptyInputs,
          polishWords: pNoEmptyInputs,
        };
        props
          .createSet(newSet)
          .then(() => {
            setMessage({ text: "Zapisano.", error: false });
            setIsLoading(false);
          })
          .catch((err) => {
            setMessage({ text: err.response.data.error, error: true });
            setIsLoading(false);
          });
      } else {
        //Check if changes were not made
        let change = false;

        if (
          originalSet.name !== set.name ||
          originalSet.language !== set.language
        ) {
          change = true;
        } else {
          for (let i = 0; i < set.foreignWords.length; i++) {
            if (
              originalSet.foreignWords[i] !== set.foreignWords[i] ||
              originalSet.polishWords[i] !== set.polishWords[i]
            ) {
              change = true;
            }
          }
        }

        if (change) {
          const updatedSet = {
            ...set,
            language: set.language.value,
            foreignWords: fNoEmptyInputs,
            polishWords: pNoEmptyInputs,
          };
          props
            .updateSet(updatedSet)
            .then(() => {
              setMessage({ text: "Zapisano.", error: false });
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setMessage({ text: err.response.data.error, error: true });
              setIsLoading(false);
            });
        } else {
          setMessage({ text: "Dokonaj zmian przed zapisaniem.", error: true });
          setIsLoading(false);
          return false;
        }
      }
    }
  };

  useEffect(() => {
    if (props.set._id !== "") {
      const fetchedSet = {
        ...props.set,
        foreignWords: props.set.foreignWords.slice(0),
        polishWords: props.set.polishWords.slice(0),
      };

      if (fetchedSet.foreignWords.length < 7) {
        for (let i = fetchedSet.foreignWords.length; i < 7; i++) {
          fetchedSet.foreignWords.push("");
          fetchedSet.polishWords.push("");
        }
      } else {
        fetchedSet.foreignWords.push("");
        fetchedSet.polishWords.push("");
      }

      let label;
      for (let j = 0; j < selectOptions.length; j++) {
        if (selectOptions[j].value === fetchedSet.language) {
          label = selectOptions[j].label;
          break;
        }
      }

      const preparedSet = {
        _id: fetchedSet._id,
        name: fetchedSet.name,
        language: { value: fetchedSet.language, label },
        foreignWords: fetchedSet.foreignWords.slice(0),
        polishWords: fetchedSet.polishWords.slice(0),
      };

      setOriginalSet(preparedSet);
      setSet(preparedSet);
      setMessage({ text: "", error: false });
    } else {
      setOriginalSet(props.set);
      setSet(props.set);
      setMessage({ text: "", error: false });
    }
  }, [props.set._id]);

  useEffect(() => {
    if (amountOfLines > 7) scrollbar.current.scrollToBottom();
  }, [set.foreignWords]);

  return (
    <div className="set-edition">
      <div className="set-edition-content">
        <form onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
          <h2 className="secondary-title set-edition-title">
            {originalSet._id ? "Edytowanie zestawu" : "Utwórz nowy zestaw"}
          </h2>
          <ul className="set-edition-list">
            <li>
              <div className="name-of-set-item">
                <label>Nazwa zestawu:</label>
                <input
                  type="text"
                  name="name"
                  value={set.name}
                  onChange={handleChange}
                  maxLength="24"
                  spellCheck="false"
                  required
                />
              </div>

              <div className="language-of-set-item">
                <label>Wybierz język:</label>

                <Select
                  name="language"
                  value={set.language}
                  onChange={handleLanguageChange}
                  noResultsText="Brak"
                  required={true}
                  options={selectOptions}
                />
              </div>
            </li>
            <li className="words-item">
              <ul className="words-columns">
                <li className="words-languages">
                  <label>Język obcy:</label>
                  <label>Język polski:</label>
                </li>
                <li>
                  <ul id="words-list" className="words-list">
                    <Scrollbars style={{ height: 301 }} ref={scrollbar}>
                      {set.foreignWords.map((e, i) => (
                        <li key={i}>
                          <input
                            type="text"
                            data-lang="foreign"
                            data-number={i}
                            className="foreign-word"
                            value={set.foreignWords[i]}
                            onChange={handleWordsChange}
                            onClick={i + 1 === amountOfLines ? addInput : null}
                            spellCheck="false"
                            maxLength="46"
                          />
                          <input
                            type="text"
                            data-lang="polish"
                            data-number={i}
                            className="polish-word"
                            value={set.polishWords[i]}
                            onChange={handleWordsChange}
                            onClick={i + 1 === amountOfLines ? addInput : null}
                            spellCheck="false"
                            maxLength="46"
                          />
                        </li>
                      ))}
                    </Scrollbars>
                  </ul>
                </li>
              </ul>
            </li>

            <li className="buttons-item">
              <button
                type="submit"
                className="pure-btn ess-btn pink-btn save-btn"
              >
                {isLoading ? (
                  <BubbleLoading width="25px" height="25px" />
                ) : (
                  "Zapisz"
                )}
              </button>

              <button
                type="button"
                onClick={() => props.checkForChanges("", "empty")}
                className="pure-btn ess-btn reverse-btn"
              >
                Utwórz nowy
              </button>
            </li>
          </ul>
          <p className={`set-edition-message ${message.error ? "error" : ""}`}>
            {message.text && message.text}
          </p>
          <div className="help-box">
            <img onClick={() => setShowHelp(!showHelp)} src={faq} alt="faq" />
            <div className={`help-content ${showHelp ? "active" : ""}`}>
              <p>
                Aby utworzyć zestaw musisz podać nazwę zestawu, język oraz
                wypisać przynajmniej jedną parę słówek.
              </p>
              <p>Max długość nazwy zestawu - 24 znaki</p>
              <p>Słówka - max 50 par słówek</p>
              <p>Max dłuość jednego słówka - 30 znaków</p>
              <p>Max liczba zestawów - 10</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

SetEdition.propTypes = {
  set: PropTypes.object.isRequired,
  changeHappened: PropTypes.func.isRequired,
  createSet: PropTypes.func.isRequired,
  updateSet: PropTypes.func.isRequired,
};

export default SetEdition;
