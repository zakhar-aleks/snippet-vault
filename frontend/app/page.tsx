"use client";

import SnippetCard from "@/components/SnippetCard";
import { SnippetType } from "@/types";

const Home = () => {
	return <SnippetCard _id="123" title="Example" content="description" type={SnippetType.LINK} tags={["urgent", "important"]} onDelete={() => { }} onEdit={() => { }} />;
};

export default Home;
