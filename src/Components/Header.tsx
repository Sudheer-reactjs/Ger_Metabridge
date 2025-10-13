import Logo from "../Assets/logo.png"
import ContactButton from "./ContactButton";
const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 w-full z-50">
            <div className="header-card  py-3">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-14 relative z-10">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-8">
                            <a href="/">
                                <img className="max-w-[100px]" src={Logo} alt="" />
                            </a>
                        </div>
                        <div className="flex items-center space-x-4">
                            <ContactButton />
                        </div>
                    </div>
                </div>
                <svg style={{ display: 'none' }}>
                    <filter id="displacementFilter">
                        <feTurbulence type="turbulence"
                            baseFrequency="0.01"
                            numOctaves="2"
                            result="turbulence" />
                        <feDisplacementMap in="SourceGraphic"
                            in2="turbulence"
                            scale="10" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </svg>
            </div>
        </header> 
    );
}

export default Header;
