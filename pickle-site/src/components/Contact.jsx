import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import WhatsappImg from "../images/whatsapp (2).png";

function Contact() {
  const linkRef = useRef(null);

  useEffect(() => {
    if (linkRef.current) {
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(linkRef.current, {
        scale: 1.2,
        duration: 0.15,
        ease: "power2.out",
      })
        .to(
          linkRef.current,
          {
            scale: 1,
            duration: 0.15,
            ease: "power2.in",
          },
          0.15,
        )
        .to(
          linkRef.current,
          {
            scale: 1.2,
            duration: 0.15,
            ease: "power2.out",
          },
          0.3,
        )
        .to(
          linkRef.current,
          {
            scale: 1,
            duration: 0.15,
            ease: "power2.in",
          },
          0.45,
        )
        .to(
          linkRef.current,
          {
            scale: 1,
            duration: 0.6,
          },
          0.6,
        );
    }
  }, []);

  return (
    <div className="h-15 w-[100%]  bg-blue-500 z-[1000] fixed opacity-80  bottom-0">
      <div className="relative">
        <p className="text-xl text-white text-center pb-4 pt-3">
          Book A Home Visit Now!
        </p>
        <a
          ref={linkRef}
          className="absolute top-[-18px] right-7"
          href="https://wa.me/918519903096"
          target="_blank"
        >
          <img className="h-10" src={WhatsappImg} alt="" />
        </a>
      </div>
    </div>
  );
}

export default Contact;
