import { redirect } from "next/navigation";

import { onBoardUser } from "@/actions/user";

const DashboardPage = async () => {
    const user = await onBoardUser();
    if (user.status === 200 || user.status === 201) {
        return redirect(`dashboard/${user.data?.firstname}${user.data?.lastname}`);
    }

    return redirect('/sign-in');
};

export default DashboardPage;
