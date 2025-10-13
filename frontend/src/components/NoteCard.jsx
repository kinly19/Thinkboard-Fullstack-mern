import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { formateData } from "../lib/utils";
import toast from "react-hot-toast";
import api from "../lib/axios";

const NoteCard = ({ note, setNotes }) => {
  
  const Navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      /*
        -below will hit the api again
          const res = await api.get("/notes");
          setNotes(res.data);

        -but we can use derived state to do the same as seen below
      */
      // re rendering of dom (use state to re render dom)
      setNotes((prevNotes) => prevNotes.filter(note => note._id !== id)); // use of derived state
    } catch (error) {
      toast.error("failed to delete note please try again...")
      console.log(error);
    } finally {
      console.log(`${note._id}: was deleted succesfully`);
      toast.success(`${note.title} was deleted successfully`);
    }
  };


  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-center items-center mt-4">
          <span className="text-sm text-base-content/60">{formateData(note.createdAt)}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;