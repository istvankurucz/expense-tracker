import { faHouse, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

const mainMenuItems = [
	{
		name: "home",
		text: "Főoldal",
		icon: faHouse,
		link: "/",
		variant: "",
		submenu: null,
	},
	{
		name: "groups",
		text: "Csoportok",
		icon: faUsers,
		link: "/groups",
		variant: "",
		submenu: [
			{
				name: "group1",
				text: "Csoport 1",
				icon: null,
				link: "",
				variant: "",
			},
			{
				name: "group2",
				text: "Csoport 2",
				icon: null,
				link: "",
				variant: "",
			},
			{
				name: "group3",
				text: "Csoport 3",
				icon: null,
				link: "",
				variant: "accent",
			},
		],
	},
	{
		name: "profile",
		text: "Profil",
		icon: faUser,
		link: "",
		variant: "",
		submenu: [
			{
				name: "myData",
				text: "Adataim",
				icon: null,
				link: "",
				variant: "",
			},
			{
				name: "auth",
				text: "Kijelentkezés",
				icon: null,
				link: "",
				variant: "",
			},
		],
	},
];

export default mainMenuItems;
