import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import logo from "../../assets/image/logo.png";
import { FaList } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getSeller,
  getAdminMessage,
  sendMessageSellerToAdmin,
  messageClear,
  updateSellerMessage,
  updateAdminMessage,
} from "../../store/Reducers/chatReducer";
import profileimg from "../../assets/image/profileimg.jpg";
import { Link, useParams } from "react-router-dom";
import { socket } from "../../utils/utils";
import toast from "react-hot-toast";

function Chat() {

  const scrollRef = useRef()
  const { sellerId } = useParams();

  const dispatch = useDispatch();
  const {
    seller,
    activeSeller,
    sellerAdminMessage,
    currentSeller,
    successMessage,
  } = useSelector((state) => state.chat);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [receverMessage, setReceverMessage] = useState("");

  useEffect(() => {
    dispatch(getSeller());
  }, []);

  const send = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(
        sendMessageSellerToAdmin({
          senderId: "",
          receverId: sellerId,
          message: text,
          senderName: "Myshop support",
        })
      );
      setText("");
    }
  };

  useEffect(() => {
    if (sellerId) {
      dispatch(getAdminMessage(sellerId));
    }
  }, [sellerId]);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "sendMessageAdminToSeller",
        sellerAdminMessage[sellerAdminMessage.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    socket.on("receveredSellerMessage", (msg) => {
      setReceverMessage(msg);
    });
  }, []);

  useEffect(() => {
    if (receverMessage) {
      if (
        sellerId === receverMessage.senderId &&
        receverMessage.receverId === ""
      ) {
        dispatch(updateSellerMessage(receverMessage));
      } else {
        toast.success(receverMessage.senderName + " " + "send a message");
      }
    }
  }, [receverMessage]);


   useEffect(() => {
      scrollRef.current?.scrollIntoView({behavior : 'smooth' })
  
    },[sellerAdminMessage])

  return (
    <div className="px-2 lg:px-7 py-5 ">
      <div className="w-full bg-[#fefeff] border border-[#d2d3d2] px-4 py-4 rounded-md h-[calc(100vh-140px)] ">
        <div className="flex w-full h-full relative ">
          <div
            className={`w-[280px] h-full absolute z-10  ${
              show ? "-left-[16px] border border-[#d2d3d2] " : "-left-[336px] "
            } md:left-0 md:relative transition-all `}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#fefeff]  md:bg-transparent overflow-y-auto ">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-[#6f6f70] ">
                <h2>Sellers</h2>
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoMdClose />
                </span>
              </div>

              {seller?.map((s, i) => (
                <Link
                  to={`/admin/dashboard/live-chat/${s._id}`}
                  key={i}
                  className={`h-[60px] flex justify-start gap-2 items-center text-black  px-2 py-2 rounded-md cursor-pointer ${
                    sellerId === s._id
                  } `}
                >
                  <div className="relative">
                    <img
                      className="w-[38px]  h-[38px] border-red-300 border-2 max-w-[38px] p-[2px] rounded-full   "
                      src={s.image || profileimg}
                      alt="image"
                    />

                    {activeSeller.some((a) => a.sellerId === s._id) && (
                      <div className="w-[10px] h-[10px] rounded-full bg-green-600 absolute right-0 bottom-0 "></div>
                    )}
                  </div>

                  <div className="flex justify-center items-start flex-col w-full ">
                    <div className="flex justify-between items-center w-full ">
                      <h2 className="text-base font-semibold ">{s.name} </h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[calc(100%-200px)] md:pl-4 ">
            <div className="flex justify-between items-center">
              {sellerId && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[45px]  h-[45px] border-[#836bca] border-2 max-w-[45px] p-[2px] rounded-full bg-red-300 "
                      src={currentSeller?.image || profileimg}
                      alt="Logo"
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <span> {currentSeller?.name} </span>
                </div>
              )}

              <div
                onClick={() => setShow(!show)}
                className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-[#836bca] shadow-lg hover:shadow-bg-[#836bca]  justify-center cursor-pointer items-center text-black "
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>

            <div className="py-4">
              <div className="border border-[#cfcfcf] shadow-sm h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto text-[#d0d2d6]  ">
                {sellerId ? (
                  sellerAdminMessage.map((m, i) => {
                    if (m.senderId === sellerId) {
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
                  })
                ) : (
                  <div className="w-full h-full flex justify-center items-center text-lg text-slate-600 ">
                    <span>Select selller </span>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={send} className="flex gap-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-[#836bca] rounded-md outline-none bg-transparent text-black  "
                type="text"
                placeholder="Message"
                readOnly={sellerId ? false : true}
              />
              <button
                disabled={sellerId ? false : true}
                className="shadow-lg bg-[#836bca] hover:shadow-cyan-500.50 text-semibold w-[75px] h-[35px] rounded-md text-black  flex justify-center items-center "
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
