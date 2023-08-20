import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import { CompanionForm } from "./components/companion-form";

interface CompanionIdPageProps {
	params: {
		companionId: string;
	};
}

const page = async ({ params }: CompanionIdPageProps) => {
	const { userId } = auth();

	if (!userId) {
		return redirectToSignIn();
	}
	// TODO CHECK SUBSCRIPTION

	const companion = await prismadb.companion.findUnique({
		where: {
			id: params.companionId,
			userId, // ONLY THE USER WHO CREATEDD THIS COMPANION WILL SEE THIS
		},
	});

	const catgeories = await prismadb.category.findMany();

	return <CompanionForm initialData={companion} categories={catgeories} />;
};

export default page;
