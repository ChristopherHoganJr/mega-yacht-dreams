const AddForm_TextArea = ({
  name,
  title,
  description,
  placeholder_text,
  inputValue,
  setInputValue,
}) => {
  return (
    <div className='flex flex-col justify-between border border-black p-4 rounded-lg gap-2'>
      <h3 className='font-semibold text-2xl'>{title}</h3>
      <p className='text-sm'>{description}</p>
      <textarea
        className='border-black'
        name={name}
        type='text'
        placeholder={placeholder_text}
        value={inputValue}
        onChange={(e) => setInputValue(e)}
      />
    </div>
  );
};

export default AddForm_TextArea;
