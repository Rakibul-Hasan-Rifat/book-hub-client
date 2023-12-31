import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
  return (
    <section className=''>
        <Header />
        <Outlet />
        <Footer />
    </section>
  )
}

export default MainLayout