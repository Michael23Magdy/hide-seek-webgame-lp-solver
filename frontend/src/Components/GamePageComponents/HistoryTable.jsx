import { GameRole } from "../../constants/enums";
import Tom from "../../assets/tomFace.webp"
import Jerry from "../../assets/jerryFace.png"

const HistoryTable = ({ gameHistory = [] }) => (
    <div className="max-h-96 overflow-auto">
        <h2 className="text-lg font-bold mb-2">Game History</h2>
        <table className="min-w-full text-sm border">
            <thead>
                <tr>
                    <th className="border px-2 py-1">Round</th>
                    <th className="border px-2 py-1">Hider Choice</th>
                    <th className="border px-2 py-1">Seeker Choice</th>
                    <th className="border px-2 py-1">Winner</th>
                    <th className="border px-2 py-1">Score</th>
                </tr>
            </thead>
            <tbody>
                {gameHistory.length === 0 ? (
                    <tr>
                        <td className="border px-2 py-1 text-center" colSpan={5}>
                            No history yet.
                        </td>
                    </tr>
                ) : (
                    gameHistory.map((record, idx) => (
                        <tr key={idx}>
                            <td className="border px-2 py-1">{record.round}</td>
                            <td className="border px-2 py-1">
                                ({record.hiderChoice.x}, {record.hiderChoice.y})
                            </td>
                            <td className="border px-2 py-1">
                                ({record.seekerChoice.x}, {record.seekerChoice.y})
                            </td>
                            <td className="border px-2 py-1">
                                <img src={record.winner === GameRole?.Seeker ?Tom:Jerry} className="w-6 m-auto" />
                            </td>
                            <td className="border px-2 py-1">{record.score}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);

export default HistoryTable;