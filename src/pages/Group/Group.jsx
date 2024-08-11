import { useGroupContext } from "../../contexts/group/GroupContext";
import GroupLoadingFrame from "../../components/layout/LoadingFrame/GroupLoadingFrame/GroupLoadingFrame";
import Page from "../../components/layout/Page/Page";
import Section from "../../components/layout/Section/Section";
import GroupSidebar from "./GroupSidebar/GroupSidebar";
import "./Group.css";
import Container from "../../components/layout/Container/Container";
import { useState } from "react";

function Group() {
	// States
	const { group } = useGroupContext();
	const [showSidebar, setShowSidebar] = useState(false);
	// console.log("Group:", group);

	return (
		<GroupLoadingFrame>
			<Page className="group">
				<Container className="group__container">
					<Group.Sidebar show={showSidebar} setShow={setShowSidebar} />

					<div className="group__body">
						<Section id="groupTitle">
							<Page.Title>{group == null ? "Group name" : group.name}</Page.Title>
						</Section>

						<Section id="1">
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure laudantium,
							nisi, est ipsam voluptas tenetur tempore neque quod amet omnis fuga eum ea qui.
							Dolor temporibus iusto ex porro consequatur nulla mollitia quisquam quam unde!
							Cupiditate magnam sapiente eveniet, alias nisi reiciendis qui repudiandae iusto
							dolores deserunt possimus repellendus corporis totam, quisquam eius officiis ad
							cum, ipsa commodi odio dolore. Quas, a repellendus exercitationem similique
							voluptatem ipsam ad saepe reiciendis laboriosam sunt officia, tempora ex qui
							fugiat voluptas. Culpa consequuntur alias quo sed, aut accusantium illo
							eligendi perspiciatis facere obcaecati. Esse accusamus consequuntur, eos
							aspernatur iste sequi at molestias odio!
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
						</Section>
					</div>
				</Container>
			</Page>
		</GroupLoadingFrame>
	);
}

Group.Sidebar = GroupSidebar;

export default Group;
