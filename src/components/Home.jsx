import { Link } from 'react-router-dom';

const Home = () => {
  const crops = [
    { 
      name: 'Banana', 
      description: 'Tropical fruit crop rich in potassium',
      image: '/images/Banana.jpg' 
    },
    { 
      name: 'Tea', 
      description: 'Widely consumed aromatic beverage',
      image: '/images/Tea.jpg' 
    },
    { 
      name: 'Coffee', 
      description: 'Popular stimulant beverage crop',
      image: '/images/cofee.jpg' 
    },
    { 
      name: 'Onion', 
      description: 'Essential culinary bulb vegetable',
      image: '/images/Onion.jpg' 
    },
    { 
      name: 'Tomato', 
      description: 'Versatile red fruit used worldwide',
      image: '/images/Tomato.jpg' 
    },
    { 
      name: 'Potato', 
      description: 'Starchy tuber and staple food',
      image: '/images/Potato.jpg' 
    },
    { 
      name: 'Soybean', 
      description: 'Protein-rich legume crop',
      image: '/images/Soybean.jpg' 
    },
    { 
      name: 'Sugarcane', 
      description: 'Primary source of sugar production',
      image: '/images/Sugarcane.jpg' 
    },
    { 
      name: 'Cotton', 
      description: 'Soft fiber for textile industry',
      image: '/images/Cotton.jpg' 
    },
    { 
      name: 'Maize', 
      description: 'Versatile cereal grain',
      image: '/images/Maize.jpg' 
    },
    { 
      name: 'Wheat', 
      description: 'Major cereal grain for flour',
      image: '/images/wheat.jpg' 
    },
    { 
      name: 'Rice', 
      description: 'Staple food for billions',
      image: '/images/rice.webp' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Crop Yield Prediction System
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Get accurate yield predictions for your crops to optimize farming decisions and maximize productivity.
          </p>
        </div>

        {/* Prediction CTA Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-semibold text-green-700 mb-3">Ready to Predict Your Yield?</h2>
              <p className="text-gray-600 mb-4">
                Our advanced prediction model helps you estimate crop yields based on historical data, 
                weather patterns, and farming practices specific to your region.
              </p>
              <Link
                to="/predict"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md"
              >
                Get Started Now
              </Link>
            </div>
            <div className="md:w-1/3">
              <img 
                src="/images/farmer.jpg" 
                alt="Happy farmer"
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Crop Gallery Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
            Supported Crops
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {crops.map((crop, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={crop.image} 
                    alt={crop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-green-700 mb-2">{crop.name}</h3>
                  <p className="text-gray-600">{crop.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
            Why Use Our System?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Accurate Predictions</h3>
              <p className="text-gray-600">
                Our machine learning model provides reliable yield estimates based on historical data.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Results</h3>
              <p className="text-gray-600">
                Get instant predictions without complex calculations or waiting periods.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Data</h3>
              <p className="text-gray-600">
                Your farm data remains private and secure with our encrypted system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;