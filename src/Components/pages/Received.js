import React from 'react';
import { useSelector } from 'react-redux';

import classes from './Received.module.css'
import MailData from './MailData';

const Received = () => {
  const mail1 = useSelector((state) => state.auth.email);
  const mails = useSelector((state) => state.mail.mailData);

  const email = mail1;
  const receivedMails = mails.filter((mail) => mail.to === email);

  const mailData = receivedMails.map((mail) => (
    <MailData key={mail.id} mail={mail} mailId={mail.from} toOrFrom='From : '/>
  ));

  return (
    <div className={classes.main}>
      {mailData}
    </div>
  );
};

export default Received;