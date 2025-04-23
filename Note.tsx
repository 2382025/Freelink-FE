import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../utils/AuthProvider";
import axios from "../utils/AxiosInstance";

type NoteType = {
  title: string;
  content: string;
};

const fetchNoteList = async (token: string | null) => {
  return await axios.get<NoteType[]>("/api/note", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const NoteCard = ({ title, content }: NoteType) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

const Note = () => {
  const { getToken } = useAuth();
  const { data } = useQuery({
    queryKey: ["noteList"],
    queryFn: () => fetchNoteList(getToken())
  });

  return (
    <div className="space-y-6 p-4">
      {data?.data.map((note, index) => (
        <NoteCard
          key={index}
          title={note.title}
          content={note.content}
        />
      ))}
    </div>
  );
};

export default Note;
