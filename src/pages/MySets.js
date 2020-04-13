import React, { useState, useEffect } from "react";
import MainLayout from "components/layouts/MainLayout";
import UserSetsEdit from "components/elements/mySets/UserSetsEdit";
import SetEdition from "components/elements/mySets/SetEdition";
import PropTypes from "prop-types";
import Loading from "components/utils/Loading";
import { connect } from "react-redux";
import {
  fetchUserSet,
  fetchUserSets,
  createSet,
  updateSet,
  removeSet,
} from "actions/userSets";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import "./mySets.css";

const MySets = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [actionConfig, setActionConfig] = useState({});
  const [warningMessage, setWarningMessage] = useState({ active: false });
  const initialSet = {
    _id: "",
    name: "",
    language: { value: "", label: "" },
    foreignWords: ["", "", "", "", "", "", ""],
    polishWords: ["", "", "", "", "", "", ""],
  };
  const [currentSet, setCurrentSet] = useState(initialSet);
  const changeCurrentSet = (set) => setCurrentSet(set);

  const changeHappened = (val) => setHasChanges(true);

  const checkForChanges = (setID, action) => {
    if (hasChanges) {
      createWarningMessage(action, setID);
    } else {
      if (action === "fetch")
        props.fetchUserSet(setID).then((set) => setCurrentSet(set));
      else setCurrentSet(initialSet);
    }
  };

  const createWarningMessage = (action, setID, name) => {
    let question, text, buttonText;
    if (action === "remove") {
      question = `Czy na pewno usunąć zestaw ${name}?`;
      text = "Jest to działanie, którego nie można cofnąć.";
      buttonText = "Tak, usuń";
    } else {
      question = "Czy na pewno chcesz porzucić zmiany?";
      text = "Niezapisane treści zostaną utracone.";
      buttonText = "Tak, porzuć";
    }

    setActionConfig({ action, setID });
    setWarningMessage({
      question,
      text,
      buttonText,
      active: true,
    });
  };

  const triggerAction = () => {
    if (actionConfig.action === "fetch") {
      props.fetchUserSet(actionConfig.setID).then((set) => setCurrentSet(set));
    } else if (actionConfig.action === "remove") {
      props.removeSet(actionConfig.setID).then(() => {
        if (actionConfig.setID === currentSet._id) setCurrentSet(initialSet);
      });
    } else {
      setCurrentSet(initialSet);
    }

    setWarningMessage({ active: false });
    setHasChanges(false);
  };

  const createSet = (set) =>
    props.createSet(set).then((data) => {
      setCurrentSet(data.createdSet);
      setHasChanges(false);
    });

  const updateSet = (set) =>
    props.updateSet(set).then((data) => {
      setCurrentSet(data.updatedSet);
      setHasChanges(false);
    });

  useEffect(() => {
    if (props.fetched === false)
      props.fetchUserSets().then(() => setIsLoading(false));
    else setIsLoading(false);
  }, []);

  return (
    <MainLayout>
      <div className="my-sets">
        {isLoading ? (
          <div style={{ paddingTop: "20px" }}>
            <Loading />
          </div>
        ) : (
          <div className="my-sets-content spliting-box">
            <UserSetsEdit
              checkForChanges={checkForChanges}
              createWarningMessage={createWarningMessage}
              currentSetId={currentSet._id}
            />
            <SetEdition
              set={currentSet}
              changeHappened={changeHappened}
              checkForChanges={checkForChanges}
              changeCurrentSet={changeCurrentSet}
              createSet={createSet}
              updateSet={updateSet}
            />
          </div>
        )}
      </div>
      {warningMessage.active === true && (
        <Dialog className="warning-message">
          <b>{warningMessage.question}</b>
          <p>{warningMessage.text}</p>
          <button
            className="pure-btn warning-message-confirm"
            onClick={triggerAction}
          >
            {warningMessage.buttonText}
          </button>
          <button
            className="pure-btn warning-message-cancel"
            onClick={() => setWarningMessage({ active: false })}
          >
            Anuluj
          </button>
        </Dialog>
      )}
    </MainLayout>
  );
};

MySets.propTypes = {
  fetchUserSet: PropTypes.func.isRequired,
  fetchUserSets: PropTypes.func.isRequired,
  removeSet: PropTypes.func.isRequired,
  fetched: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    fetched: !!state.sets.fetched,
  };
}

export default connect(mapStateToProps, {
  fetchUserSet,
  fetchUserSets,
  createSet,
  updateSet,
  removeSet,
})(MySets);
