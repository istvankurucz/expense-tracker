import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import useAuth from "./hooks/auth/useAuth";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import Feedback from "./components/ui/Feedback/Feedback";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import NewTransactionButton from "./components/ui/Button/NewTransactionButton/NewTransactionButton";
import NewTransaction from "./pages/NewTransaction/NewTransaction";
import NewGroup from "./pages/NewGroup/NewGroup";
import Group from "./pages/Group/Group";
import Groups from "./pages/Groups/Groups";
import JoinGroup from "./pages/JoinGroup/JoinGroup";
import GroupProvider from "./contexts/group/GroupContext";
import Transactions from "./pages/Transactions/Transactions";
import TransactionDetails from "./pages/Transactions/TransactionDetails/TransactionDetails";
import Profile from "./pages/Profile/Profile";
import ProfileData from "./pages/Profile/ProfileData/ProfileData";
import ProfileReports from "./pages/Profile/ProfileReports/ProfileReports";
import "./App.css";

function App() {
	// Hooks
	useAuth();
	const location = useLocation();

	// Functions
	function renderWithHeaderAndFooter(component) {
		return (
			<>
				<Header />
				{component}
				<Footer />
			</>
		);
	}

	return (
		<div className="app">
			<Feedback />

			{location?.pathname !== "/new-transaction" && <NewTransactionButton />}

			<Routes>
				{/* Transactions */}
				<Route
					path="/new-transaction"
					element={renderWithHeaderAndFooter(<NewTransaction />)}
				/>
				<Route path="/transactions" element={renderWithHeaderAndFooter(<Transactions />)}>
					<Route path=":transactionId" element={<TransactionDetails />} />
				</Route>
				<Route
					path="/transactions/:transactionId/edit"
					element={renderWithHeaderAndFooter(<NewTransaction edit />)}
				/>

				{/* Groups */}
				<Route path="/groups" element={renderWithHeaderAndFooter(<Groups />)} />
				<Route path="/new-group" element={renderWithHeaderAndFooter(<NewGroup />)} />
				<Route path="/join-group" element={renderWithHeaderAndFooter(<JoinGroup />)} />
				<Route
					path="/groups/:groupId"
					element={<GroupProvider>{renderWithHeaderAndFooter(<Group />)}</GroupProvider>}
				>
					<Route index element={<Navigate to="overview" replace />} />
					<Route path="overview" element={<Group.Overview />} />
					<Route path="reports" element={<Group.Reports />} />
					<Route path="settings" element={<Group.Settings />} />
				</Route>

				{/* Profile */}
				<Route path="/profile" element={renderWithHeaderAndFooter(<Profile />)}>
					<Route index element={<Navigate to="data" replace />} />
					<Route path="data" element={<ProfileData />} />
					<Route path="reports" element={<ProfileReports />} />
				</Route>

				{/* Auth */}
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/password-reset" element={<PasswordReset />} />

				<Route path="/" element={renderWithHeaderAndFooter(<Home />)} />
				<Route path="*" element={<h1>Page not found</h1>} />
			</Routes>
		</div>
	);
}

export default App;
