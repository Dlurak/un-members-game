import React from "react";

interface InformationProps {
  flag: string;
  country: string;
  capital: string;
}

export const Information: React.FC<InformationProps> = (props) => (
  <div className="flex w-full justify-evenly items-center h-1/2 gap-4">
    <img
      src={props.flag}
      alt="flag"
      className="object-contain max-w-[25%] md:max-w-[33%] xl:max-w-[25%] outline outline-zinc-400 outline-1"
    />
    <div>
      <h3 className="text-2xl">{props.country}</h3>
      <p>{props.capital}</p>
    </div>
  </div>
);
