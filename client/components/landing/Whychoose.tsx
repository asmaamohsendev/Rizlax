"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
	{
		title: "Secure Payments",
		desc: "All Contracts And Transactions Are Protected By Our Escrow System.",
		side: "left",
		index: 0,
		position: "top-78", // Higher position
	},
	{
		title: "Smart Matching",
		desc: "Find The Right Jobs Or Freelancers Quickly With Advanced Filters.",
		side: "left",
		index: 1,
		position: "bottom-28", // Lower position
	},
	{
		title: "Free To Start",
		desc: "Join Rizlax With No Fees Or Subscriptions — Post Or Apply Instantly.",
		side: "right",
		index: 0,
		position: "top-42", // Mid-high position
	},
	{
		title: "Verified Talent",
		desc: "Hire Or Work With Trusted, Verified Professionals Only.",
		side: "right",
		index: 1,
		position: "bottom-12", // Lower position
	},
];

const WhyChoose = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section
			ref={ref}
			className="relative w-full py-20 rounded-3xl my-12 overflow-hidden"
		>
			{/* Blurry Background Dots */}
			<div className="absolute bg-[#C2EE71]/70 top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-50">
				{" "}
				{/* Background dot 1 */}
			</div>
			<div className="absolute bg-[#C2EE71]/70 bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-50">
				{" "}
				{/* Background dot 2 */}
			</div>

<div className="section-container relative z-20">

			{/* Title */}
			<div className="relative z-10 text-center mb-16">
				<h2 className="text-3xl md:text-4xl text-left font-extrabold text-[#1A3B23]">
					WHY CHOOSE RIZLAX
				</h2>
				<p className="text-gray-600 text-left mt-2 ">
					Built To Empower Freelancers And Businesses Through <br /> Simplicity, Trust,
					And Innovation
				</p>
			</div>

			{/* Container */}
			<div className=" flex justify-center items-center min-h-[700px]">
				{/* Left Cards */}
				{features
					.filter((f) => f.side === "left")
					.map((f, i) => (
						<motion.div
							key={i}
							initial={{ x: -200, opacity: 0 }}
							animate={
								isInView ? { x: 0, opacity: 1 } : { x: -200, opacity: 0 }
							}
							transition={{
								duration: 0.6,
								delay: f.index * 0.2,
								ease: "easeOut",
							}}
							className={`absolute left-0 md:-left-10 ${f.position} p-5 w-[472px] h-[138px] bg-[#F3FCEB] rounded-2xl shadow-lg border border-green-100`}
						>
							<h3 className="text-lg font-semibold text-green-900">
								{f.title}
							</h3>
							<p className="text-gray-700 text-sm mt-1">{f.desc}</p>
						</motion.div>
					))}

				{/* Center Image */}
				<motion.img
					initial={{ scale: 0.8, opacity: 0 }}
					animate={
						isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
					}
					transition={{ duration: 0.6, delay: 0.3 }}
					src="./tablet.png"
					alt="Rizlax preview"
					className="w-[600px] drop-shadow-xl z-10"
				/>

				{/* Right Cards */}
				{features
					.filter((f) => f.side === "right")
					.map((f, i) => (
						<motion.div
							key={i}
							initial={{ x: 200, opacity: 0 }}
							animate={
								isInView ? { x: 0, opacity: 1 } : { x: 200, opacity: 0 }
							}
							transition={{
								duration: 0.6,
								delay: f.index * 0.2,
								ease: "easeOut",
							}}
							className={`absolute right-0 md:right-10 ${f.position} p-5 w-[472px] h-[138px] bg-[#F3FCEB] rounded-2xl shadow-lg border border-green-100`}
						>
							<h3 className="text-lg font-semibold text-green-900">
								{f.title}
							</h3>
							<p className="text-gray-700 text-sm mt-1">{f.desc}</p>
						</motion.div>
					))}
			</div>

      </div>

		</section>
	);
};

export default WhyChoose;
