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
      <section className="flex items-center justify-center gap-4 pb-4">
        <input
          type="text"
          id=""
          className="w-1/2 text-gray-900 text-sm rounded-lg   p-2 border"
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
          className="w-1/2"
        />
      </section>
      <textarea
        rows={10}
        className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border mt-4"
        placeholder="Write your thoughts here..."
        ref={markdownReference}
        required
        defaultValue={markdown}
      />
      <section className="pt-4 flex justify-end ">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save
        </button>
        <Link to="..">
          <button
            type="button"
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </Link>
      </section>
    </form>
  );
};

export default FormNote;
