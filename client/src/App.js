import Navbar from "./components/Navbar/Navbar";

const navbarItems = ["home", "about-us", "contact us", "people"]

const App = () => {
	return (
	<div> 
		<Navbar head={"linkat"} items={navbarItems} />
	</div>
	);
}

export default App;
