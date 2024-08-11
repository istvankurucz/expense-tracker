import { Fragment, useState } from "react";
import { useStateValue } from "../../contexts/Context API/StateProvider";
import useTransactions from "../../hooks/transaction/useTransactions";
import { Link } from "react-router-dom";
import Spinner from "../../components/ui/Spinner/Spinner";
import Page from "../../components/layout/Page/Page";
import Section from "../../components/layout/Section/Section";
import TabSelect from "../../components/ui/TabSelect/TabSelect";
import Chart from "../../components/ui/Chart/Chart";
import NoTransaction from "../../components/layout/Section/NoTransaction/NoTransaction";
import Transaction from "../../components/ui/Transaction/Transaction";
import UserLoadingFrame from "../../components/layout/LoadingFrame/UserLoadingFrame/UserLoadingFrame";
import "./Home.css";

const reportItems = ["Hónap", "Kezdetektől"];
const pieLegend = [
	{
		color: "red",
		text: "red",
	},
	{
		color: "blue",
		text: "blue",
	},
	{
		color: "green",
		text: "green",
	},
];

function Home() {
	// States
	const [{ user }] = useStateValue();
	const { transactions, transactionsLoading } = useTransactions(5);
	const [index, setIndex] = useState(0);
	const [showCaption, setShowCaption] = useState(true);

	// Variables
	const firstname = user?.displayName.split(" ")[0];

	return (
		<UserLoadingFrame>
			<Page className="home">
				<Section id="homeWelcome" py="1.5rem">
					<h2 className="home__title">Szia {firstname}!</h2>
				</Section>

				<Section id="homeBalance">
					<Section.Title>Aktuális egyenleg</Section.Title>

					<TabSelect items={reportItems} index={index} setIndex={setIndex} />

					<Chart type="bar" justify="flex-start">
						<Chart.Bar
							animate={true}
							width="3.33rem"
							color="var(--success-color)"
							height={50}
							name="Bevétel"
							value="50 Ft"
						/>
						<Chart.Bar
							animate={true}
							width="3.33rem"
							color="var(--danger-color)"
							height={100}
							name="Kiadás"
							value="100 Ft"
						/>
						<Chart.Bar
							animate={true}
							width="3.33rem"
							color="var(--success-color)"
							height={50}
							name="Bevétel"
							value="50 Ft"
						/>
						<Chart.Bar
							animate={true}
							width="3.33rem"
							color="var(--danger-color)"
							height={100}
							name="Kiadás"
							value="100 Ft"
						/>
						<Chart.Bar
							animate={true}
							width="3.33rem"
							color="var(--success-color)"
							height={50}
							name="Bevétel"
							value="50 Ft"
						/>
						<Chart.Bar
							animate={true}
							width="3.33rem"
							color="var(--danger-color)"
							height={100}
							name="Kiadás"
							value="100 Ft"
						/>
						<Chart.Bar
							animate={true}
							width="3.33rem"
							color="var(--success-color)"
							height={50}
							name="Bevétel"
							value="50 Ft"
						/>
						<Chart.Bar
							animate={true}
							width="3.33rem"
							color="var(--danger-color)"
							height={100}
							name="Kiadás"
							value="100 Ft"
						/>
						<Chart.Bar
							animate={true}
							width="3.33rem"
							color="var(--success-color)"
							height={50}
							name="Bevétel"
							value="50 Ft"
						/>
						<Chart.Bar
							animate={true}
							width="3.33rem"
							color="var(--danger-color)"
							height={100}
							name="Kiadás"
							value="100 Ft"
						/>
					</Chart>
				</Section>

				<Section id="homeCategories">
					<Section.Title>Kategóriánkénti megoszlás</Section.Title>

					<button onClick={() => setShowCaption((show) => !show)}>
						{showCaption ? "Hide" : "Show"} caption
					</button>
					<Chart
						type="pie"
						justify="center"
						size="16rem"
						offset={showCaption ? "1rem" : "0"}
						legend={pieLegend}>
						<Chart.Pie
							color="var(--category-salary-color)"
							fromDegree={0}
							degree={360 / 11}
							value="45%"
							showCaption={showCaption}
						/>
						<Chart.Pie
							color="var(--category-interest-color)"
							fromDegree={360 / 11}
							degree={360 / 11}
							value="45%"
							showCaption={showCaption}
						/>
						<Chart.Pie
							color="var(--category-food-color)"
							fromDegree={(2 * 360) / 11}
							degree={360 / 11}
							value="45%"
							showCaption={showCaption}
						/>
						<Chart.Pie
							color="var(--category-entertainment-color)"
							fromDegree={(3 * 360) / 11}
							degree={360 / 11}
							value="45%"
							showCaption={showCaption}
						/>
						<Chart.Pie
							color="var(--category-health-color)"
							fromDegree={(4 * 360) / 11}
							degree={360 / 11}
							value="45%"
							showCaption={showCaption}
						/>
						<Chart.Pie
							color="var(--category-housing-color)"
							fromDegree={(5 * 360) / 11}
							degree={360 / 11}
							value="45%"
							showCaption={showCaption}
						/>
						<Chart.Pie
							color="var(--category-utilities-color)"
							fromDegree={(6 * 360) / 11}
							degree={360 / 11}
							value="45%"
							showCaption={showCaption}
						/>
						<Chart.Pie
							color="var(--category-transportation-color)"
							fromDegree={(7 * 360) / 11}
							degree={360 / 11}
							value="45%"
							showCaption={showCaption}
						/>
						<Chart.Pie
							color="var(--category-clothing-color)"
							fromDegree={(8 * 360) / 11}
							degree={360 / 11}
							value="45%"
							showCaption={showCaption}
						/>
						<Chart.Pie
							color="var(--category-education-color)"
							fromDegree={(9 * 360) / 11}
							degree={360 / 11}
							value="45%"
							showCaption={showCaption}
						/>
						<Chart.Pie
							color="var(--category-other-color)"
							fromDegree={(10 * 360) / 11}
							degree={360 / 11}
							value="45%"
							showCaption={showCaption}
						/>
					</Chart>
				</Section>

				<Section id="homeLastTransactions">
					<Section.Title className="home__transactions__title">
						Legutóbbi tranzakciók
						<Link to="/" className="home__transactions__title__link">
							Összes
						</Link>
					</Section.Title>

					{transactionsLoading ? (
						<div className="home__transactions__loading">
							<Spinner size="5rem" text="Legutóbbi tranzakciók betöltése" />
						</div>
					) : transactions.length === 0 ? (
						<NoTransaction />
					) : (
						<div className="home__transactions__container">
							{transactions.map((transaction, i) => (
								<Fragment key={transaction.id}>
									<Transaction
										category={transaction.category}
										type={transaction.type}
										date={transaction.date.toLocaleDateString().replaceAll(" ", "")}
										group={transaction.group}
										user={transaction.user}
										name={transaction.name}
										amount={transaction.amount}
										comment={transaction.comment}
									/>
									{i !== transactions.length - 1 && (
										<hr className="home__transactions__divider" />
									)}
								</Fragment>
							))}
						</div>
					)}
				</Section>
			</Page>
		</UserLoadingFrame>
	);
}

export default Home;
