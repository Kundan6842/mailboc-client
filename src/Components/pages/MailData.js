import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./MailData.module.css";
import { replaceMail } from "../Store/mailactions";
import { deleteMail } from "../Store/mailactions";

const MailData = (props) => {
  const mail1 = useSelector((state) => state.auth.email);
  const loggedUserEmail = mail1;
  const emailUrl = loggedUserEmail.replace("@", "").replace(".", "");
  const [showBody, setShowBody] = useState(false);
  const dispatch = useDispatch();

  // checking if mail is read or not
  const readMailHandler = async () => {
    setShowBody((preState) => !preState);
    if (!props.mail.read) {
      const email = props.mail.to.replace("@", "").replace(".", "");
      try {
        const response = await fetch(
          `https://mail-box-93389-default-rtdb.firebaseio.com/${email}/${props.mail.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify({ ...props.mail, read: true }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw data.error;
        } else {
          dispatch(replaceMail(emailUrl, loggedUserEmail));
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // deleting mail
  const removeMailHandler = () => {
    dispatch(deleteMail(props.mail));
  };

  return (
    <div className={classes.complete}>
      {props.toOrFrom === "From : " && !props.mail.read && (
        <i className="ri-checkbox-blank-circle-fill"></i>
      )}
      <div className={classes.main}>
        <div onClick={readMailHandler} className={classes["mail-header"]}>
          <div className={classes.head}>
            <span>{props.toOrFrom}</span>
            <div className={classes.mailId}>
              <i className="ri-user-shared-fill"></i>
              <div>{props.mailId}</div>
            </div>
          </div>
          <div className={classes.title}>{props.mail.title}</div>
        </div>
        <div className={showBody ? classes.body : classes.notBody}>
          <div>{props.mail.text}</div>
          <i onClick={removeMailHandler} className="ri-delete-bin-6-fill"></i>
        </div>
      </div>
    </div>
  );
};

export default MailData;
