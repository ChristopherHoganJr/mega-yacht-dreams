import React, { useState } from "react";

const AddForm_AmenitiesSelector = ({ icon, title, formInfo, setFormInfo }) => {
  const [checked, setChecked] = useState(formInfo.amenities.includes(title));

  const changeHandler = (e) => {
    e.preventDefault();
    setChecked(!checked);
    if (!checked) {
      setFormInfo({
        ...formInfo,
        amenities: [...formInfo.amenities, title],
      });
    } else {
      let valueIdx = formInfo.amenities.indexOf(title);
      formInfo.amenities.splice(valueIdx, 1);
    }
  };

  return (
    <div
      className={`border p-4 rounded-lg gap-2 flex items-center transition-all cursor-pointer ${
        checked ? "bg-green-600 text-white" : ""
      }`}
      onClick={(e) => changeHandler(e)}>
      {icon}
      <h4>{title}</h4>
      <input
        type='checkbox'
        name={title}
        id=''
        onChange={changeHandler}
        checked={checked}
        className='hidden'></input>
    </div>
  );
};

export default AddForm_AmenitiesSelector;
