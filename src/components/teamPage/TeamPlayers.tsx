import Link from "next/link";

type Player = {
  id: number;
  name: string;
  position: string;
  nationality: string;
  dateOfBirth: string;
};

type Props = {
  squad: Player[];
};

export default function TeamPlayers({ squad }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-emerald-900 ">Team Squad</h2>
      
      <Link href="/" className="text-emerald-400 text-sm mb-8">home page</Link>
      
      <table className="bg-emerald-100/40 px-4 pt-2 rounded-lg w-full text-sm text-left">
        <thead className="bg-emerald-500">
          <tr className="border-b border-emerald-50 text-emerald-50">
            <th className="py-2 px-4">Name</th>
            <th className="py-2">Position</th>
            <th className="py-2">Nationality</th>
            <th className="py-2">Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {squad.map((player) => (
            <tr
              key={player.id}
              className="border-b border-emerald-700/50 hover:bg-emerald-50"
            >
              <td className="py-2  px-4">{player.name}</td>
              <td className="py-2">{player.position}</td>
              <td className="py-2">{player.nationality}</td>
              <td className="py-2">
                {new Date(player.dateOfBirth).toLocaleDateString("en-GB")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
