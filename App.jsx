
import { useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

export default function App() {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState(null);

  const join = () => {
    socket.emit("joinRoom", { roomId, playerName: name });
  };

  socket.on("roomUpdate", (data) => setRoom({ ...data }));

  return (
    <div style={{ padding: 20 }}>
      <h1>牛牛联机房</h1>
      <input placeholder="名称" onChange={e=>setName(e.target.value)} />
      <input placeholder="房号" onChange={e=>setRoomId(e.target.value)} />
      <button onClick={join}>加入房间</button>

      {room && (
        <div>
          <h3>房间玩家</h3>
          {Object.values(room.players).map(p=> <div>{p.name} | 余额: {p.balance}</div>)}
        </div>
      )}
    </div>
  );
}
