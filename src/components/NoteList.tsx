import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";
import SingleNote from "./SingleNote";

type NoteListProps = {
  availableTags: Tag[];
  notes: oneNote[];
};

type oneNote = {
  tags: Tag[];
  title: string;
  id: string;
};

const NoteList = ({ availableTags, notes }: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");

  const filterMyNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <main className="max-w-[1180px] mx-auto px-4">
      <h1>NOTE LIST COMPONENT</h1>
      <Link to="/new">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          CreateNew
        </button>
      </Link>
      <section className="flex items-center justify-center gap-4 pb-4">
        <input
          type="text"
          id=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-1/2 text-gray-900 text-sm rounded-lg   p-2 border"
          placeholder="Add note title"
          required
        />
        <ReactSelect
          value={selectedTags.map((tag) => ({
            label: tag.label,
            value: tag.id,
          }))}
          options={availableTags.map((tag) => {
            return { label: tag.label, value: tag.id };
          })}
          onChange={(tags) => {
            setSelectedTags(
              tags.map((tag) => {
                return { label: tag.label, id: tag.value };
              })
            );
          }}
          isMulti
          className="w-1/2"
        />
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filterMyNotes.map((note) => (
          <SingleNote
            id={note.id}
            title={note.title}
            tags={note.tags}
            key={note.id}
          />
        ))}
      </section>
    </main>
  );
};

export default NoteList;
