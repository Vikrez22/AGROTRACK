import { Users } from "lucide-react";
import AgroTrackChatBot from "../../Cowtracking/AgroTrackChatBot";

const AiAssistant = () => {
  return (
    <div className="space-y-6 m-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">AI Agricultural Assistant</h2>
        <p className="text-gray-600 mb-6">
          Get expert farming advice, pest control tips, and market information
          in multiple languages.
        </p>
      </div>
      <div className="min-h-[400px]">
        {/* Imported the AI component here */}
        <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-green-600" size={24} />
            <h3 className="text-xl font-semibold">AgroTrack AI</h3>
          </div>
          <AgroTrackChatBot />
        </div>
      </div>
    </div>
  );
};
export default AiAssistant;
