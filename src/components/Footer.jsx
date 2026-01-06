import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="points">
                    COMPANY
                    <ul className="footer-ul">
                        <li className="footer-li"><a href="/">About us</a></li>
                        <li className="footer-li"><a href="/">Team</a></li>
                        <li className="footer-li"><a href="/">Careers</a></li>
                        <li className="footer-li"><a href="/">Swiggy Blog</a></li>
                        <li className="footer-li"><a href="/">Bug Bounty</a></li>
                        <li className="footer-li"><a href="/">Swiggy Super</a></li>
                        <li className="footer-li"><a href="/">Swiggy Corporate</a></li>
                        <li className="footer-li"><a href="/">Swiggy Instamart</a></li>
                    </ul>
                </div>
                <div className="points">
                    CONTACT
                    <ul className="footer-ul">
                        <li className="footer-li"><a href="/">Help & Support</a></li>
                        <li className="footer-li"><a href="/">Partner with us</a></li>
                        <li className="footer-li"><a href="/">Ride with us</a></li>
                    </ul>
                </div>
                <div className="points">
                    LEGAL
                    <ul className="footer-ul">
                        <li className="footer-li"><a href="/">Terms & Conditions</a></li>
                        <li className="footer-li"><a href="/">Refund & Cancellation</a></li>
                        <li className="footer-li"><a href="/">Privacy Policy</a></li>
                        <li className="footer-li"><a href="/">Cookie Policy</a></li>
                        <li className="footer-li"><a href="/">Offer Terms</a></li>
                        <li className="footer-li"><a href="/">Phishing & Fraud</a></li>
                    </ul>
                </div>
                <div className="points">
                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png"
                        height="54" alt="Play Store" />
                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png"
                        height="54" alt="App Store" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
