import { useState } from "react";
import { Outlet } from "react-router-dom";
import GroupLoadingFrame from "../../components/layout/LoadingFrame/GroupLoadingFrame/GroupLoadingFrame";
import Page from "../../components/layout/Page/Page";
import Container from "../../components/layout/Container/Container";
import GroupSidebar from "./GroupSidebar/GroupSidebar";
import GroupSettings from "./GroupSettings/GroupSettings";
import "./Group.css";

function Group() {
	// States
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<GroupLoadingFrame>
			<Page className="group">
				<Container className="group__container">
					<Group.Sidebar show={showSidebar} setShow={setShowSidebar} />

					<div className="group__body">
						<Outlet />
					</div>
				</Container>
			</Page>
		</GroupLoadingFrame>
	);
}

Group.Sidebar = GroupSidebar;
Group.Settings = GroupSettings;

export default Group;
