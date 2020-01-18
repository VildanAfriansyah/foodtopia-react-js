import React from 'react'

class Footer extends React.Component{
    render(){
      return(
        <footer id="mu-footer">
            <div className="mu-footer-top">
                <div className="container">
                    <div className="mu-footer-top-area">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="mu-footer-widget">
                                    <h4>Information</h4>
                                    <ul>
                                        <li><a href="#">About Us</a></li>
                                        <li><a href="">Features</a></li>
                                        <li><a href="">Course</a></li>
                                        <li><a href="">Event</a></li>
                                        <li><a href="">Sitemap</a></li>
                                        <li><a href="">Term Of Use</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="mu-footer-widget">
                                    <h4>Customer Help</h4>
                                    <ul>
                                        <li><a href="">Get Started</a></li>
                                        <li><a href="#">My Questions</a></li>
                                        <li><a href="">Download Files</a></li>
                                        <li><a href="">Latest Course</a></li>
                                        <li><a href=""> News</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="mu-footer-widget">
                                    <h4>News Letter</h4>
                                    <ul>
                                        <li><a href="">Info</a></li>
                                        <li><a href="#">National exam</a></li>
                                        <li><a href="">Download Files</a></li>
                                        <li><a href="">Latest Course</a></li>
                                        <li><a href=""> News</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3">
                                <div className="mu-footer-widget">
                                    <h4>Contact</h4>
                                    <address>
                                        <p>Kota Bekasi, Jawa Barat</p>
                                        <p>Phone: (021) 8254241 </p>
                                        <p>Website: www.FoodTopia.id</p>
                                        <p>Email: FoodTopia@gmail.com</p>
                                    </address>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
{/* CopyRight */}

            <div className="mu-footer-bottom">
                <div className="container">
                    <div className="mu-footer-bottom-area">
                        <p><b>Copyright &copy; 2020 SkyNeko</b>. All
                    rights
                    reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
      )
    }
}

export default Footer