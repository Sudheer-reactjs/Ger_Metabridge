import Logo from "../Assets/logo.png"
const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 w-full z-50 py-3">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-14">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-8">
                          <a href="/">
                          <img className="max-w-[100px]" src={Logo} alt="" />
                          </a>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                                Get Started
                            </button>
                        </div>

                    </div>
                </div>
        </header>
    );
}

export default Header;
