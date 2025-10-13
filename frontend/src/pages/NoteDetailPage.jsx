import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  /*
    Notes
    - Spreading an object will create a NEW object in memory.
      - This allows `note !== originalNote` to return true when a change is made to `note`.
    - If we didn’t spread the object, `note` and `originalNote` would still point to the SAME object in memory.
      - Mutating `note` directly would also change `originalNote`.
      - `note !== originalNote` would remain false,

    useParams
    - React router hook which allows us to gather the id within the url
  */
  const [note, setNote] = useState(null);
  const [originalNote, setOriginalNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams()
  const navigate = useNavigate();
  const noteHasUpdated = note?.title !== originalNote?.title || note?.content !== originalNote?.content;

  // Fetch data
  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        console.log(res.data);
        setNote(res.data);
        setOriginalNote(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch note")
      } finally {
        setLoading(false);
      }
    };

    fetchDataById();
  }, []);

  //Save updated data to database
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and Content not provided");
      return
    }
    try {
      setSaving(true);
      await api.put(`/notes/${id}`, note);
      toast.success("New Note saved Succesfully");
      navigate("/");
    } catch (error) {
      console.log("Failed to save note", error);
      toast.error("Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      console.log("Note deleted");
      toast.success("Note deleted")
      navigate("/");
    } catch {
      console.log(error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div>
      {loading && (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
          <LoaderIcon className="animate-spin size-10" />
        </div>
      )}

      {note && !loading && (
        <div className="min-h-screen bg-base-200">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <Link to="/" className="btn btn-ghost">
                  <ArrowLeftIcon className="h-5 w-5" />
                  Back to notes
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn btn-error btn-outline"
                >
                  <Trash2Icon className="h-5 w-5" />
                  Delete Note
                </button>
              </div>
              <div className="card bg-base-100">
                <div className="card-body">
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Note title"
                      className="input input-bordered"
                      value={note.title}
                      onChange={(e) =>setNote({ ...note, title: e.target.value })}
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea
                      placeholder="Write your note here"
                      className="textarea textarea-bordered h-32"
                      value={note.content}
                      onChange={(e) =>setNote({ ...note, content: e.target.value })}
                    />
                  </div>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" disabled={!noteHasUpdated} onClick={handleSave}>{saving ? "Saving..." : "Save Changes"}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteDetailPage
