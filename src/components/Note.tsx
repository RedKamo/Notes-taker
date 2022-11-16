import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import ReactMarkdown from "react-markdown";

type NoteProps = {
  deletedNote: (id: string) => void;
};

const Note = ({ deletedNote }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <main>
      <h1>{note.title}</h1>
      {note.tags.length > 0 && (
        <section className="pt-4">
          {note.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
            >
              {tag.label}
            </span>
          ))}
        </section>
      )}
      <Link to="edit">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Edit
        </button>
      </Link>
      <button
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={() => {
          deletedNote(note.id);
          navigate("/");
        }}
      >
        Delete
      </button>
      <Link to="..">
        <button
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Back
        </button>
      </Link>
      <section className="prose">
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
      </section>
    </main>
  );
};

export default Note;
