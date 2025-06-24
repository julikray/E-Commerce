import React, { useEffect, useRef, useState } from "react";

import logo from "../../assets/image/logo.png";
import {
  getSellerMessage,
  messageClear,
  sendMessageSellerToAdmin,
  updateAdminMessage,
  updateSellerMessage,
} from "../../store/Reducers/chatReducer";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../utils/utils";
import toast from "react-hot-toast";

function SellerToAdmin() {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const { sellerAdminMessage, successMessage  ,activeAdmin} = useSelector(
    (state) => state.chat
  );
  const { userInfo } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const [receverMessage, setReceverMessage] = useState("");

  useEffect(() => {
    dispatch(getSellerMessage());
  }, []);

  const send = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(
        sendMessageSellerToAdmin({
          senderId: userInfo._id,
          receverId: "",
          message: text,
          senderName: userInfo.name,
        })
      );
      setText("");
    }
  };

  useEffect(() => {
    socket.on("receveredAdminMessage", (msg) => {
      dispatch(updateAdminMessage(msg));
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "sendMessageSellerToAdmin",
        sellerAdminMessage[sellerAdminMessage.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (receverMessage) {
      if (
        userInfo._id === receverMessage.senderId &&
        receverMessage.receverId === ""
      ) {
        dispatch(updateSellerMessage(receverMessage));
      } else {
        toast.success(receverMessage.senderName + " " + "send a message");
      }
    }
  }, [receverMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sellerAdminMessage]);

  return (
    <div className="px-2 lg:px-7 py-5 ">
      <div className="w-full bg-[#fefeff] border border-[#d2d3d2] px-4 py-4 rounded-md h-[calc(100vh-140px)] ">
        <div className="flex w-full h-full relative ">
          <div className="w-full md:pl-4 ">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                <div className="relative">
                  <img
                    className="w-[45px]  h-[45px] border-[#836bca] border-2 max-w-[45px] p-[2px] rounded-full bg-red-300 "
                    src={logo}
                    alt="Logo"
                  />

                  {
                    activeAdmin &&  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  }
                 


                </div>
                <h2 className="text-base text-black font-semibold">Support</h2>
              </div>
            </div>

            <div className="py-4">
              <div className="border border-[#cfcfcf] shadow-sm h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto text-[#d0d2d6]  ">
                {sellerAdminMessage.map((m, i) => {
                  if (userInfo._id !== m.senderId) {
                    return (
                      <div
                        key={i}
                        ref={scrollRef}
                        className="w-full flex justify-start items-center mb-2"
                      >
                        <div className="flex justify-start items-center gap-2 md:px-3 max-w-full lg:max-w-[85%] ">
                          <div>
                            <img
                              className="w-[38px]  h-[38px] border-white border-2 max-w-[38px] p-[3px] rounded-full bg-red-300 "
                              src={logo}
                              alt="Logo"
                            />
                          </div>

                          <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm ">
                            <span> {m.message} </span>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={i}
                        ref={scrollRef}
                        className="w-full flex justify-end items-center "
                      >
                        <div className="flex justify-start items-center gap-2 md:px-3 max-w-full lg:max-w-[85%] ">
                          <div className="flex justify-center items-start flex-col w-full bg-red-500 shadow-lg shadow-red-500/50 text-white py-1 px-2 rounded-sm ">
                            <span> {m.message} </span>
                          </div>

                          <div>
                            <img
                              className="w-[38px]  h-[38px] border-white border-2 max-w-[38px] p-[3px] rounded-full bg-yellow-300 "
                              src={logo}
                              alt="Logo"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            <form onSubmit={send} className="flex gap-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-[#836bca] rounded-md outline-none bg-transparent text-black  "
                type="text"
                placeholder="Message"
              />
              <button className="shadow-lg bg-[#836bca] hover:shadow-cyan-500.50 text-semibold w-[75px] h-[35px] rounded-md text-black  flex justify-center items-center ">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerToAdmin;
