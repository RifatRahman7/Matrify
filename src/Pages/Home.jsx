import React from 'react';
import Navbar from '../Components/Navbar';
import BannerSlider from '../Components/BannerSlider';
import PremiumMembers from '../Components/PremiumMembers';
import HowItWorks from '../Components/HowItWorks';
import SuccessCounter from '../Components/SuccessCounter';
import SuccessStory from '../Components/SuccessStory';
import Footer from '../Components/Footer';
import ReviewSection from '../Components/ReviewSection';
import PromoSection from '../Components/PromoSection';
import FaqSection from '../Components/FaqSection';

const Home = () => {
    return (
        <div>
            <Navbar />
            <BannerSlider />
            <PremiumMembers />
            <HowItWorks />
            <SuccessCounter />
            <SuccessStory />
            <ReviewSection />
            <FaqSection />
            <PromoSection />
            <Footer />
        </div>
    );
};

export default Home;