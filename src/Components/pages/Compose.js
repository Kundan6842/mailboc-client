import React, { useRef, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import classes from './Compose.module.css';
import { addMail } from '../Store/mailactions';


const Compose = () => {
  const mail1 = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const titleRef = useRef();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  const clearInputFields = () => {
    emailRef.current.value = '';
    titleRef.current.value = '';
    setEditorState(null);
  };

  const sendMailHandler = async (event) => {
    event.preventDefault();
    const mailData = {
      from: mail1,
      to: emailRef.current.value,
      title: titleRef.current.value,
      text: editorState.getCurrentContent().getPlainText(),
    };
    dispatch(addMail(mailData, clearInputFields));
  };

  return (
    <form className={classes.form} onSubmit={sendMailHandler}>
      <div className={classes.to}>
        <label>To : </label>
        <input type='email' ref={emailRef} required />
      </div>
      <div className={classes.title}>
        <label>Title : </label>
        <input type='text' ref={titleRef} required />
      </div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName={classes['wrapper-class']}
        editorClassName={classes['editor-class']}
        toolbarClassName={classes['toolbar-class']}
      />
      <div className={classes.button}>
        <button type='submit'>Send</button>
      </div>
    </form>
  );
};

export default Compose;