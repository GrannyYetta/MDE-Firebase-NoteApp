import ReactMde from "react-mde";
import Showdown from "showdown";
import { useState } from "react";

export default function Editor({ currentNote, updateNote }) {
	const [selectedTab, setSelectedTab] = useState("write");

	const converter = new Showdown.Converter.Converter({
		tables: true,
		simplifiedAudio: true,
		strikethrought: true,
		tasklist: true,
	});

	return (
		<section className="pane editor">
			<ReactMde
				value={currentNote.body}
				onChange={updateNote}
				selectedTab={selectedTab}
				onTabChange={setSelectedTab}
				generateMarkdownPreview={(markdown) =>
					Promise.resolve(converter.makeHtml(markdown))
				}
			/>
		</section>
	);
}
