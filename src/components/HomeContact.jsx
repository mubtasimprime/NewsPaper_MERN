import { FaPhoneAlt } from "react-icons/fa";

const HomeContact = () => {
  return (
    <section className="bg-[#fdf2f6] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8/12 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Have questions or need help? Fill out the form or reach out to us
            directly!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form className="bg-white shadow-lg rounded-lg p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B32346]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B32346]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="Write your message..."
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B32346]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#B32346] text-white px-6 py-2 rounded-md hover:bg-[#a01e3f] transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center items-start space-y-6">
            <div className="flex items-center text-gray-800 text-lg">
              <FaPhoneAlt className="text-[#B32346] text-2xl mr-4" />
              <span>+880 1989 133 132</span>
            </div>
            <p className="text-gray-600">
              We’re available 24/7 to support your urgent blood donation needs.
              Don’t hesitate to reach out.
            </p>
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://i.ibb.co/pjsJxWVS/Home-Contact.jpg"
                alt="Contact support"
                className="w-full rounded-lg shadow-md opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
