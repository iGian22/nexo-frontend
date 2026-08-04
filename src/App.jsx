import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Circle from "./pages/Circle";
import Chat from "./pages/Chat";
import CreateCircle from "./pages/CreateCircle";
import CreateRoom from "./pages/CreateRoom";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="circle/:circleId" element={<Circle />} />
        <Route path="circle/:circleId/chat/:chatId" element={<Chat />} />
        <Route path="circle/:circleId/create-room" element={<CreateRoom />} />
        <Route path="create" element={<CreateCircle />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
