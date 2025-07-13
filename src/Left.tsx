import { useState } from "react";
import Actor from "./Actor";

export default function Left() {
  const [isActor, setIsActor] = useState<boolean>(true);
  return (
    <section className="flex-1 sm:border-r-2 border-[#5483B3] box-border max-h-full sm:max-h-none w-full p-4">
      <nav className="flex justify-evenly text-lg font-semibold">
        <button
          className={isActor ? "border-b-2 border-[#052659] outline-none" : ""}
          onClick={() => setIsActor(true)}
        >
          Actor
        </button>
        <button
          className={!isActor ? "border-b-2 border-[#052659] outline-none" : ""}
          onClick={() => setIsActor(false)}
        >
          Play
        </button>
      </nav>
      {isActor ? <Actor /> : <h1>Hello World</h1>}
    </section>
  );
}
