import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PATCH = async (
	req: Request,
	{
		params,
	}: {
		params: {
			companionId: string;
		};
	}
) => {
	try {
		const body = await req.json();
		const user = await currentUser();

		if (!params.companionId) {
			return new NextResponse("CompanionId is required", {
				status: 400,
			});
		}

		if (!user || !user.id || !user.firstName) {
			return new NextResponse("Unanthorized", {
				status: 401,
			});
		}

		const { src, name, description, instructions, seed, categoryId } = body;

		if (!src || !name || !description || !instructions || !seed || !categoryId) {
			return new NextResponse("Missing required fields", {
				status: 400,
			});
		}

		// TODO CHECK FOR SUBSCRIPTIONS

		const companion = await prismadb.companion.update({
			where: {
				id: params.companionId,
			},
			data: {
				categoryId,
				userId: user.id,
				userName: user.firstName,
				src,
				name,
				description,
				instructions,
				seed,
			},
		});

		return NextResponse.json(companion);
	} catch (error: any) {
		console.log("[COMPANION_PATCH]", error);
		return new NextResponse("Internal Error", {
			status: 500,
		});
	}
};
