import { NoteData, Tag } from "../App";
import FormNote from "./FormNote";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
  const note = useNote();

  return (
    <main className=" max-w-[1180px] mx-auto pt-10">
      <h1 className="pb-6 font-bold text-3xl">Edit Note 📝</h1>
      <FormNote
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </main>
  );
};

export default EditNote;
