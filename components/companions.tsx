import { Companion } from "@prisma/client";

import Image from "next/image";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";

interface CompanionsProps {
	data: (Companion & {
		_count: {
			messages: number;
		};
	})[];
}

export const Companions = ({ data }: CompanionsProps) => {
	if (data.length === 0) {
		return (
			<div className="pt-10 flex flex-col items-center justify-center space-y-3">
				<div className="relative w-60 h-60">
					<Image src={"/empty.png"} fill className="grayscale" alt="Empty" />{" "}
				</div>
				<p className="text-sm text-muted-foreground">No Companion found</p>
			</div>
		);
	}
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
			{data.map((el) => (
				<Card
					key={el.id}
					className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
				>
					<Link href={`/chat/${el.id}`}>
						<CardHeader className="flex items-center justify-center text-center text-muted-foreground">
							<div className="relative h-32 w-32">
								<Image src={el.src} fill className="rounded-xl object-cover" alt="Companion" />
							</div>
							<p className="font-bold">{el.name}</p>
							<p className="text-xs">{el.description}</p>
						</CardHeader>

						<CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
							<p className="lowercase">@{el.userName}</p>

							<div className="flex items-center">
								<MessageSquare className="w-3 h-3 mr-1" />

								{el._count.messages}
							</div>
						</CardFooter>
					</Link>
				</Card>
			))}
		</div>
	);
};
