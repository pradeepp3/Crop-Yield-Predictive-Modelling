import { useState } from "react";
import { useNavigate } from "react-router-dom"; // already added

function Predict() {
  const navigate = useNavigate(); // move this inside the component

  const [formData, setFormData] = useState({
    season: "",
    crop: "",
    state: "",
    size: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const seasons = [
    "Autumn",
    "Kharif",
    "Rabi",
    "Summer",
    "Whole Year",
    "Winter",
  ];

  const crops = [
    "Arecanut",
    "Arhar/Tur",
    "Castor seed",
    "Coconut",
    "Cotton(lint)",
    "Dry chillies",
    "Gram",
    "Jute",
    "Linseed",
    "Maize",
    "Mesta",
    "Niger seed",
    "Onion",
    "Other Rabi pulses",
    "Potato",
    "Rapeseed &Mustard",
    "Rice",
    "Sesamum",
    "Small millets",
    "Sugarcane",
    "Sweet potato",
    "Tapioca",
    "Tobacco",
    "Turmeric",
    "Wheat",
    "Bajra",
    "Black pepper",
    "Cardamom",
    "Coriander",
    "Garlic",
    "Ginger",
    "Groundnut",
    "Horse-gram",
    "Jowar",
    "Ragi",
    "Cashewnut",
    "Banana",
    "Soyabean",
    "Barley",
    "Khesari",
    "Masoor",
    "Moong(Green Gram)",
    "Other Kharif pulses",
    "Safflower",
    "Sannhamp",
    "Sunflower",
    "Urad",
    "Peas & beans (Pulses)",
    "other oilseeds",
    "Other Cereals",
    "Cowpea(Lobia)",
    "Oilseeds total",
    "Guar seed",
    "Other Summer Pulses",
    "Moth",
  ];

  const states = [
    "Assam",
    "Karnataka",
    "Kerala",
    "Meghalaya",
    "West Bengal",
    "Puducherry",
    "Goa",
    "Andhra Pradesh",
    "Tamil Nadu",
    "Odisha",
    "Bihar",
    "Gujarat",
    "Madhya Pradesh",
    "Maharashtra",
    "Mizoram",
    "Punjab",
    "Uttar Pradesh",
    "Haryana",
    "Himachal Pradesh",
    "Tripura",
    "Nagaland",
    "Chhattisgarh",
    "Uttarakhand",
    "Jharkhand",
    "Delhi",
    "Manipur",
    "Jammu and Kashmir",
    "Telangana",
    "Arunachal Pradesh",
    "Sikkim",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch("http://localhost:5001/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Prediction failed! status: ${response.status}`
        );
      }

      const data = await response.json();
      // Navigate to another page with prediction data
      navigate("/prediction-result", {
        state: {
          prediction: data,
          formData: formData,
        },
      });
    } catch (error) {
      console.error("Prediction error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-800">
          Crop Yield Prediction
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handlePredict}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Season</label>
            <select
              name="season"
              value={formData.season}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Season</option>
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Crop</label>
            <select
              name="crop"
              value={formData.crop}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Crop</option>
              {crops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Land Area (hectares)
            </label>
            <input
              type="number"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
              required
              min="0.1"
              step="0.1"
              placeholder="e.g. 2.5"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Predicting...
              </span>
            ) : (
              "Predict Yield"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Predict;
