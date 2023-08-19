import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import { ChatClient } from "./components/client";

interface ChatIdPageProps {
	params: {
		chatId: string;
	};
}

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
	const { userId } = auth();

	if (!userId) {
		return redirectToSignIn();
	}

	const companion = await prismadb.companion.findUnique({
		where: {
			id: params.chatId,
		},

		include: {
			messages: {
				orderBy: {
					createdAt: "asc",
				},
				where: {
					userId, // ONLY LOAD MESSAGE between companion and current logged in user
				},
			},

			_count: {
				select: {
					messages: true, // will count all messages from all users
				},
			},
		},
	});

	if (!companion) {
		return redirect("/");
	}
	return <ChatClient companion={companion} />;
};

export default ChatIdPage;
