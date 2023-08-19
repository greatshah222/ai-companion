import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	try {
		const body = await req.json();
		const user = await currentUser();

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

		const companion = await prismadb.companion.create({
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
		console.log("[COMPANION_POST]", error);
		return new NextResponse("Internal Error", {
			status: 500,
		});
	}
};
