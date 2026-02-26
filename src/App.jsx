import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Book from "./pages/Book";
import Connected from "./pages/Connected";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Services from "./pages/Services";
import Layout from "./Layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="book" element={<Book />} />
          <Route path="connected" element={<Connected />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="services" element={<Services />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
