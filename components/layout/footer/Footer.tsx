

const Footer = () => {
    return (
      <footer className="flex flex-col bg-neutral-100 mt-auto border-t-2 h-64">
          <div className="flex justify-between items-center pt-16 pb-8 px-36 w-full">
            <h3 className="font-bold text-gray-500 text-2xl italic tracking-wide">Let's stay in touch!</h3>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Your Email Address"
                    className="rounded-l-lg py-2 px-8 border-t mr-0 border-b border-l text-orange-800 border-gray-200 bg-white"
                    // onChange={handleInputChange}
                    // value={email}
                />
                <button
                    type="button"
                    className="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-r-lg"
                    // onClick={handleSearch}
                >
                    Subscribe
                </button>
            </div>
          </div>
          <div className="mx-auto">
            <div className="flex items-center py-8 px-80 w-full border-t  border-t-gray-200 w-100">
              <h3 className="text-gray-500 text-xs">@2023 FunCook. All rights reserved.</h3>
            </div>
          </div>
      </footer>
    )
  }
  
  export default Footer