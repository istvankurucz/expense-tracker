import { faUserLargeSlash } from "@fortawesome/free-solid-svg-icons";
import AlertSection from "../AlertSection/AlertSection";
import "./NoGroup.css";

function NoGroup() {
	return (
		<AlertSection id="noGroup">
			<AlertSection.Icon icon={faUserLargeSlash} />

			<AlertSection.Text>
				<p className="noGroup__p">Még nem vagy egy csoportnak sem a tagja.</p>
				<p className="noGroup__p">
					Kattints a fent található gombok valamelyikére és csatlakozz egyhez vagy hozd létre a
					sajátod.
				</p>
			</AlertSection.Text>
		</AlertSection>
	);
}

export default NoGroup;
