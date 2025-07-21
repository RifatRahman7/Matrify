import React from 'react';
import Navbar from '../Components/Navbar';
import BannerSlider from '../Components/BannerSlirder';
import PremiumMembers from '../Components/PremiumMembers';
import HowItWorks from '../Components/HowItWorks';
import SuccessCounter from '../Components/SuccessCounter';
import SuccessStory from '../Components/SuccessStory';
import Footer from '../Components/Footer';

const Home = () => {
    return (
        <div>
            <Navbar />
            <BannerSlider />
            <PremiumMembers />
            <HowItWorks />
            <SuccessCounter />
            <SuccessStory />
            <Footer />
        </div>
    );
};

export default Home;