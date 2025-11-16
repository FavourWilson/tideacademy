import Layout from './Layout'
import Navbar from './Navbar'
import Hero from './Hero'
import Learn from './Learn'
import JoinUs from './JoinUs'
import Courses from './Courses'
import Faq from './Faq'
import TestimonialSlider from './Testimonials'
import ContactUs from './Contact'
import Footer from './Footer'

const Homepage = () => {
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

export default Homepage