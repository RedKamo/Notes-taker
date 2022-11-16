import { Link } from "react-router-dom";
import { Tag } from "../App";

type oneNote = {
  tags: Tag[];
  title: string;
  id: string;
};

const SingleNote = ({ id, title, tags }: oneNote) => {
  return (
    <Link to={id}>
      <main className="relative py-2 h-32 w-auto  group	">
        <section className="absolute inset-0 rounded-lg border-r-2 border-b-2 border-black bg-black group-hover:bg-black">
          <section className=" border-2 border-black rounded-lg absolute inset-0  transition duration-300 ease-out transform translate-x-0 translate-y-0 bg-white group-hover:-translate-x-1 group-hover:-translate-y-1 flex flex-col items-center justify-center">
            <h1>{title}</h1>
            {tags.length > 0 ? (
              <section className="pt-4 ">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                  >
                    {tag.label}
                  </span>
                ))}
              </section>
            ) : (
              <section className="pt-4">
                <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                  No tags
                </span>
              </section>
            )}
          </section>
        </section>
      </main>
    </Link>
  );
};

export default SingleNote;
