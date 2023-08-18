import { UserButton } from "@clerk/nextjs";

const RootPage = () => {
	return <UserButton afterSignOutUrl="/" />;
};

export default RootPage;
