import { useState } from "react";
import { FAQ_DATA } from "../../libs";

const Faq = () => {
    const [openId, setOpenId] = useState<number | null>(1);


    const toggle = (id: number) => {
        setOpenId(openId === id ? null : id);
    };
    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <h2 className="text-center text-3xl font-semibold mb-2 font-poppins">FAQ</h2>
            <p className="text-center text-lg mb-8 font-poppins">(Frequently Asked Questions ❓)</p>


            <div className="space-y-4">
                {FAQ_DATA.map((faq) => (
                    <div
                        key={faq.id}
                        className={`rounded-tr-xl rounded-tl-xl transition-all duration-300 overflow-hidden ${openId === faq.id ? "bg-primary-100" : "bg-white"}`}
                    >
                        <button
                            onClick={() => toggle(faq.id)}
                            className="w-full flex justify-between items-center py-4 px-5 text-left"
                        >
                            <span className={`font-semibold font-poppins ${openId === faq.id ? "text-white" : "text-black"}`}>
                                {String(faq.id).padStart(2, "0")} {faq.question}
                            </span>
                            <span className={`text-xl font-bold font-poppins ${openId === faq.id ? "text-white" : "text-black"}`}>
                                {openId === faq.id ? "—" : "+"}
                            </span>
                        </button>


                        {openId === faq.id && (
                            <div className="px-5 pb-4 text-sm text-white font-poppins animate-fadeIn">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Faq