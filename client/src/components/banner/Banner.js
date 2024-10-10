function BannerIncidator(props) {
    return (
        <button
            type="button"
            data-bs-target="#bannerIndicators"
            data-bs-slide-to={props.index}
            className={props.active ? "active" : ""}
            aria-current={props.active}
            onClick={() => {
 
            }}
        />
    );
}

function BannerImage(props) {
    return (
        <div className={"carousel-item " + (props.active ? "active" : "")} data-bs-interval="5000">
            <div className="ratio" style={{ "--bs-aspect-ratio": "50%", maxHeight: "860px" }}>
                <img className="d-block w-100 h-100 bg-dark cover" alt="" src={props.image} />
            </div>
            <div className="carousel-caption d-none d-lg-block">
                <h5>Banner Header</h5>
                <p>Some representative placeholder content for the banner.</p>
            </div>
        </div>
    );
}

function Banner() {
    return (
        <div id="bannerIndicators" className="carousel slide" data-bs-ride="carousel" style={{ marginTop: "56px" }}>
            <div className="carousel-indicators">
                <BannerIncidator index="0" active={true} />
                <BannerIncidator index="1" />
                <BannerIncidator index="2" />
            </div>
            <div className="carousel-inner">
                <BannerImage image={"../assets/images/banners/banner-1.jpg"} active={true} />
                <BannerImage image={"../assets/images/banners/banner-2.jpg"} />
                <BannerImage image={"../assets/images/banners/banner-0.jpg"} />
            </div>
        </div>
    );
}

export default Banner;
