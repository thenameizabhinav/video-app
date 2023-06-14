import React from "react";
import { PARTICIPANTS } from "../../utils/constants";

const ParticipiantsLabel = () => {
  return (
    <div className="participants_label_container">
      <p className="participants_label_paragraph">{PARTICIPANTS}</p>
    </div>
  );
};

export default ParticipiantsLabel;
