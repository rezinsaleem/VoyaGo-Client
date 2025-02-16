// ChatMain Component
import { useEffect } from "react";
import Navbar from "../Home/Navbar";
import Inbox from "./Inbox";

const ChatMain = () => {
  
  // useEffect(() => {
  //   document.body.classList.add("no-scrollbar");

  //   return () => {
  //     document.body.classList.remove("no-scrollbar");
  //   };
  // }, []);


  return (
    <>
      <Navbar />
      <Inbox />
    </>
  );
};

export default ChatMain;
