import React, { useState } from "react";

// components
import AddForm_TextInput from "./forms/AddForm_TextInput";
import AddForm_TextArea from "./forms/AddForm_TextArea";
import AddForm_ImageInput from "./forms/AddForm_ImageInput";
import AddForm_Amenities from "./forms/AddForm_Amenities";
import AddForm_NumberInput from "./forms/AddForm_NumberInput";
import AddForm_TimeInput from "./forms/AddForm_TimeInput";

const Account_Yachts_AddForm = () => {
  const [formInfo, setFormInfo] = useState({
    title: "",
    address: "",
    photos: [],
    description: "",
    amenities: [],
    additionalInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuests: 1,
  });

  const formChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
    console.log(formInfo);
  };

  console.log(formInfo.photos);

  return (
    <form action='' className='flex flex-col gap-5'>
      <AddForm_TextInput
        name={"title"}
        title={"Yacht Name"}
        description={"Give your yacht an exciting name!"}
        placeholder_text={"What does the captain call the ship."}
        inputValue={formInfo.title}
        setInputValue={formChange}
      />
      <AddForm_TextInput
        name={"address"}
        title={"Location of Yacht"}
        description={"Where is the yacht located?"}
        placeholder_text={"Where will the voyage begin"}
        inputValue={formInfo.address}
        setInputValue={formChange}
      />
      <AddForm_ImageInput formInfo={formInfo} setFormInfo={setFormInfo} />
      <AddForm_TextArea
        name={"description"}
        title={"Yacht Description"}
        description={"Tell us about the yacht."}
        placeholder_text={"Whats the yacht like?"}
        inputValue={formInfo.description}
        setInputValue={formChange}
      />
      <AddForm_Amenities formInfo={formInfo} setFormInfo={setFormInfo} />
      <AddForm_TextArea
        name={"additionalInfo"}
        title={"Additional Info"}
        description={"Anything else we must know?"}
        placeholder_text={"Tell us the good, the bad, and whats special"}
        inputValue={formInfo.additionalInfo}
        setInputValue={formChange}
      />
      <div className='grid grid-cols-3 gap-4'>
        <AddForm_TimeInput
          name={"checkIn"}
          title={"Check In Time"}
          placeholder_text={"15:00"}
          inputValue={formInfo.checkIn}
          setInputValue={formChange}
        />
        <AddForm_TimeInput
          name={"checkOut"}
          title={"Check out Time"}
          placeholder_text={"12:00"}
          inputValue={formInfo.checkOut}
          setInputValue={formChange}
        />
        <AddForm_NumberInput
          name={"maxGuests"}
          title={"Max number of guests"}
          placeholder_text={"50"}
          inputValue={formInfo.maxGuests}
          setInputValue={formChange}
        />
      </div>

      <button className='rounded-full py-2 px-4 text-white'>
        Add Yacht To Your List{" "}
      </button>
    </form>
  );
};

export default Account_Yachts_AddForm;
