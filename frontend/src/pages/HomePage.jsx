import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import RateLimitedUi from "../components/RateLimitedUi";
import NotesNotFound from "../components/NotesNotFound";
import toast from "react-hot-toast";
import api from "../lib/axios";


/*
  Notes

  CORS
  - Cross-origin Resource Sharing
  - A browser security rule
  - When a website tries to get data from another website like our frontend calling an api
    on a different domain the browser might block it for security reasons.


*/

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error on fetching notes");
        if (error.response.status === 429) {
          // Ratelimit error code
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUi />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage