import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

export default function Editor({ currentNote, updateNote }) {
	const [selectedTab, setSelectedTab] = useState("write");

	function previewToggle () {
		setSelectedTab(() => prevSelectedTab === !prevSelectedTab)
	}

	return (
		<section className="pane editor">
			<button onClick={previewToggle}>Preview Only</button>
			<MDEditor
				// eslint-disable-next-line react/prop-types
				value={currentNote.body}
				onChange={updateNote}
				previewOptions={{
					rehypePlugins: [[rehypeSanitize]],
				}}
				height="100%"
			/>
		</section>
	);
}
