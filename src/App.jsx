import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Adminmere from "./composant/interface/Adminmere";
import Adminfils from "./composant/interface/Adminfils";
import ProtectedRoute from "./composant/identification/ProtectedRoute ";
import Visiteur from "./composant/interface/Visiteur";
import Navbar from "./components/Navbar";
import Produits from "./components/Produits/Produits";
import Accueil from "./components/Accueil/Accueil";
import Contact from "./components/Contact/Contact";
import APropos from "./components/Apropos/Apropos";
import Footer from "./components/Footerrr";

//const Navigation = React.lazy(() => import('../Navigation'));

{
  /*          <Route path="/toutes" element={<Navbar />} />

       <div>
      <BrowserRouter>
        {" "}
        <Navbarrr />
        <StructuredData />
        <Routes>
          <Route index element={<Hero />} />
          <Route path="*" element={<Erreurr />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contacnous />} />
          <Route path="/apropos" element={<Quisommenous />} />
          <Route path="/realisation" element={<Realisations />} />
        </Routes>
      
      </BrowserRouter>
    </div> 
      */
}
//la route Adminfils est protégée et accessible uniquement aux utilisateurs authentifiés.
function App() {
  return (
    <div>   
      <BrowserRouter>
        <Routes>
          <Route index element={<Accueil />} />
          {/* Protection des route admin lors de connexion */}
          <Route
            path="/adminfils"
            element={
              <ProtectedRoute>
                <Adminfils />
              </ProtectedRoute>
            }
          />{" "}
          {/* Protection des route admin lors de connexion */}
          <Route
            path="/adminmere"
            element={
              <ProtectedRoute>
                <Adminmere />
              </ProtectedRoute>
            }
          />
          <Route path="/visiteur" element={<Visiteur />} />
       
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/produit" element={<Produits />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apropos" element={<APropos />} />
       


       </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
