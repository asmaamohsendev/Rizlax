export default function JobCard() {
  return (
    <div className="bg-slate-900 text-white p-5 rounded-xl">

      <div className="flex justify-between">
        <h3 className="font-semibold text-lg">
          Front-End Developer For E-Commerce Website
        </h3>
        <span className="text-emerald-400">$800 - Fixed</span>
      </div>

      <p className="text-gray-400 text-sm mt-2">
       We’re looking for a skilled front-end  developer to redesign our e-commerce platform using React and <br />Tailwind CSS.We’re looking for a skilled front-end developer to redesign our e-commerce platform <br /> using React and Tailwind CSS.
      </p>

<div className="flex items-center gap-3 text-sm text-gray-400">
  <span>Experience: <span className="text-white">Intermediate</span></span>

  <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>

  <span>Posted: <span className="text-white">3 Hours Ago</span></span>

  <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>

  <span>Location: <span className="text-white">Egypt</span></span>
</div>



      <div className="flex gap-2 mt-3">
        <Tag text="React" />
         <Tag text="java script" />
        <Tag text="Tailwind" />
        <Tag text="UI Design" />
      </div>

       <div className="flex items-center justify-between w-80">
    
    
    <div className="flex items-center gap-2 text-green-500 font-medium">
     
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4.707-4.707z" clip-rule="evenodd"/>
      </svg>
      <span>Verified</span>
    </div>


    <svg className="w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer transition"
         fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>

  </div>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="bg-slate-800 px-3 py-1 rounded-full text-xs">
      {text}
    </span>
  );
}
