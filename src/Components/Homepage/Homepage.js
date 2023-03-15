import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Sidebar from "../pages/Sidebar";
import Compose from "../pages/Compose";
import Sent from "../pages/Sent";
import Received from "../pages/Received";
import { replaceMail } from "../Store/mailactions";
import { updateMail } from "../Store/mailactions";

const Home = () => {
  const state = useSelector((state) => state.show);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const mail1 = useSelector((state) => state.auth.email);
  const firstTime = useSelector((state) => state.mail.firstTime);
  const currentMailData = useSelector((state) => state.mail.mailData);
  const dispatch = useDispatch();

  if (isLoggedIn && firstTime) {
    const loggedUserEmail = mail1;
    const emailUrl = loggedUserEmail.replace("@", "").replace(".", "");
    dispatch(replaceMail(emailUrl, loggedUserEmail));
  }

  setInterval(() => {
    if (isLoggedIn) {
      const loggedUserEmail = mail1;
      const emailUrl = loggedUserEmail.replace("@", "").replace(".", "");
      dispatch(updateMail(emailUrl, loggedUserEmail, currentMailData));
    }
  }, 5000);

  return (
    <React.Fragment>
      <Sidebar />
      {state.compose && <Compose />}
      {state.sent && <Sent />}
      {state.received && <Received />}
    </React.Fragment>
  );
};

export default Home;
