import { Link } from "react-router";

const HomeBanner = () => {
  return (
    <>
      <section className="bg-[url('https://i.ibb.co/x8DcFVyn/hero-Banner.jpg')] bg-cover bg-center min-h-[calc(100vh-64px)] text-white">
        {/* Content */}
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-100 pt-10">
            Be a Lifesaver, Donate Blood Today
          </h1>
          {/* Content Grid */}
          <div className="max-w-9/12 md:max-w-6/12 mx-auto w-full px-6 lg:px-0 py-12 grid md:grid-cols-1 gap-10 items-center">
            {/* Donor Section */}
            <div className="text-center space-y-4 bg-white/10 p-6 rounded-lg">
              <img
                src="https://i.ibb.co/zhH9kgp9/finddonor-1.jpg"
                alt="Become a Donor"
                className="mx-auto w-50 object-contain rounded-xl"
              />
              <h2 className="text-3xl font-bold text-white">Become a Donor</h2>
              <p className="text-gray-200">
                Your one donation can save up to three lives. Join our donor
                community and make a difference today.
              </p>
              <Link to="/auth/register">
                <button className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-lg font-semibold mt-2">
                  Join as a Donor
                </button>
              </Link>
            </div>

            {/* Search Section */}
            <div className="text-center space-y-4 bg-white/10 p-6 rounded-lg">
              <img
                src="https://i.ibb.co/nq5f0c6S/donor.jpg"
                alt="Find a Donor"
                className="mx-auto w-50 h-50 object-contain rounded-xl"
              />
              <h2 className="text-3xl font-bold text-white">Find a Donor</h2>
              <p className="text-gray-200">
                Need blood urgently? Search our vast network of donors and get
                help when you need it most.
              </p>
              <Link to="/search">
                <button className="bg-white text-red-600 hover:bg-gray-100 transition px-6 py-3 rounded-lg font-semibold mt-2">
                  Search Donors
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeBanner;
