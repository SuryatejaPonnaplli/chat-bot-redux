import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import LoginForm from "./pages/Login/LoginForm";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
