const NewsLetter = () => {
  return (
    <section className="max_padd_container py-12 xl:py-28 bg-white">
      <div className="mx-auto xl:w-[80%] flex flex-col items-center gap-y-4 w-full max-w-[666px] text-center">
        {/* Headline */}
        <h3 className="text-2xl xl:text-3xl font-semibold text-slate-900">
          Get Exclusive Offers On Your Email
        </h3>
        {/* Subheading */}
        <h4 className="text-lg xl:text-xl text-slate-600">
          Subscribe to our newsletter and stay updated
        </h4>
      </div>
      {/* Input and Button */}
      <div className="mt-8 flex items-center justify-between rounded-full border border-slate-300 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white w-full max-w-[588px] mx-auto p-1.5">
        <input
          type="email"
          placeholder="Your Email here"
          className="flex-grow px-4 py-2 rounded-full text-slate-700 placeholder-slate-400 focus:outline-none"
        />
        <button className="bg-blue-600 text-white font-semibold rounded-full px-6 py-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default NewsLetter;
