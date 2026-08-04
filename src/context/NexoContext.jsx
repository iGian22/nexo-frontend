import { createContext, useContext, useEffect, useState } from "react";
import { seedCircles } from "../data/seed";

const NexoContext = createContext(null);

const DATA_KEY = "nexo-data-v1";
const PROFILE_KEY = "nexo-profile-v1";
const FAVORITES_KEY = "nexo-favorites-v1";

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function loadCircles() {
  try {
    const saved = localStorage.getItem(DATA_KEY);
    return saved ? JSON.parse(saved) : seedCircles;
  } catch {
    return seedCircles;
  }
}

function loadProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);

    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          status: "",
        };
  } catch {
    return {
      name: "",
      status: "",
    };
  }
}

function loadFavorites() {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : ["frontend-lab"];
  } catch {
    return ["frontend-lab"];
  }
}

export function NexoProvider({ children }) {
  const [circles, setCircles] = useState(loadCircles);
  const [favorites, setFavorites] = useState(loadFavorites);
  const [profile, setProfile] = useState(loadProfile);

  useEffect(() => {
    localStorage.setItem(DATA_KEY, JSON.stringify(circles));
  }, [circles]);

  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function createRoom(circleId, data) {
    const room = {
      id: `${slugify(data.name)}-${Date.now().toString().slice(-4)}`,
      name: data.name.trim(),
      description: data.description.trim(),
      messages: [],
    };

    setCircles((prev) =>
      prev.map((circle) =>
        circle.id !== circleId
          ? circle
          : {
              ...circle,
              chats: [...circle.chats, room],
            }
      )
    );

    return room.id;
  }

  function deleteRoom(circleId, roomId) {
    setCircles((prev) =>
      prev.map((circle) =>
        circle.id !== circleId
          ? circle
          : {
              ...circle,
              chats: circle.chats.filter((chat) => chat.id !== roomId),
            }
      )
    );
  }

  function deleteCircle(circleId) {
    setCircles((prev) =>
      prev.filter((circle) => circle.id !== circleId)
    );

    setFavorites((prev) =>
      prev.filter((id) => id !== circleId)
    );
  }

  function createCircle(data) {
    const id = `${slugify(data.name)}-${Date.now().toString().slice(-4)}`;

    const circle = {
      id,
      ...data,
      emoji: "○",
      chats: [],
    };

    setCircles((prev) => [circle, ...prev]);

    return id;
  }

  function sendMessage(circleId, chatId, text) {
    const clean = text.trim();

    if (!clean) return;

    const now = new Date().toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setCircles((prev) =>
      prev.map((circle) =>
        circle.id !== circleId
          ? circle
          : {
              ...circle,
              chats: circle.chats.map((chat) =>
                chat.id !== chatId
                  ? chat
                  : {
                      ...chat,
                      messages: [
                        ...chat.messages,
                        {
                          id: Date.now(),
                          author: profile.name || "Yo",
                          text: clean,
                          time: now,
                          mine: true,
                        },
                      ],
                    }
              ),
            }
      )
    );
  }

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  return (
    <NexoContext.Provider
      value={{
        circles,
        favorites,
        profile,
        setProfile,
        createCircle,
        createRoom,
        deleteRoom,
        deleteCircle,
        sendMessage,
        toggleFavorite,
      }}
    >
      {children}
    </NexoContext.Provider>
  );
}

export const useNexo = () => useContext(NexoContext);