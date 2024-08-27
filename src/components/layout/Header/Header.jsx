import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleDown,
	faArrowRightToBracket,
	faBars,
	faHouse,
	faPlus,
	faUser,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Container from "../Container/Container";
import Brand from "../../ui/Brand/Brand";
import Button from "../../ui/Button/Button";
import HeaderSidebar from "./HeaderSidebar/HeaderSidebar";
import HeaderActionButton from "./HeaderActionButton/HeaderActionButton";
import HeaderAuthButton from "./HeaderAuthButton/HeaderAuthButton";
import IconLink from "../../ui/IconLink/IconLink";
import useGroups from "../../../hooks/group/useGroups";
import "./Header.css";

function Header() {
	// States
	const { groups } = useGroups(3);
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<header className="header">
			<Header.Sidebar show={showSidebar} setShow={setShowSidebar} groups={groups} />

			<Container className="header__container">
				<Brand />

				<div className="header__right">
					<Header.ActionButton />

					<nav className="header__nav">
						<ul className="header__menu">
							<li>
								<Link to="/" title="Főoldal">
									<FontAwesomeIcon icon={faHouse} />
									Főoldal
								</Link>
							</li>
							<li className="header__menu__item--submenu">
								<Link to="/groups" title="Csoportok">
									<FontAwesomeIcon icon={faUsers} />
									Csoportok
									<FontAwesomeIcon icon={faAngleDown} />
								</Link>

								<ul className="header__submenu">
									{groups.length > 0 ? (
										groups.map((group) => (
											<li key={group.id}>
												<Link to={`/groups/${group.id}`}>{group.name}</Link>
											</li>
										))
									) : (
										<li>
											<Link to="/groups">Nincs csoport</Link>
										</li>
									)}
									<hr className="header__submenu__divider" />
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
							</li>
							<li className="header__menu__item--submenu">
								<Link to="/" title="Profil">
									<FontAwesomeIcon icon={faUser} />
									Profil
									<FontAwesomeIcon icon={faAngleDown} />
								</Link>

								<ul className="header__submenu">
									<li>
										<Link to="/">Adataim</Link>
									</li>
									<li>
										<Link to="/">Jelentések</Link>
									</li>
									<hr className="header__submenu__divider" />
									<li>
										<Header.AuthButton />
									</li>
								</ul>
							</li>
						</ul>
					</nav>

					<Button
						variant="info"
						outlined
						icon
						className="header__hamburger"
						onClick={() => setShowSidebar((show) => !show)}>
						<FontAwesomeIcon icon={faBars} />
					</Button>
				</div>
			</Container>
		</header>
	);
}

Header.ActionButton = HeaderActionButton;
Header.AuthButton = HeaderAuthButton;
Header.Sidebar = HeaderSidebar;

export default Header;
