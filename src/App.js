import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "./Create";
import BlogDetails from "./BlogDetails";
import NotFind from "./NotFind";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/blogs/:id" element={<BlogDetails />} />
                        {/* minden másra a NotFind 404 oldal jön be */}
                        <Route path="*" element={<NotFind />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
