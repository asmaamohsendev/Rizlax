import Image from "next/image";
import SecondaryButton from "../SecondaryButton";


const Latestnews: React.FC = () => {

    const cards = [1, 2, 3, 4];

    return (
        <section className="section-container  py-20 text-center">
            <div className=" flex flex-col gap-16  h-32 ">
                <h1 className="font-bold text-5xl bg-gradient-to-r from-[#23343D] via-[#598671] to-[#23343D]
bg-clip-text text-transparent 
 ">LATEST NEWS</h1>

            </div>
            <div className="grid grid-cols-2  gap-8 ">
                {cards.map((item) => (
                    <div
                        key={item}
                        className="flex  gap-5  h-[291px] bg-[#0D181D] rounded-4xl p-6"
                    >
                        {/* Image */}
                        <Image
                            src={"/hero.jpg"}
                            alt={"Freelancer"}
                            width={224}
                            height={243}
                            className="   rounded-4xl"
                        />

                        {/* Content */}
                        <div className="flex flex-col  text-left justify-between w-[347px] h-[238px] gap-2">
                            <div className="flex flex-col  gap-2">
                                <p className="text-[#FFFFFF] text-[12px] font-medium">
                                    Sarah Johnson • Aug 12, 2025
                                </p>

                                <h3 className="text-[#ECFFCC] font-semibold text-[20px] ">
                                    How To Build A Standout <br />
                                    Freelancer Profile
                                </h3>

                                <p className="text-[#DADADA] text-[13px] font-Regular">
                                    Learn how to create a profile that attracts top <br /> clients
                                    — from crafting your  bio to showcasing your <br />best
                                    projects.
                                </p>
                            </div>

                            <SecondaryButton className=" h-[60px]" >
                                BROWSE JOBS
                            </SecondaryButton>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Latestnews;
