import React from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import avatar from "../images/man.png";
import { FaQuoteRight } from "react-icons/fa6";

function Review({ name, comment }) {
  return (
    <div className="p-4 md:w-1/3 relative">
      <FaQuoteRight size={70} className="absolute opacity-30 right-5 top-10" />
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <div className="p-6">
          <div id="img" className="flex justify-start items-center">
            <img className="h-10 rounded-full" src={avatar} alt="" />
            <h1 className="title-font pb-2 pl-4 text-lg font-medium text-gray-900 mb-3">
              {name}
            </h1>
          </div>
          <Rating name="read-only" value={5} readOnly />
          <p className="leading-relaxed mb-3 opacity-70 italic">{comment}</p>
        </div>
      </div>
    </div>
  );
}

export default Review;
