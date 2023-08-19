import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";
import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";

interface RootPageProos {
	searchParams: {
		categoryId: string;
		name: String;
	};
}

const RootPage = async ({ searchParams }: RootPageProos) => {
	// SEARCH BY NAME DOES NOT WORK HERE
	const data = await prismadb.companion.findMany({
		where: {
			categoryId: searchParams.categoryId,
		},
		orderBy: {
			createdAt: "desc",
		},
		// COUNT ALL THE MESSAGES OF THIS COMPANION

		include: {
			_count: {
				select: {
					messages: true,
				},
			},
		},
	});

	const categories = await prismadb.category.findMany();
	return (
		<div className="h-full p-4 space-y-2">
			<SearchInput />

			<Categories data={categories} />

			<Companions data={data} />
		</div>
	);
};

export default RootPage;
