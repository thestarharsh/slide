import { AutomationDuoToneWhite } from "@/icons";
import { Button } from "@/components/ui/button";

import Loader from "../loader";

const CreateAutomation = () => {
    return (
        <Button
            className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70]"
            onClick={() => {}}
        >
            <Loader state={false}>
                <AutomationDuoToneWhite />
                <p className="lg:inline hidden">Create an Automation</p>
            </Loader>
        </Button>
    );
};

export default CreateAutomation;
