import useGroups from "../../hooks/group/useGroups";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import { Link } from "react-router-dom";
import Page from "../../components/layout/Page/Page";
import Section from "../../components/layout/Section/Section";
import UserLoadingFrame from "../../components/layout/LoadingFrame/UserLoadingFrame/UserLoadingFrame";
import Button from "../../components/ui/Button/Button";
import GroupRow from "../../components/ui/GroupRow/GroupRow";
import NoGroup from "../../components/layout/Section/NoGroup/NoGroup";
import checkIfAdmin from "../../utils/group/checkIfAdmin";
import SectionSpinner from "../../components/ui/Spinner/SectionSpinner/SectionSpinner";
import "./Groups.css";

function Groups() {
	// States
	const [{ user }] = useStateValue();
	const { groups, groupLoading } = useGroups();

	return (
		<UserLoadingFrame>
			<Page className="groups">
				<Section id="groupsTitle">
					<Page.Title>Csoportok</Page.Title>
				</Section>

				<Section id="groupsNew">
					<Section.Title>Új csoport</Section.Title>

					<p className="groups__p">
						Kattints az alábbi gombokra és csatlakozz egy csoporthoz vagy hozz létre egy
						sajátot a barátaiddal és rokonaiddal együtt.
					</p>

					<div className="groups__new__buttons">
						<Link to="/join-group">
							<Button outlined tabIndex={-1}>
								Csatlakozás csoporthoz
							</Button>
						</Link>
						<Link to="/new-group">
							<Button tabIndex={-1}>Új csoport létrehozása</Button>
						</Link>
					</div>
				</Section>

				<Section id="groupsMy">
					<Section.Title>Csoportjaim</Section.Title>

					{groupLoading ? (
						<SectionSpinner text="Csoportok betöltése" />
					) : groups.length === 0 ? (
						<NoGroup />
					) : (
						<div className="groups__my__container">
							{groups.map((group) => (
								<GroupRow
									key={group.id}
									id={group.id}
									name={group.name}
									isAdmin={checkIfAdmin(group.roles, user.uid)}
								/>
							))}
						</div>
					)}
				</Section>
			</Page>
		</UserLoadingFrame>
	);
}

export default Groups;
