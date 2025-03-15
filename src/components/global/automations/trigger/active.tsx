import { InstagramBlue, PlaneBlue } from "@/icons";

type ActiveTrigggerProps = {
  type: string;
  keywords: {
    id: string;
    word: string;
    automationId: string | null;
  }[];
};

const ActiveTriggger = ({ type, keywords }: ActiveTrigggerProps) => {
  return (
    <div className="bg-background-80 p-3 rounded-xl w-full">
      <div className="flex items-center gap-x-2">
        {type === "COMMENT" ? <InstagramBlue /> : <PlaneBlue />}
        <p className="text-lg">
          {type === "COMMENT"
            ? "User comments on my post."
            : "User sends me a message."}
        </p>
      </div>
      <p className="text-text-secondary mt-2">
        {type === "COMMENT"
          ? "Triggers when a user comments on your post and if the comment contains the keywords specified."
          : "Triggers when a user sends you a message and if the message contains the keywords specified."}
      </p>
      <div className="flex flex-wrap mt-5 gap-2">
        {keywords.map((keyword) => (
          <div
            key={keyword.id}
            className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white flex items-center gap-x-2 capitalize px-3 py-1 rounded-full"
          >
            <p>{keyword.word}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveTriggger;
