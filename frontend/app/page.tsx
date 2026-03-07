"use client";

import SearchBar from "@/components/SearchBar";
import SnippetCard from "@/components/SnippetCard";
import { SnippetType } from "@/types";

const Home = () => {
	return <><SearchBar onSearch={() => { }} /><SnippetCard _id="123" title="Example" content="description" type={SnippetType.LINK} tags={["urgent", "important"]} onDelete={() => { }} onEdit={() => { }} /></>;
};

export default Home;
