import { useState } from "react";
import { Outlet } from "react-router-dom";
import Container from "../../components/layout/Container/Container";
import UserLoadingFrame from "../../components/layout/LoadingFrame/UserLoadingFrame/UserLoadingFrame";
import Page from "../../components/layout/Page/Page";
import ProfileSidebar from "./ProfileSidebar/ProfileSidebar";
import "./Profile.css";

function Profile() {
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<UserLoadingFrame>
			<Page className="profile">
				<Container className="profile__container">
					<Profile.Sidebar show={showSidebar} setShow={setShowSidebar} />

					<div className="profile__body">
						<Outlet />
					</div>
				</Container>
			</Page>
		</UserLoadingFrame>
	);
}

Profile.Sidebar = ProfileSidebar;

export default Profile;
