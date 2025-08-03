import { auth } from "@/auth";
import ChangePassword from "../component/change-password";
import ContractInfo from "../component/contract-info";
import PersonalDetails from "../component/personal-details";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/queries/user";

async function Profile() {

	const session = await auth();
	const loggedInUser = await getUserByEmail(session?.user?.email);

    const userInfo= {...loggedInUser, _id: loggedInUser?._id.toString()};

    return (
        <>
            <PersonalDetails userInfo={userInfo} />
            <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-[30px]">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <ContractInfo />
                    <ChangePassword />
                </div>
            </div>
        </>
    );
}

export default Profile;
