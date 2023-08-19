import prismadb from "@/lib/prismadb";

import { CompanionForm } from "./components/companion-form";

interface CompanionIdPageProps {
	params: {
		companionId: string;
	};
}

const page = async ({ params }: CompanionIdPageProps) => {
	// TODO CHECK SUBSCRIPTION

	const companion = await prismadb.companion.findUnique({
		where: {
			id: params.companionId,
		},
	});

	const catgeories = await prismadb.category.findMany();

	return <CompanionForm initialData={companion} categories={catgeories} />;
};

export default page;
