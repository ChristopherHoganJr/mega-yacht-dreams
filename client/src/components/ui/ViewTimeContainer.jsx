import React from "react";

const ViewTimeContainer = ({ time }) => {
  let splitTime = time?.split(":");
  let hour = Number(splitTime[0]);
  let minute = splitTime[1];
  if (hour % 12) hour = hour - 12;
  return (
    <p className='text-md md:text-lg text-center'>
      {hour % 12 ? hour : hour - 12}:{minute} {hour % 12 ? "PM" : "AM"}
    </p>
  );
};

export default ViewTimeContainer;
