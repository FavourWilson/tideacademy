import ContactUs from "./component/Contact"
import Courses from "./component/Courses"
import Faq from "./component/Faq"
import Footer from "./component/Footer"
import Hero from "./component/Hero"
import JoinUs from "./component/JoinUs"
import Layout from "./component/Layout"
import Learn from "./component/Learn"
import Navbar from "./component/Navbar"
import TestimonialSlider from "./component/Testimonials"


function App() {

  return (
    <>
    <Layout>
      <Navbar/>
      <Hero/>
      <Learn/>
      <JoinUs/>
      <Courses/>
      <Faq/>
      <TestimonialSlider/>
      <ContactUs/>
      
    </Layout>
    <Footer/>
    </>
  )
}

export default App
