import React from 'react';
import Navbar from '../Components/Navbar';
import BannerSlider from '../Components/BannerSlirder';
import PremiumMembers from '../Components/PremiumMembers';
import HowItWorks from '../Components/HowItWorks';

const Home = () => {
    return (
        <div>
            <Navbar />
            <BannerSlider />
            <PremiumMembers />
            <HowItWorks />
        </div>
    );
};

export default Home;