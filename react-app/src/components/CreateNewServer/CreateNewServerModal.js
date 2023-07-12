import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateNewServer from ".";
import OpenModalButton from "../OpenModalButton";


const CreateNewServerModal = () => {

  return (
    <>
        <OpenModalButton
        buttonText={<i class="fa fa-solid fa-plus"></i>}
        modalComponent={<CreateNewServer />}
        buttonStyle={"create-a-server-button"}
      />
    </>
  );
};

export default CreateNewServerModal;
