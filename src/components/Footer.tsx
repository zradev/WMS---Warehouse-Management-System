import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="w-full bg-stone-900 h-fit p-3 text-center text-gray-300">
        <p>
          Frontend hosted for <span className="text-white">free</span> on{" "}
          <a
            href="https://firebase.google.com/"
            className="text-lg text-white p-1"
          >
            Firebase
          </a>
        </p>
        <p>
          Backend hosted for <span className="text-white">free</span> on{" "}
          <a href="https://app.cyclic.sh/" className="text-lg text-white p-1">
            Cyclic
          </a>
        </p>
        <p>
          Developed by: <span className="text-white">Zlatomir Radev</span>. Find
          the Source Code on
          <a
            href="https://github.com/zradev"
            className="text-lg text-white p-1"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
