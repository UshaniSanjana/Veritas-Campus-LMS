import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

// Static Pages
import Home from "./pages/static/Home";
import WhoWeAre from "./pages/static/WhoWeAre";
import Programmes from "./pages/static/Programmes";
import News from "./pages/static/News";
import ContactUs from "./pages/static/ContactUs";

// Instructor Features

import AddQuiz from "./pages/instructor/AddQuiz";
import QuizList from "./pages/instructor/QuizList";
import UpdateQuiz from "./pages/instructor/UpdateQuiz";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import AddAssignment from "./pages/instructor/AddAssignment";
import AddedAssignment from "./pages/instructor/AddedAssignment";
import EditAssignment from "./pages/instructor/EditAssignment";
import StudentRoutes from "./routes/StudentRoutes";
import StudentNavbar from "./components/StudentNavbar";
import SignIn from "./pages/auth/SignIn";

function App() {
  return (
    <div>
      <StudentNavbar />
      {/* <ScrollToTop /> */}

      <Routes>
        {/* Static Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/whoweare" element={<WhoWeAre />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/news" element={<News />} />
        <Route path="/contactus" element={<ContactUs />} />

        {/* Instructor Routes */}
        <Route path="/addquiz" element={<AddQuiz />} />
        <Route path="/quizlist" element={<QuizList />} />
        <Route path="/updatequiz/:id" element={<UpdateQuiz />} />
        <Route path="/addassignment" element={<AddAssignment />} />
        <Route
          path="/instructor/added-assignment"
          element={<AddedAssignment />}
        />
        <Route
          path="/instructor/edit-assignment/:id"
          element={<EditAssignment />}
        />

        <Route path="/signin" element={<SignIn />} />

        {StudentRoutes()}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
