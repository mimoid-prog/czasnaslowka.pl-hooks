import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { fetchUserSet } from "actions/userSets";
import { fetchPublicSet } from "actions/publicSets";
import { connect } from "react-redux";
import MainLayout from "components/layouts/MainLayout";
import Loading from "components/utils/Loading";
import { Pie } from "react-chartjs-2";
import { Scrollbars } from "react-custom-scrollbars";
import repeatImg from "images/refresh.png";
import "./learning.css";

const Learning = (props) => {
  const scrollbar = useRef(null);
  let query = useQuery();
  const method = query.get("method");

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [set, setSet] = useState({
    foreignWords: [],
    polishWords: [],
  });
  const [learningEnded, setLearningEnded] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState({
    items: ["-", "-", "-", "-", "-", "-"],
    isCorrect: ["def", "def", "def", "def", "def", "def"],
    correct: 0,
    index: 0,
  });
  const [timer, setTimer] = useState({
    count: 0,
    isRunning: false,
  });
  const [chart, setChart] = useState({});

  const shuffleArray = (array, array2) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      [array2[i], array2[j]] = [array2[j], array2[i]];
    }
  };

  const checkKey = (e) => {
    if (e.key === "Enter") checkAnswer();
  };

  const checkAnswer = (val = false) => {
    if (answers.index === 0) setTimer({ count: timer.count, isRunning: true });

    let newItems = answers.items.slice(0);
    newItems[answers.index] =
      set.foreignWords[answers.index] + " - " + set.polishWords[answers.index];
    var newIsCorrect, newCorrect;
    let newIndex = answers.index + 1;

    if (
      answer.toLowerCase() === set.foreignWords[answers.index] ||
      val === true
    ) {
      newIsCorrect = answers.isCorrect.slice(0);
      newIsCorrect[answers.index] = "correct-answer";
      newCorrect = answers.correct + 1;
    } else {
      newIsCorrect = answers.isCorrect.slice(0);
      newIsCorrect[answers.index] = "wrong-answer";
      newCorrect = answers.correct;
    }

    setAnswer("");
    setAnswers({
      items: newItems,
      isCorrect: newIsCorrect,
      correct: newCorrect,
      index: newIndex,
    });

    if (newIndex === set.foreignWords.length) {
      setTimer({ count: timer.count, isRunning: false });
      setChart({
        labels: ["Poprawne", "Niepoprawne"],
        datasets: [
          {
            data: [newCorrect, newIndex - newCorrect],
            backgroundColor: ["#4ba851", "#db3f3f"],
            hoverBackgroundColor: ["#49b350", "#eb3b3b"],
          },
        ],
      });
      setLearningEnded(true);
    }
  };

  const resetState = () => {
    const newForeignWords = set.foreignWords.slice(0);
    const newPolishWords = set.polishWords.slice(0);
    shuffleArray(newForeignWords, newPolishWords);
    setSet({
      foreignWords: newForeignWords,
      polishWords: newPolishWords,
    });

    setAnswers({
      items: ["-", "-", "-", "-", "-", "-"],
      isCorrect: ["def", "def", "def", "def", "def", "def"],
      correct: 0,
      index: 0,
    });

    setTimer({
      count: 0,
      isRunning: false,
    });

    setLearningEnded(false);
  };

  useInterval(
    () => {
      setTimer({ count: timer.count + 1, isRunning: timer.isRunning });
    },
    timer.isRunning ? 1000 : null
  );

  useEffect(() => {
    const id = query.get("id");
    const isPublic = query.get("public");
    if (isPublic === "no") {
      props
        .fetchUserSet(id)
        .then((res) => {
          setIsLoading(false);
          shuffleArray(res.foreignWords, res.polishWords);
          setSet({
            foreignWords: res.foreignWords,
            polishWords: res.polishWords,
          });
        })
        .catch((err) => {
          setIsLoading(false);
          setErrorMessage(err.response.data.error);
        });
    } else {
      props
        .fetchPublicSet(id)
        .then((res) => {
          setIsLoading(false);
          shuffleArray(res.foreignWords, res.polishWords);
          setSet({
            foreignWords: res.foreignWords,
            polishWords: res.polishWords,
          });
        })
        .catch((err) => {
          setIsLoading(false);
          setErrorMessage(err.response.data.error);
        });
    }
  }, []);

  useEffect(() => {
    if (answers.index > 6) {
      scrollbar.current.scrollToBottom();
    }
  }, [answers.index]);

  console.log("err", errorMessage);
  return (
    <MainLayout>
      <div className="learning">
        <div className="container">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {!errorMessage ? (
                <div className="learning-content">
                  {!learningEnded ? (
                    <div className="learning-section">
                      <h3 className="tertiary-title">
                        Pozostałe słówka:{" "}
                        {set.foreignWords.length - answers.index}
                      </h3>

                      {method === "with" ? (
                        <div className="with-box">
                          <div className="word-banner1">
                            <p>{set.polishWords[answers.index]}</p>
                          </div>
                          <div className="word-banner2">
                            <input
                              className="pure-btn answer-input"
                              value={answer}
                              onChange={(e) => setAnswer(e.target.value)}
                              onKeyPress={checkKey}
                            />
                          </div>
                          <button
                            className="no-border-btn pure-btn ess-btn blue-btn"
                            onClick={checkAnswer}
                          >
                            sprawdź
                          </button>
                        </div>
                      ) : (
                        <div className="without-box">
                          <div className="word-banner3">
                            <p>{set.foreignWords[answers.index]}</p>
                          </div>
                          <button
                            className="no-border-btn pure-btn wo-btn"
                            onClick={() => checkAnswer(true)}
                          >
                            znam
                          </button>
                          <button
                            className="no-border-btn pure-btn wo-btn-2"
                            onClick={() => checkAnswer(false)}
                          >
                            nie znam
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="statistics-section">
                      <h2 className="tertiary-title">Wyniki</h2>
                      <div className="statistics-box">
                        <Pie data={chart} />
                        <div className="timer">
                          <p className="seconds">{timer.count} sek</p>
                        </div>
                      </div>
                      <div className="again-btn" onClick={resetState}>
                        <div>
                          <img
                            src={repeatImg}
                            className="icon"
                            alt="Ikonka powtórzenia"
                          />
                          <p>Zacznij ponownie</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="answers-section">
                    <h3 className="tertiary-title">Odpowiedzi:</h3>
                    <div className="answers-box">
                      <Scrollbars style={{ height: 264 }} ref={scrollbar}>
                        {answers.items.map((item, i) => (
                          <p key={i} className={answers.isCorrect[i]}>
                            {item}
                          </p>
                        ))}
                      </Scrollbars>
                    </div>
                  </div>
                </div>
              ) : (
                <h3 className="tertiary-title page-error-message">
                  {errorMessage}
                </h3>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default connect(null, { fetchUserSet, fetchPublicSet })(Learning);
