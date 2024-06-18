function Footer(){
    const currentYear = new Date().getFullYear();
    return(
        <footer className=" text-dark py-3 ">
                <div className="text-center">
                    <p>© {currentYear} Copyright TUXTU Todos os direitos reservados.</p>
                </div>
        </footer>
        
    );
}

export default Footer;