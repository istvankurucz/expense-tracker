import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import { useGroupContext } from "../../../../contexts/group/GroupContext";
import Modal from "../../../../components/layout/Modal/Modal";
import Overlay from "../../../../components/layout/Overlay/Overlay";
import Button from "../../../../components/ui/Button/Button";
import "./GroupSettingsMembers.css";

function GroupSettingsMembers({ show, setShow }) {
	const { group } = useGroupContext();

	return (
		<Overlay show={show}>
			<Modal>
				<Modal.Header>
					<Modal.Title>Tagok</Modal.Title>
					<Modal.Close onClick={() => setShow(false)} />
				</Modal.Header>

				<Modal.Body>
					<ul className="groupSettingsMembers__list">
						{group?.roles.map((role) => (
							<li key={role.member.id} className="groupSettingsMembers__list__item">
								<span className="groupSettingsMembers__list__item__name">
									{role.member.name}
								</span>
								{role.role === "admin" && (
									<FontAwesomeIcon
										icon={faUserGear}
										title="Admin"
										className="groupSettingsMembers__list__item__admin"
									/>
								)}
							</li>
						))}
					</ul>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="info" outlined onClick={() => setShow(false)}>
						Vissza
					</Button>
				</Modal.Footer>
			</Modal>
		</Overlay>
	);
}

GroupSettingsMembers.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
};

export default GroupSettingsMembers;
