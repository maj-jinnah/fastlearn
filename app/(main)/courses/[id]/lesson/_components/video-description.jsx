"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizModal from "./quiz-modal";

function VideoDescription({ description }) {
	return (
		<div className="mt-4">
			<Tabs defaultValue="details">
				<TabsList className="bg-transparent p-0 border-b border-border w-full justify-start h-auto rounded-none">
					<TabsTrigger className="capitalize" value="details">
						Description
					</TabsTrigger>
				</TabsList>
				<div className="pt-3">
					<TabsContent value="details">
						<p>{description}</p>
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
}

export default VideoDescription;
