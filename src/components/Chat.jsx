import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useGetFetchProfile from "../hooks/useGetFetchProfile";

function Chat({ materialId }) {
  const { userData, auth } = useContext(AuthContext);
  const [Material, setMaterial] = useState(null);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef(null);
  const enterInput = useRef();

console.log(Material?.muhokamalar);


  useEffect(() => {
    if (!materialId) return;
    fetch(
      `${import.meta.env.VITE_BASE_URL}/birlashma/material/${materialId}/muhokama-update/`,
    )
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then((data) => {})
      .catch((err) => {
        // console.log(err);
      });
  }, [materialId]);

  function lookAtAction() {
    if (!auth?.accessToken || !materialId) return;
    fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/birlashma/material-detail/${materialId}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then((data) => {
        setMaterial(data);
      })
      .catch((err) => {
        // console.log(err);
      })
      .finally(() => {});
  }

  useEffect(() => {
    if (!auth?.accessToken || !materialId) return;
    lookAtAction();
  }, [auth?.accessToken, materialId]);

  // web socket
  const socketUrl = `ws://192.168.100.10/ws/notifications/?token=${auth?.accessToken}`;
  useEffect(() => {
    if (!auth.accessToken) return;
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      // console.log("WebSocket ulanishi o'rnatildi");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("yangi notification:", data);
      lookAtAction();
    };

    socket.onerror = (error) => {
      // console.error("WebSocket yopildi:", error);
    };

    return () => {
      socket.close();
    };
  }, [auth?.accessToken]);

  // get data
  const { data: user } = useGetFetchProfile(
    `${import.meta.env.VITE_BASE_URL}/user-data/`,
  );

  // sent data
  function sendData(e) {
    e.preventDefault();
    if (inputText) {
      fetch(`${import.meta.env.VITE_BASE_URL}/birlashma/muhokama-create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          teacher: userData?.userId,
          material: Material.id,
        }),
      })
        .then((res) => {
          const errorObj = res.json();
          if (!res.ok) throw new Error(JSON.stringify(errorObj));
          return res;
        })
        .then((data) => {})
        .catch((err) => console.log(err))
        .finally(() => {
          setInputText("");
          enterInput.current.value = "";
          lookAtAction();
        });
    }
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Material?.muhokamalar]);

  return (
    <>
      {Material?.muhokamalar?.map((item) => {
        item.text && (
          <div className={`chat ${item.metodist?.id ? "chat-start" : "chat-end"}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        );
      })}
    </>
  );
}

export default Chat;
