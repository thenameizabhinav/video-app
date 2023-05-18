import React from "react";

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className="error_message_container">
      <p className="error_message_paragraph">{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;
