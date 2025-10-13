import { Route, Routes } from "react-router";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import toast from "react-hot-toast";

/*
  Notes

  react-hot-toast (Notifications)
  - https://react-hot-toast.com/

  Tailwind framework setup with vite (version 3.4.17)
  - https://v3.tailwindcss.com/docs/guides/vite
  - daisyui
    - is the Tailwind CSS plugin It provides useful component class names
      to help you write less code and build faster.
    - https://daisyui.com/ (version 4.12.24)

  vs code plugin
  - Tailwind CSS IntelliSense

*/

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"></div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App