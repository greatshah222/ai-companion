"use client";

import { ElementRef, useEffect, useRef, useState } from "react";

import { Companion } from "@prisma/client";

import { ChatMessage, ChatMessageProps } from "@/components/chat-message";

interface ChatMessagesProps {
	isLoading: boolean;
	companion: Companion;
	messages: ChatMessageProps[];
}
export const ChatMessages = ({ isLoading, companion, messages = [] }: ChatMessagesProps) => {
	const scrollRef = useRef<ElementRef<"div">>(null);
	// WE WILL SHOW SOME FAKE SPINNER IF USER IS FIRST TIME CHATTING WITH THE BOT
	const [fakeLoading, setFakeLoading] = useState(messages?.length === 0 ? true : false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setFakeLoading(false);
		}, 1000);

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	useEffect(() => {
		scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages?.length]);

	return (
		<div className="flex-1 overflow-y-auto pr-4">
			<ChatMessage
				isLoading={fakeLoading}
				src={companion.src}
				role="system"
				content={`hello i am ${companion.name}, ${companion.description}`}
			/>

			{messages.map((el) => (
				<ChatMessage key={el.content} role={el.role} content={el.content} src={companion.src} />
			))}

			{isLoading && <ChatMessage isLoading src={companion.src} role="system" />}

			{/* // SCROLL TO BOTTOM */}

			<div ref={scrollRef} />
		</div>
	);
};
