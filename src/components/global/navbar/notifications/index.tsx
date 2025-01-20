import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

const Notifications = () => {
    return (
      <Button className="bg-white rounded-full py-6">
        <Bell
          color="#3352CC"
          fill="#3352CC"
        />
      </Button>
    )
}

export default Notifications;
