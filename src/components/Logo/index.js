function Logo({ id, cover, url }) {
    return (
        <div className="col-md-4 mb-3">
            <a
                href={url}
                rel="noopener noreferrer"
                target="_blank"
                className="d-block"
            >
                <img src={cover} alt={id} className="img-fluid" />
            </a>
        </div>
    );
}

export default Logo;