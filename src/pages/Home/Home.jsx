import { useStateValue } from "../../contexts/Context API/StateProvider";
import useTransactions from "../../hooks/transaction/useTransactions";
import Page from "../../components/layout/Page/Page";
import Section from "../../components/layout/Section/Section";
import NoTransaction from "../../components/layout/Section/NoTransaction/NoTransaction";
import UserLoadingFrame from "../../components/layout/LoadingFrame/UserLoadingFrame/UserLoadingFrame";
import HomeBalanceSection from "./HomeBalanceSection/HomeBalanceSection";
import HomeCategoriesSection from "./HomeCategoriesSection/HomeCategoriesSection";
import LastTransactionsSection from "../../components/layout/Section/LastTransactionsSection/LastTransactionsSection";
import "./Home.css";

function Home() {
	// States
	const [{ user }] = useStateValue();
	const { transactions, transactionsLoading } = useTransactions();

	// Variables
	const firstname = user?.displayName.split(" ")[0];
	const noTransaction = !transactionsLoading && transactions.length === 0;

	return (
		<UserLoadingFrame>
			<Page className="home">
				<Section id="homeWelcome" py="1.5rem">
					<h2 className="home__title">Szia {firstname}!</h2>
				</Section>

				{noTransaction ? (
					<NoTransaction />
				) : (
					<>
						<Home.BalanceSection transactions={transactions} loading={transactionsLoading} />

						<Home.CategoriesSection
							transactions={transactions}
							loading={transactionsLoading}
						/>

						<LastTransactionsSection
							transactions={transactions}
							loading={transactionsLoading}
						/>
					</>
				)}
			</Page>
		</UserLoadingFrame>
	);
}

Home.BalanceSection = HomeBalanceSection;
Home.CategoriesSection = HomeCategoriesSection;

export default Home;
