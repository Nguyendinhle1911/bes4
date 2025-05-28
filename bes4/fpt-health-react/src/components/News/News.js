import React, { useEffect, useState } from 'react';
import './News.css';
import $ from 'jquery';
import logo from "../img/fpt-health-high-resolution-logo-transparent-white.png";
import bannerImg from '../img/pexels-artempodrez-5726794.jpg';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cập nhật class active cho liên kết News
        $(".links li a").removeClass("active");
        $(".links li a[href='/news']").addClass("active");
    }, []);

    useEffect(() => {
        const fetchArticles = async () => {
            const storedArticles = localStorage.getItem('newsArticles');
            if (storedArticles) {
                setArticles(JSON.parse(storedArticles));
                setLoading(false);
            }
            try {
                const response = await fetch('http://localhost:5000/news');
                const data = await response.json();
                setArticles(data);
                localStorage.setItem('newsArticles', JSON.stringify(data));
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div>
            <section className="news-banner-v1">
                <h4>Tin tức</h4>
                <img alt="news-banner" src={bannerImg} className="news-img-v1" />
                <div className="news-overlay-v1"></div>
            </section>
            {loading ? (
                <div className="loading-div-v1">
                    <div className="spinner-v1"></div>
                </div>
            ) : (
                <div>
                    <div className="news-container-v1">
                        <div className="div-title-v1">
                            <h1>Latest news</h1>
                        </div>
                        <div className="news-grid-v1">
                            {articles.map((article, i) => (
                                <div key={i} className="news-item-v1">
                                    {article.image && (
                                        <div className="news-image-v1">
                                            <img src={article.image} alt={article.title} />
                                        </div>
                                    )}
                                    <div className="news-content-v1">
                                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                                            <h3 className="news-title-v1">{article.title}</h3>
                                        </a>
                                        <p className="news-description-v1">{article.description}</p>
                                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="read-more-v1">
                                            Đọc thêm
                                            <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/004b91/right.png" alt="right" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
              <footer>
                <div className="footer-container-top">
                    <div className="footer-logo">
                        <img src={logo} alt="fpt-health" style={{width: 140 + 'px', height: 40 + 'px'}}/>
                    </div>
                    <div className="footer-social">
                        <div className="fb-icon">
                            <img width="30" height="30"
                                 src="https://img.icons8.com/ios-filled/50/FFFFFF/facebook--v1.png"
                                 alt="facebook--v1"/>
                        </div>
                        <div className="zl-icon">
                            <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/zalo.png"
                                 alt="zalo"/>
                        </div>
                        <div className="ms-icon">
                            <img width="30" height="30"
                                 src="https://img.icons8.com/ios-filled/50/FFFFFF/facebook-messenger.png"
                                 alt="facebook-messenger"/>
                        </div>
                    </div>
                </div>
                <div className="footer-container-middle">
                    <div className="footer-content">
                        <h4>FPT Health</h4>
                        <p>FPT Health Hospital is committed to providing you and your family with the highest quality
                            medical services, featuring a team of professional doctors and state-of-the-art facilities.
                            Your health is our responsibility.</p>
                    </div>
                    <div className="footer-hours-content">
                        <h4>Opening Hours</h4>
                        <div className="footer-hours">
                            <div className="footer-content-item"><span>Monday - Friday:</span>
                                <span>7:00 AM - 8:00 PM</span></div>
                            <div className="footer-content-item"><span>Saturday:</span> <span>7:00 AM - 6:00 PM</span>
                            </div>
                            <div className="footer-content-item"><span>Sunday:</span> <span>7:30 AM - 6:00 PM</span>
                            </div>
                        </div>
                    </div>
                    <div className="footer-content">
                        <h4>Contact</h4>
                        <div className="footer-contact">
                            <div className="footer-contact-item">
                                <div>
                                    <img width="20" height="20"
                                         src="https://img.icons8.com/ios-filled/50/FFFFFF/marker.png" alt="marker"/>
                                </div>
                                <p>8 Ton That Thuyet, My Dinh Ward, Nam Tu Liem District, Ha Noi</p>
                            </div>
                            <div className="footer-contact-item">
                                <div>
                                    <img width="20" height="20"
                                         src="https://img.icons8.com/ios-filled/50/FFFFFF/phone.png" alt="phone"/>
                                </div>
                                <p>+84 987 654 321</p>
                            </div>
                            <div className="footer-contact-item">
                                <div>
                                    <img width="20" height="20"
                                         src="https://img.icons8.com/ios-filled/50/FFFFFF/new-post.png" alt="new-post"/>
                                </div>
                                <p>fpthealth@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-container-bottom">
                    <div>© 2024 FPT Health. All rights reserved.</div>
                    <div><a>Terms of use</a> | <a>Privacy Policy</a></div>
                </div>
            </footer>
                </div>
            )}
        </div>
    );
}

export default News;