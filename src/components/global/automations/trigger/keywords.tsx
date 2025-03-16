import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useKeywords } from "@/hooks/use-automations";
import { useMutationDataState } from "@/hooks/use-mutation-data";
import { useQueryAutomation } from "@/hooks/user-queries";

type KeywordsProps = {
  id: string;
};

const Keywords = ({ id }: KeywordsProps) => {
  const { deleteMutation, onKeyPress, onValueChange, keyword } =
    useKeywords(id);
  const { latestVariable } = useMutationDataState(["add-keyword"]);
  const { data } = useQueryAutomation(id);

  return (
    <div className="bg-background-80 flex flex-col gap-y-3 p-3 rounded-xl">
      <p className="text-sm text-text-secondary">
        Add words that trigger automation
      </p>
      <div className="flex flex-wrap justify-start gap-2 items-center">
        {data?.data?.keywords &&
          data?.data?.keywords?.length > 0 &&
          data?.data?.keywords?.map(
            (word) =>
              word.id !== latestVariable.variables.id && (
                <div
                  className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full"
                  key={word.id}
                >
                  <p>{word.word}</p>
                  <X
                    size={20}
                    onClick={() => deleteMutation({ id: word.id })}
                  />
                </div>
              )
          )}
        {latestVariable && latestVariable.status === "pending" && (
          <div className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full">
            {latestVariable.variables.keyword}
          </div>
        )}
        <Input 
            placeholder="Add Keyword..."
            style={{
                width: `${Math.max((keyword || "Add Keyword...").length * 0.8 + 2, 10)}ch`,
            }}
            value={keyword}
            className="p-0 bg-transparent ring-0 border-none outline-none"
            onChange={onValueChange}
            onKeyUp={onKeyPress}
        />
      </div>
    </div>
  );
};

export default Keywords;
