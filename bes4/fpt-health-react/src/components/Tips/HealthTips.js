// import React from 'react';
// import bannerImg from '../img/pexels-artempodrez-5726794.jpg';
// import tipImg from '../img/health-tips-placeholder.jpg';
// import newsImg from '../img/hospital-news-placeholder.jpg';
// import logo from "../img/fpt-health-high-resolution-logo-transparent-white.png";
// import './HealthTips.css';

// function HealthTips() {
//     return (
//         <main className="health-tips-container-v1">
//             <section className="health-banner-v1">
//                 <h4>Health Tips</h4>
//                 <img alt="health-banner" src={bannerImg} className="health-img-v1"/>
//                 <div className="health-overlay-v1"></div>
//             </section>
//             <section className="health-tips-section-v1">
//                 <div className="health-tips-img-v1">
//                     <img src={tipImg} alt="health-tips"/>
//                 </div>
//                 <div className="health-tips-content-v1">
//                     <div className="health-tips-item-v1">
//                         <h4>Healthy <span>Lifestyle</span></h4>
//                         <p>Maintaining a balanced lifestyle is key to long-term health. Incorporate regular exercise, such as 30 minutes of brisk walking daily, and a diet rich in fruits, vegetables, and whole grains. Prioritize sleep (7-8 hours per night) to support mental and physical well-being.</p>
//                     </div>
//                     <div className="health-tips-item-v1">
//                         <h4>Preventive <span>Care</span></h4>
//                         <p>Regular health check-ups can detect issues early. Schedule annual screenings for blood pressure, cholesterol, and diabetes. Vaccinations and routine tests, like mammograms or colonoscopies, are critical for early intervention and prevention.</p>
//                     </div>
//                     <div className="health-tips-item-v1">
//                         <h4>Mental <span>Health</span></h4>
//                         <p>Mental well-being is as important as physical health. Practice mindfulness or meditation for 10 minutes daily to reduce stress. Stay connected with loved ones and seek professional help if you experience persistent anxiety or depression.</p>
//                     </div>
//                 </div>
//             </section>
//             <section className="hospital-news-v1">
//                 <div className="hospital-news-content-v1">
//                     <h1>Hospital <span>Updates</span></h1>
//                     <div className="news-items-v1">
//                         <div className="news-item-v1">
//                             <div className="item-content-v1">
//                                 <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/medical-doctor.png" alt="medical-doctor"/>
//                                 <h4>New Cardiology Wing</h4>
//                             </div>
//                             <p>FPT Health proudly announces the opening of our state-of-the-art cardiology wing, equipped with advanced diagnostic tools and a team of expert cardiologists to provide top-tier heart care.</p>
//                         </div>
//                         <div className="news-item-v1">
//                             <div className="item-content-v1">
//                                 <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/heart-with-pulse.png" alt="heart-with-pulse"/>
//                                 <h4>Free Health Screenings</h4>
//                             </div>
//                             <p>Join us this month for free community health screenings, including blood pressure and glucose tests, to promote early detection and wellness in our community.</p>
//                         </div>
//                         <div className="news-item-v1">
//                             <div className="item-content-v1">
//                                 <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/trust.png" alt="trust"/>
//                                 <h4>Telemedicine Expansion</h4>
//                             </div>
//                             <p>Our telemedicine services have expanded, offering virtual consultations with specialists to ensure accessible care for patients across the region, anytime, anywhere.</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="hospital-news-img-v1">
//                     <img src={newsImg} alt="hospital-news"/>
//                 </div>
//             </section>
//             <section className="health-resources-v1">
//                 <h1>Health <span>Resources</span></h1>
//                 <p>Explore our curated resources for reliable health information, including guides on nutrition, exercise routines, and managing chronic conditions, available on our patient portal.</p>
//                 <a href="#/resources" className="resource-link-v1">Visit Our Resource Center</a>
//             </section>
//             <footer>
//                 <div className="footer-container-top">
//                     <div className="footer-logo">
//                         <img src={logo} alt="fpt-health" style={{width: '140px', height: '40px'}}/>
//                     </div>
//                     <div className="footer-social">
//                         <div className="fb-icon">
//                             <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/facebook--v1.png" alt="facebook"/>
//                         </div>
//                         <div className="zl-icon">
//                             <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/zalo.png" alt="zalo"/>
//                         </div>
//                         <div className="ms-icon">
//                             <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/facebook-messenger.png" alt="messenger"/>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="footer-container-middle">
//                     <div className="footer-content">
//                         <h4>FPT Health</h4>
//                         <p>FPT Health Hospital is committed to providing you and your family with the highest quality medical services, featuring a team of professional doctors and state-of-the-art facilities. Your health is our responsibility.</p>
//                     </div>
//                     <div className="footer-hours-content">
//                         <h4>Opening Hours</h4>
//                         <div className="footer-hours">
//                             <div className="footer-content-item"><span>Monday - Friday:</span> <span>7:00 AM - 8:00 PM</span></div>
//                             <div className="footer-content-item"><span>Saturday:</span> <span>7:00 AM - 6:00 PM</span></div>
//                             <div className="footer-content-item"><span>Sunday:</span> <span>7:30 AM - 6:00 PM</span></div>
//                         </div>
//                     </div>
//                     <div className="footer-content">
//                         <h4>Contact</h4>
//                         <div className="footer-contact">
//                             <div className="footer-contact-item">
//                                 <div>
//                                     <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/FFFFFF/marker.png" alt="marker"/>
//                                 </div>
//                                 <p>8 Ton That Thuyet, My Dinh Ward, Nam Tu Liem District, Ha Noi</p>
//                             </div>
//                             <div className="footer-contact-item">
//                                 <div>
//                                     <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/FFFFFF/phone.png" alt="phone"/>
//                                 </div>
//                                 <p>+84 987 654 321</p>
//                             </div>
//                             <div className="footer-contact-item">
//                                 <div>
//                                     <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/FFFFFF/new-post.png" alt="email"/>
//                                 </div>
//                                 <p>fpthealth@gmail.com</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="footer-container-bottom">
//                     <div>© 2024 FPT Health. All rights reserved.</div>
//                     <div><a>Terms of use</a> | <a>Privacy Policy</a></div>
//                 </div>
//             </footer>
//         </main>
//     );
// }

// export default HealthTips;