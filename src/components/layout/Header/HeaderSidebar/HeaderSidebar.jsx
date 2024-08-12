import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleDoubleLeft,
	faAngleDown,
	faArrowRightToBracket,
	faHouse,
	faPlus,
	faUser,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Brand from "../../../ui/Brand/Brand";
import Button from "../../../ui/Button/Button";
import Header from "../Header";
import IconLink from "../../../ui/IconLink/IconLink";
import useCloseSidebar from "../../../../hooks/dom/useCloseSidebar";
import "./HeaderSidebar.css";

function HeaderSidebar({ show, setShow, groups = [] }) {
	// States
	useCloseSidebar(setShow);
	const [showGroupSubmenu, setShowGroupSubmenu] = useState(false);
	const [showProfileSubmenu, setShowProfileSubmenu] = useState(false);

	return (
		<div className={`headerSidebar${show ? " headerSidebar--show" : ""}`}>
			<div className="headerSidebar__brand">
				<Brand />

				<Button
					variant="info"
					outlined
					icon
					className="headerSidebar__hide"
					onClick={() => setShow(false)}>
					<FontAwesomeIcon icon={faAngleDoubleLeft} />
				</Button>
			</div>

			<Header.ActionButton />

			<nav className="headerSidebar__nav">
				<ul className="headerSidebar__menu">
					<li>
						<Link to="/" title="Főoldal">
							<FontAwesomeIcon icon={faHouse} />
							Főoldal
						</Link>
					</li>
					<li>
						<Link
							to=""
							title="Csoportok"
							onClick={() => setShowGroupSubmenu((show) => !show)}>
							<FontAwesomeIcon icon={faUsers} />
							Csoportok
							<FontAwesomeIcon icon={faAngleDown} />
						</Link>

						{showGroupSubmenu && (
							<ul className="headerSidebar__submenu">
								<li>
									<Link to="/groups">Összes</Link>
								</li>
								{groups.map((group) => (
									<li key={group.id}>
										<Link to={`/groups/${group.id}`}>{group.name}</Link>
									</li>
								))}
								<li className="header__menu__item--accent">
									<IconLink to="/join-group">
										<FontAwesomeIcon icon={faArrowRightToBracket} /> Csatlakozás
									</IconLink>
								</li>
								<li className="header__menu__item--accent">
									<IconLink to="/new-group">
										<FontAwesomeIcon icon={faPlus} /> Új csoport
									</IconLink>
								</li>
							</ul>
						)}
					</li>
					<li>
						<Link to="" title="Profil" onClick={() => setShowProfileSubmenu((show) => !show)}>
							<FontAwesomeIcon icon={faUser} />
							Profil
							<FontAwesomeIcon icon={faAngleDown} />
						</Link>

						{showProfileSubmenu && (
							<ul className="headerSidebar__submenu">
								<li>
									<Link to="/">Adataim</Link>
								</li>
								<li>
									<Header.AuthButton />
								</li>
							</ul>
						)}
					</li>
				</ul>
			</nav>
		</div>
	);
}

HeaderSidebar.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
	groups: PropTypes.array,
};

export default HeaderSidebar;
