import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid";

type FormNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const FormNote = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: FormNoteProps) => {
  const titleReference = useRef<HTMLInputElement>(null);
  const markdownReference = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleReference.current!.value,
      markdown: markdownReference.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="flex flex-col md:flex-row  w-full items-center justify-center gap-4 py-10">
        <input
          type="text"
          id=""
          className="w-full md:w-1/2 text-gray-900 text-sm rounded-lg   p-2 border-2 border-black"
          placeholder="Add note title"
          required
          ref={titleReference}
          defaultValue={title}
        />
        <CreatableReactSelect
          onCreateOption={(label) => {
            const newTag = { id: uuidV4(), label };
            onAddTag(newTag);
            setSelectedTags((prev) => [...prev, newTag]);
          }}
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
          className="w-full md:w-1/2 border-2 border-black text-sm rounded-lg"
        />
      </section>
      <textarea
        rows={10}
        className="block  w-full text-sm text-gray-900 rounded-lg border mt-4 border-black border-b-4 border-r-4 p-4 bg-slate-100"
        placeholder="Write your thoughts here..."
        ref={markdownReference}
        required
        defaultValue={markdown}
      />
      <section className="pt-10 flex justify-end gap-4 ">
        <button type="submit" className="relative text-sm h-10 w-20 2 group ">
          <span className="absolute inset-0 rounded-lg border-r-2 border-b-2 border-black bg-black group-hover:bg-black"></span>
          <span className="border border-black rounded-lg absolute inset-0  transition duration-300 ease-out transform translate-x-0 translate-y-0 bg-lemon-custom group-hover:-translate-x-1 group-hover:-translate-y-1 flex items-center justify-center">
            Save
          </span>
        </button>
        <Link to="..">
          <button type="button" className="relative text-sm h-10 w-20 2 group ">
            <span className="absolute inset-0 rounded-lg border-r-2 border-b-2 border-black bg-black group-hover:bg-black"></span>
            <span className="border border-black rounded-lg absolute inset-0  transition duration-300 ease-out transform translate-x-0 translate-y-0 bg-orange-custom group-hover:-translate-x-1 group-hover:-translate-y-1 flex items-center justify-center">
              Cancel
            </span>
          </button>
        </Link>
      </section>
    </form>
  );
};

export default FormNote;
