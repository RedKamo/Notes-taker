import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import {
  RiDeleteBin2Line,
  RiEditBoxLine,
  RiArrowGoBackFill,
} from "react-icons/ri";
import ReactMarkdown from "react-markdown";

type NoteProps = {
  deletedNote: (id: string) => void;
};

const Note = ({ deletedNote }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <main className=" min-h-screen max-w-[1180px] mx-auto pt-10">
      <h1 className="text-3xl md:text-5xl font-bold py-8">{note.title}</h1>
      <section className="flex flex-col md:flex-row  gap-4 ">
        <section className="w-full md:w-5/6  ">
          <section className="flex gap-4 pb-4">
            <Link to="edit">
              <button className="relative text-sm h-10 w-20 2 group ">
                <span className="absolute inset-0 rounded-lg  bg-black group-hover:bg-black"></span>
                <article className="border border-black rounded-lg absolute inset-0  transition duration-300 ease-out transform translate-x-0 translate-y-0 bg-another-green-custom group-hover:-translate-x-1 group-hover:-translate-y-1 flex items-center justify-center">
                  <p className="px-2 font-bold ">Edit </p>
                  <span>
                    <RiEditBoxLine className="font-bold text-xl" />
                  </span>
                </article>
              </button>
            </Link>
            <button
              type="button"
              onClick={() => {
                deletedNote(note.id);
                navigate("/");
              }}
              className="relative text-sm h-10 w-24 2 group "
            >
              <span className="absolute inset-0 rounded-lg border-r-2 border-b-2 border-black bg-black group-hover:bg-black"></span>
              <article className="border border-black rounded-lg absolute inset-0  transition duration-300 ease-out transform translate-x-0 translate-y-0 bg-red-custom group-hover:-translate-x-1 group-hover:-translate-y-1 flex items-center justify-center">
                <p className="px-2 font-bold ">Delete </p>
                <span>
                  <RiDeleteBin2Line className="font-bold text-xl" />
                </span>
              </article>
            </button>

            <Link to="..">
              <button className="relative text-sm h-10 w-20 2 group ">
                <span className="absolute inset-0 rounded-lg border-r-2 border-b-2 border-black bg-black group-hover:bg-black"></span>
                <article className="border border-black rounded-lg absolute inset-0  transition duration-300 ease-out transform translate-x-0 translate-y-0 bg-purple-custom group-hover:-translate-x-1 group-hover:-translate-y-1 flex items-center justify-center">
                  <p className="px-2 font-bold ">Back </p>
                  <span>
                    <RiArrowGoBackFill className="font-bold text-xl" />
                  </span>
                </article>
              </button>
            </Link>
          </section>
          <section className="border border-r-4 border-b-4 border-black rounded-lg p-4 bg-slate-100">
            <article className="prose">
              <ReactMarkdown>{note.markdown}</ReactMarkdown>
            </article>
          </section>
        </section>

        <section className="w-full md:w-2/6  rounded-lg flex-col flex ">
          <h3 className="pb-6 text-2xl ">Tags</h3>
          {note.tags.length > 0 && (
            <section className=" flex flex-wrap gap-2 items-center justify-center border border-r-4 border-b-4 border-black rounded-lg py-6 bg-yellow-custom ">
              {note.tags.map((tag) => (
                <span
                  key={tag.id}
                  className=" bg-white border border-black  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded  "
                >
                  {tag.label}
                </span>
              ))}
            </section>
          )}
        </section>
      </section>
    </main>
  );
};

export default Note;
