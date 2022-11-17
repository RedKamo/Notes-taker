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
    <main className="max-w-[1180px] mx-auto">
      <section className="flex flex-col items-center justify-between md:flex-row ">
        <h1 className="text-3xl md:text-5xl font-bold py-8">MY NOTES 📝</h1>
        <Link to="/new">
          <button className="relative text-sm h-8 w-28 2 group ">
            <span className="absolute inset-0 rounded-lg border-r-2 border-b-2 border-black bg-black group-hover:bg-black"></span>
            <span className="border-2 border-black rounded-lg absolute inset-0  transition duration-300 ease-out transform translate-x-0 translate-y-0 bg-green-custom group-hover:-translate-x-1 group-hover:-translate-y-1 flex items-center justify-center">
              Create Note
            </span>
          </button>
        </Link>
      </section>
      <section className="flex flex-col md:flex-row  w-full items-center justify-center gap-4 py-10">
        <input
          type="text"
          id=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full md:w-1/2 text-gray-900 text-sm rounded-lg   p-2 border-2 border-black"
          placeholder="Search note... 🔍"
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
          className="w-full md:w-1/2 border-2 border-black text-sm rounded-lg "
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
