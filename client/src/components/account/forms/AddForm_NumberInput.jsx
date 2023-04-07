import React from "react";

const AddForm_NumberInput = ({
  name,
  title,
  placeholder_text,
  inputValue,
  setInputValue,
}) => {
  return (
    <div className='flex flex-col justify-between border border-black p-4 rounded-lg gap-2'>
      <h3 className='font-semibold text-2xl'>{title}</h3>

      <input
        className='border-black'
        name={name}
        type='number'
        placeholder={placeholder_text}
        value={inputValue}
        onChange={(e) => setInputValue(e)}
      />
    </div>
  );
};

export default AddForm_NumberInput;
