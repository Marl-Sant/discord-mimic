import React, { useState } from "react";
import CreateANewChannel from ".";
import OpenModalButton from "../OpenModalButton";

const CreateChannelModal = () => {

  return (
    <>
         <>
        <OpenModalButton
        buttonText={<i class="fa fa-solid fa-plus"></i>}
        modalComponent={<CreateANewChannel />}
        buttonStyle={"create-a-channel-button"}
      />
    </>
    </>
  );
};

export default CreateChannelModal;
