import React from "react";
import ParticipiantsLabel from "./ParticipantsLabel";
import Participiants from "./Participants";

const ParticipantsSection = () => {
  return (
    <div className="participants_section_container">
      <ParticipiantsLabel />
      <Participiants />
    </div>
  );
};

export default ParticipantsSection;
