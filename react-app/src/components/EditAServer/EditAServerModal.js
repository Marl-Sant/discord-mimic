import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditAServer from ".";
import OpenModalButton from "../OpenModalButton";

const EditAServerModal = () => {
  return (
    <>
        <OpenModalButton
        buttonText={<i className="fa fa-solid fa-pen"></i>}
        modalComponent={<EditAServer />}
        buttonStyle={"edit-a-server-button"}
      />
    </>
  );
};

export default EditAServerModal;
