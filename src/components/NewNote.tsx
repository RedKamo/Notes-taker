import { NoteData, Tag } from "../App";
import FormNote from "./FormNote";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const NewNote = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
  return (
    <main className=" pt-10 max-w-[1180px] mx-auto">
      <h1 className="pb-6 font-bold text-3xl">New📝</h1>
      <FormNote
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </main>
  );
};

export default NewNote;
