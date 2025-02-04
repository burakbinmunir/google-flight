import './App.css'
import Header from "./pages/components/Header.jsx";
import main_image from './assets/main_image.png'
import ExploreFlights from "./pages/components/ExploreFlights.jsx";
import FAQs from "./pages/components/FAQs.jsx";
import Footer from "./pages/components/Footer.jsx";
import FlightsDestinations from "./pages/components/FlightsDestinations.jsx";

function App() {


    return (
        <div>
            <Header/>
            <img src={main_image} className={'my-10'}/>
            <div className={"mx-20"}>
                <ExploreFlights/>
                <FAQs />
                <FlightsDestinations/>
                <Footer/>
            </div>
        </div>
    )
}

export default App
