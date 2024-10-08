import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "./contexts/Context API/StateProvider.jsx";
import reducer, { initialState } from "./contexts/Context API/reducer.js";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<StateProvider initialState={initialState} reducer={reducer}>
				<App />
			</StateProvider>
		</BrowserRouter>
	</React.StrictMode>
);
