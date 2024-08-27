import Page from "../../../components/layout/Page/Page";
import Section from "../../../components/layout/Section/Section";
import "./ProfileData.css";

function ProfileData() {
	return (
		<>
			<Section id="profileDataTitle">
				<Page.Title>Adataim</Page.Title>
			</Section>

			<Section id="profileDataPersonal">
				<Section.Title>Személyes adatok</Section.Title>
			</Section>
		</>
	);
}

export default ProfileData;
