import React from 'react';
import { useSelector } from 'react-redux';

import classes from './Sent.module.css';
import MailData from './MailData';

const Sent = () => {
  const mail1 = useSelector((state) => state.auth.email);
  const mails = useSelector((state) => state.mail.mailData);

  const email = mail1;
  const sentMails = mails.filter((mail) => mail.from === email);

  const mailData = sentMails.map((mail) => (
    <MailData key={mail.id} mail={mail} mailId={mail.to} toOrFrom='To : '/>
  ));

  return <div className={classes.main}>{mailData}</div>;
};

export default Sent;