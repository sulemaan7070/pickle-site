import React from "react";
import machine from "../images/machine.jpg";
import machine2 from "../images/machine2.jpg";
import machine3 from "../images/machine3.jpg";
import machine4 from "../images/machine4.jpg";
import machine5 from "../images/machine5.jpg";
function Equipment() {
  return (
    <>
      <h3 className="text-blue-600 text-3xl text-center p-8">Equipment</h3>
      <div className="flex flex-wrap lg:flex-nowrap justify-center items-center">
        <div className="w-[50%]">
          <img className="h-60 m-4 rounded-lg shadow-lg" src={machine} alt="" />
          <p className="text-center ">Magnus microscope </p>
        </div>
        <div className="w-[50%] p-3">
          <img
            className="h-60 m-4 rounded-lg shadow-lg"
            src={machine2}
            alt=""
          />
          <p className="text-center ">ERBA chem 7 biochemistry </p>
        </div>
        <div className="w-[50%] p-3">
          <img
            className="h-60 m-4 rounded-lg shadow-lg"
            src={machine3}
            alt=""
          />
          <p className="text-center ">CBP cellcounter </p>
        </div>
        <div className="w-[50%] p-3">
          <img
            className="h-60 m-4 rounded-lg shadow-lg"
            src={machine4}
            alt=""
          />
          <p className="text-center p-3">Thyroid machine</p>
        </div>
        <div className="w-[50%] p-3">
          <img
            className="h-60 m-4 rounded-lg shadow-lg"
            src={machine5}
            alt=""
          />
          <p className="text-center p-3">Hbalc sugar machine</p>
        </div>
      </div>
    </>
  );
}

export default Equipment;
