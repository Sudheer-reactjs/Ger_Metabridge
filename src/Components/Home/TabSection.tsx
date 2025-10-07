import React, { useState, useEffect, useRef } from "react";
import RequestAccess from "../../Assets/request-access.png";
import QuickSetup from "../../Assets/quick-setup.png";
import CreditLine from "../../Assets/credit-line.png";
import Support from "../../Assets/support.png";
import DotBg from "../../Assets/dot-bg.png";
import RequestAccessTab from "../../Assets/request-access-tab.png";

const tabs = [
    { title: "Request Access", icon: <img src={RequestAccess} alt="Tab 1" className="w-[30px] md:w-[60px]" /> },
    { title: "Quick Setup", icon: <img src={QuickSetup} alt="Tab 2" className="w-[30px] md:w-[60px]" /> },
    { title: "Credit Line", icon: <img src={CreditLine} alt="Tab 3" className="w-[30px] md:w-[60px]" /> },
    { title: "24/7 Support", icon: <img src={Support} alt="Tab 4" className="w-[30px] md:w-[60px]" /> }
];

const TabSection = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [progress, setProgress] = useState(0);

    const autoSwitchInterval = 1000000;
    const intervalRef = useRef<number | null>(null);

    const resetProgress = (tabIndex: number) => {
        setActiveTab(tabIndex);
        setProgress(0);
    };

    useEffect(() => {
        const stepTime = autoSwitchInterval / 100; // 1% per step

        intervalRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    setActiveTab(prevTab => (prevTab + 1) % tabs.length);
                    return 0;
                }
                return prev + 1;
            });
        }, stepTime);

        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <div className="w-full py-10 md:py-16 overflow-hidden">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-14">
                <div className="flex mb-4 gap-2">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className="relative flex-1 cursor-pointer rounded-md overflow-hidden bg-[rgba(255,255,255,0.1)]"
                            onClick={() => resetProgress(index)}
                        >
                            {activeTab === index && (
                                <div
                                    className="absolute top-0 left-0 h-full bg-[#173649] z-0"
                                    style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
                                />
                            )}
                            <div className="satoshi-bold relative z-10 py-3 text-[#b2cad9] text-base flex items-center gap-5 p-[10px]">
                                {tab.icon}
                                {tab.title}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="">
                    {activeTab === 0 && (
                        <div className="grid grid-cols-[1.5fr] md:grid-cols-[0.6fr_1.5fr] gap-4">

                            <div className="bg-[#b2cad9] rounded-[20px] p-5 flex flex-col justify-between gap-5">
                                <h4 className="self-stretch justify-start text-[#0b1016] text-xl  capitalize">01</h4>
                                <div className="self-stretch inline-flex flex-col justify-start items-start gap-[9px]">
                                    <h3 className="self-stretch justify-start text-[#0b1016] text-2xl capitalize">Request Access</h3>
                                    <p className="self-stretch justify-start text-[#06080a] satoshi-regular text-lg leading-[30px]">Reach out and share your goals. We’ll listen carefully, assess your needs, and recommend the most effective account solution.</p>
                                </div>
                            </div>

                            <div
                                className="relative bg-[#1e2b36] rounded-[20px] overflow-hidden pt-20 px-8 pb-0 flex flex-col justify-end gap-5"
                                style={{
                                    backgroundImage: `url(${DotBg})`,
                                    backgroundRepeat: 'repeat',
                                    backgroundPosition: 'center',
                                    backgroundSize: '80%',
                                }}
                            > 
                             <img className="max-w-[603px] m-auto" src={RequestAccessTab} alt="Request Access" />
                            </div>


                        </div>
                    )}
                    {activeTab === 1 && (
                        <div>
                            <h2 className="text-xl font-bold mb-2">Content for Tab 2</h2>
                            <p className="text-gray-600">This is the detailed content for the second tab.</p>
                        </div>
                    )}
                    {activeTab === 2 && (
                        <div>
                            <h2 className="text-xl font-bold mb-2">Content for Tab 3</h2>
                            <p className="text-gray-600">This is the detailed content for the third tab.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TabSection;
