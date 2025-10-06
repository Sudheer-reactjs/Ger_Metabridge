import { ArrowRight } from "lucide-react";


const ContactButton = () => {
    return (
        <a href="#" data-property-1="Default" className="contact-button button-hover pl-[30px] pr-1 py-1 relative bg-black rounded-[99px] border-[1px] border-solid border-transparent inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <div className="hover-bg w-[100px] h-[52px] left-[29px] top-[50px] absolute bg-[#009aff] rounded-full blur-[25px]" />
            <div className="justify-start text-white text-sm text text-light">Contact Us</div>
            <div className="contact-button p-[10px] bg-black/25 rounded-[99px] border-[1px] border-solid border-transparent flex justify-center items-center gap-2.5 icon ">
                <ArrowRight strokeWidth={1.5} className="w-5 h-5 text-white" />
            </div>
        </a> 
    );
}

export default ContactButton;
