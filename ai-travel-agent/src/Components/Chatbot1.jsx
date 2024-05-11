import React, { useEffect } from "react";

const DialogflowMessenger = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"
      />
      <df-messenger
        project-id="tavller"
        agent-id="35cf6612-dec8-41d8-ad33-09dd3af2fb0c"
        language-code="en"
        max-query-length="-1"
      >
        <df-messenger-chat-bubble chat-title="Jagath"></df-messenger-chat-bubble>
      </df-messenger>
      <style>
        {`
          df-messenger {
            z-index: 999;
            position: fixed;
            bottom: 16px;
            right: 16px;
          }
        `}
      </style>
    </div>
  );
};

export default DialogflowMessenger;
