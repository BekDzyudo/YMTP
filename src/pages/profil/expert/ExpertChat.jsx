import React, { useEffect, useRef, useState } from "react";
import useGetFetchProfile from "../../../hooks/useGetFetchProfile";
import { TbMessageOff } from "react-icons/tb";

function ExpertChat({ userData, muhokama, materialId, materialDetail }) {
    const enterInput = useRef();
    const chatEndRef = useRef(null);
    const [inputText, setInputText] = useState("");

  const { data: user } = useGetFetchProfile(
    `${import.meta.env.VITE_BASE_URL}/user-data/`,
  );

   function sendData(e) {
    e.preventDefault();
    if (inputText) {
      fetch(`${import.meta.env.VITE_BASE_URL}/birlashma/muhokama-create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          metodist_id: user.id,
          material: materialId,
        }),
      })
        .then(async (res) => {
          const errorObj = await res.json();
          if (!res.ok) throw new Error(JSON.stringify(errorObj));
          return res;
        })
        .then((data) => {})
        .catch((err) => console.log(JSON.parse(err.message)))
        .finally(() => {
          setInputText("");
          enterInput.current.value = "";
          materialDetail();
        });
    }
  }

    useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [muhokama]);
console.log(muhokama);

  return (
    <div className="h-[400px] md:h-[600px] bg-base-100 w-full px-3 py-5 rounded-2xl flex flex-col justify-between">
      <h1 className="border-b text-xs sm:text-md text-center uppercase font-semibold mb-4 pb-1">
        Material bo‘yicha muhokama
      </h1>
      <div className="w-full h-full overflow-y-scroll">
        {muhokama && muhokama.length > 1 ?
          muhokama.map((item) => {
            return (
              item.text && (
                <div
                  key={item.id}
                  className={`chat mb-2 ${item.teacher ? "chat-start" : "chat-end"}`}
                >
                  <div className="chat-image avatar">
                    <div className="md:w-10 w-8 rounded-full">
                      <img
                        alt="Avatar"
                        src={
                          item.teacher ? userData?.image : item.metodist?.image
                        }
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {item.teacher ? (
                      <span>
                        {userData.last_name + " " + userData.first_name}
                      </span>
                    ) : (
                      <span>
                        {item.metodist.last_name +
                          " " +
                          item.metodist.first_name}
                      </span>
                    )}
                    {/* <time className="text-xs opacity-50">12:45</time> */}
                  </div>
                  <div className="chat-bubble text-sm sm:text-[16px]">{item.text}</div>
                </div>
              )
            );
          })
        :
        <div className="w-full h-full flex justify-center items-center font-semibold">
            <div className="flex flex-col items-center">
                <TbMessageOff className="text-3xl sm:text-4xl"/>
            <h1 className="text-center">Suhbatlar mavjud <br /> emas</h1>
            </div>
        </div>
        }
          <div ref={chatEndRef}/>
      </div>
      <div>
        <form
          className="flex gap-1 mt-5"
          onSubmit={sendData}
        >
          <input
            ref={enterInput}
            onChange={(e) => setInputText(e.target.value)}
            type="text"
            className="input input-sm sm:input-md join-item w-full outline-0"
            placeholder="Xabar yozing..."
          />
          <button
            type="submit"
            className="btn btn-neutral btn-sm sm:btn-md join-item"
          >
            Yuborish
          </button>
        </form>
      </div>
    </div>
  );
}

export default ExpertChat;
