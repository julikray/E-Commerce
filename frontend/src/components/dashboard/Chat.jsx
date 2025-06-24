import React, { useEffect } from "react";
import { RiMessage2Fill } from "react-icons/ri";
import { GrEmoji } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import profileimg from "../../assets/image/profileimg.jpg";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  addCustomerFriend,
  messageClear,
  sendMessageCustomerToSeller,
  updateMessage,
} from "../../store/reducers/chatReducer";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRef } from "react";

export const socket = io("http://localhost:4000", {
  withCredentials: true,
});

function Chat() {
  const scrollRef = useRef();
  const dispatch = useDispatch();

  const { sellerId } = useParams();
  const [text, setText] = useState("");
  const [receverMessage, setReceverMessage] = useState("");
  const [activeSeller, setActiveSeller] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);

  const { fd_messages, currentFd, my_friends, successMessage } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    socket.emit("add_user", userInfo.id, userInfo);
  }, []);

  useEffect(() => {
    dispatch(
      addCustomerFriend({
        sellerId: sellerId || "",
        userId: userInfo.id,
      })
    );
  }, [sellerId]);

  const send = () => {
    if (text) {
      dispatch(
        sendMessageCustomerToSeller({
          userId: userInfo.id,
          text,
          sellerId,
          name: userInfo.name,
        })
      );

      setText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      send();
    }
  };

  useEffect(() => {
    socket.on("sellerMessage", (msg) => {
      setReceverMessage(msg);
    });

    socket.on("activeSeller", (sellers) => {
      setActiveSeller(sellers);
    });
  }, []);

  useEffect(() => {
    if (receverMessage) {
      if (
        sellerId === receverMessage.senderId &&
        userInfo.id === receverMessage.receverId
      ) {
        dispatch(updateMessage(receverMessage));
      } else {
        toast.success(receverMessage.senderName + " " + "send a message");
      }
    }
  }, [receverMessage]);

  useEffect(() => {
    if (successMessage) {
      socket.emit("sendCustomerMessage", fd_messages[fd_messages.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fd_messages]);

  return (
    <div className="bg-white p-3 rounded-md ">
      <div className="w-full flex ">
        <div className="w-[230px] ">
          <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px] ">
            <span>
              <RiMessage2Fill />
            </span>
            <span>Message</span>
          </div>

          <div className="w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3">
            {my_friends?.map((f, i) => (
              <Link
                to={`/dashboard/chat/${f.fdId}`}
                key={i}
                className={`flex gap-2 justify-start items-center pl-2 py-[5px] `}
              >
                <div className="w-[30px] h-[30px] rounded-md relative   ">
                  <img
                    className="w-[30px]  h-[30px] border-[#836bca] border-2 max-w-[38px] p-[2px] rounded-full "
                    src={f.image || profileimg}
                    alt="image"
                  />
                  {activeSeller.some((c) => c.sellerId === f.fdId) && (
                    <div className="w-[10px] h-[10px] rounded-full bg-green-600 absolute right-0 bottom-0 "></div>
                  )}
                </div>
                <span>{f.name || "Unknow"} </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-[calc(100%-230px)] ">
          {currentFd ? (
            <div className="w-full h-full ">
              <div className="flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px] ">
                <div className="w-[30px] h-[30px] rounded-md relative ">
                  <img
                    className="w-[30px]  h-[30px] border-[#836bca] border-2 max-w-[38px] p-[2px] rounded-full "
                    src={currentFd.image || profileimg}
                    alt="image"
                  />
                  {activeSeller.some((c) => c.sellerId === currentFd.fdId) && (
                    <div className="w-[10px] h-[10px] rounded-full bg-green-600 absolute right-0 bottom-0 "></div>
                  )}
                </div>
                <span>{currentFd.name || "Unknow"}</span>
              </div>

              <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md ">
                <div className="w-full h-full overflow-y-auto flex flex-col gap-3 ">
                  {fd_messages?.map((m, i) => {
                    if (currentFd?.fdId !== m.receverId) {
                      return (
                        <div
                          ref={scrollRef}
                          key={i}
                          className="w-full flex gap-2 justify-start items-center text-[14px] "
                        >
                          <img
                            className="w-[30px] h-[30px]  border-[#836bca] border-2 max-w-[38px] p-[2px] rounded-full "
                            src={
                              m.senderId === userInfo.id
                                ? profileimg
                                : currentFd?.image || profileimg
                            }
                            alt="image"
                          />
                          <div className="p-2 bg-[#836bca] text-white rounded-md ">
                            <span>{m.message}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          ref={scrollRef}
                          className="w-full flex gap-2 justify-end items-center text-[14px] "
                        >
                          <img
                            className="w-full  h-full border-[#836bca] border-2 max-w-[38px] p-[2px] rounded-full "
                            src={profileimg}
                            alt="image"
                          />
                          <div className="p-2 bg-[#836bca] text-white rounded-md ">
                            <span>{m.message}</span>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>

              <div className="flex p-2 justify-between items-center w-full ">
                <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-md ">
                  <label className="cursor-pointer" htmlFor="">
                    <FaPlus />
                  </label>
                  <input type="file" className="hidden" />
                </div>

                <div className="border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-md relative flex ">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder="input message"
                    className="w-full rounded-md h-full outline-none p-3 "
                  />
                  <div className="text-2xl right-2 top-2 absolute cursor-auto ">
                    <span>
                      <GrEmoji />
                    </span>
                  </div>
                </div>
                <div className="w-[40px] p-2 justify-center items-center rounded-full ">
                  <div onClick={send} className="text-2xl cursor-pointer ">
                    <IoSend />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-lg text-slate-600 ">
              <span>Select selller </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
