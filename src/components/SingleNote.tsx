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
        <section className="absolute inset-0 rounded-lg  border-r-2 border-b-2 border-black bg-black group-hover:bg-black">
          <section className="border border-black rounded-lg absolute inset-0  transition duration-300 ease-out transform translate-x-0 translate-y-0 bg-purple-custom group-hover:-translate-x-1 group-hover:-translate-y-1 flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold pb-2">{title}</h3>
            {tags.length > 0 ? (
              <section className="p-2 flex flex-wrap gap-2 items-center justify-center ">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className=" bg-teal-300 border border-black  text-xs font-semibold  px-2.5 py-0.5 rounded "
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
