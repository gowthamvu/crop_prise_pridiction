import { useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Cell,
} from "recharts";

function App() {
  const [form, setForm] = useState({
    Year: "",
    Location: "",
    Area: "",
    Rainfall: "",
    Temperature: "",
    "Soil type": "",
    Irrigation: "",
    yeilds: "",
    Humidity: "",
    Crops: "",
    Season: ""
  });

  const [price, setPrice] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [trendData, setTrendData] = useState([]);
  const [cropCompare, setCropCompare] = useState([]);
  const [seasonData, setSeasonData] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const predict = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        "https://crop-price-backend.onrender.com/predict",
        form
      );

      console.log(res.data);

      setPrice(res.data.predicted_price || null);
      setTrendData(res.data.trendData || []);
      setCropCompare(res.data.cropCompare || []);
      setSeasonData(res.data.seasonData || []);

      setError("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.error ||
        "Prediction failed"
      );

      setPrice(null);
    } finally {
      setLoading(false);
    }
  };

  // Official color palette
  const colors = {
    primary: "#2D6A4F",      // Deep forest green
    primaryLight: "#40916C", // Medium green
    secondary: "#D4A373",    // Wheat/gold
    secondaryDark: "#B5835A", // Darker wheat
    accent: "#F4A261",       // Warm amber
    accentLight: "#E9C46A",  // Soft yellow
    background: "#FDF8F0",   // Warm cream
    surface: "#FFFFFF",      // White for cards
    surfaceAlt: "#FAF3E8",   // Slightly off-white
    text: "#2C3E2D",        // Dark olive text
    textLight: "#5A6B4A",    // Lighter olive text
    border: "#E2D4C8",       // Soft border
    success: "#2D6A4F",
    error: "#C0392B",
    gradientStart: "#2D6A4F",
    gradientEnd: "#1B4332",
  };

  const inputStyle = {
    padding: "12px 16px",
    borderRadius: "8px",
    border: `1px solid ${colors.border}`,
    background: colors.surface,
    color: colors.text,
    fontSize: "14px",
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    transition: "all 0.2s ease",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "600",
    color: colors.primary,
    marginBottom: "6px",
    display: "block",
    letterSpacing: "0.3px",
    textTransform: "uppercase",
    fontSize: "11px",
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.background,
        padding: "40px 20px",
        fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
        color: colors.text,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <span style={{ fontSize: "36px" }}>🌾</span>
            <span style={{ fontSize: "36px" }}>📊</span>
            <span style={{ fontSize: "36px" }}>🌱</span>
          </div>
          <h1
            style={{
              fontSize: "2.5rem",
              color: colors.primary,
              marginBottom: "12px",
              fontWeight: "700",
              letterSpacing: "-0.5px",
            }}
          >
            AgriPrice<span style={{ color: colors.secondary }}>Forecast</span>
          </h1>
          <p
            style={{
              color: colors.textLight,
              fontSize: "1rem",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Official Market Intelligence Platform | Powered by AI & Agricultural Data Analytics
          </p>
          <div
            style={{
              width: "80px",
              height: "3px",
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              margin: "20px auto 0",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Main Form Card */}
        <div
          style={{
            background: colors.surface,
            borderRadius: "16px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            border: `1px solid ${colors.border}`,
            overflow: "hidden",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
              padding: "16px 24px",
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <h2
              style={{
                color: colors.surface,
                fontSize: "1.2rem",
                fontWeight: "600",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>📋</span> Crop & Environmental Parameters
            </h2>
          </div>

          <div style={{ padding: "30px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {/* Year */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>📅 Year</label>
                <input
                  style={inputStyle}
                  name="Year"
                  placeholder="e.g. 2024"
                  onChange={handleChange}
                />
              </div>

              {/* Area */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>📏 Area (hectares)</label>
                <input
                  style={inputStyle}
                  name="Area"
                  placeholder="e.g. 120"
                  onChange={handleChange}
                />
              </div>

              {/* Rainfall */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>🌧️ Rainfall (mm)</label>
                <input
                  style={inputStyle}
                  name="Rainfall"
                  placeholder="e.g. 250"
                  onChange={handleChange}
                />
              </div>

              {/* Temperature */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>🌡️ Temperature (°C)</label>
                <input
                  style={inputStyle}
                  name="Temperature"
                  placeholder="e.g. 28"
                  onChange={handleChange}
                />
              </div>

              {/* Yield */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>🌾 Yield (kg/hectare)</label>
                <input
                  style={inputStyle}
                  name="yeilds"
                  placeholder="e.g. 140"
                  onChange={handleChange}
                />
              </div>

              {/* Humidity */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>💧 Humidity (%)</label>
                <input
                  style={inputStyle}
                  name="Humidity"
                  placeholder="e.g. 75"
                  onChange={handleChange}
                />
              </div>

              {/* Location */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>📍 District</label>
                <select style={inputStyle} name="Location" onChange={handleChange}>
                  <option value="">Select District</option>
                  <option>Mysuru</option>
                  <option>Hassan</option>
                  <option>Kodagu</option>
                  <option>Madikeri</option>
                  <option>Mangalore</option>
                  <option>Raichur</option>
                </select>
              </div>

              {/* Soil Type */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>🪨 Soil Type</label>
                <select style={inputStyle} name="Soil type" onChange={handleChange}>
                  <option value="">Select Soil Type</option>
                  <option>Clay</option>
                  <option>Loamy</option>
                  <option>Sandy</option>
                </select>
              </div>

              {/* Irrigation */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>💦 Irrigation Method</label>
                <select style={inputStyle} name="Irrigation" onChange={handleChange}>
                  <option value="">Select Irrigation Method</option>
                  <option>Drip</option>
                  <option>Basin</option>
                  <option>Spray</option>
                </select>
              </div>

              {/* Crops */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>🌱 Crop Type</label>
                <select style={inputStyle} name="Crops" onChange={handleChange}>
                  <option value="">Select Crop</option>
                  <option>Coffee</option>
                  <option>Coconut</option>
                  <option>Cocoa</option>
                  <option>Cotton</option>
                  <option>Cashew</option>
                  <option>Ginger</option>
                  <option>Groundnut</option>
                </select>
              </div>

              {/* Season */}
              <div style={formGroupStyle}>
                <label style={labelStyle}>☀️ Season</label>
                <select style={inputStyle} name="Season" onChange={handleChange}>
                  <option value="">Select Season</option>
                  <option>Kharif</option>
                  <option>Rabi</option>
                  <option>Summer</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={predict}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            background: loading ? colors.textLight : colors.primary,
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            color: "white",
            transition: "all 0.2s ease",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.background = colors.gradientEnd;
          }}
          onMouseLeave={(e) => {
            if (!loading) e.currentTarget.style.background = colors.primary;
          }}
        >
          {loading ? (
            <>
              <span>🔄</span>
              Processing Market Data...
            </>
          ) : (
            <>
              <span>🔍</span>
              Generate Price Forecast
            </>
          )}
        </button>

        {/* Price Result Card */}
        {price && (
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.surfaceAlt}, ${colors.surface})`,
              borderRadius: "16px",
              padding: "32px",
              textAlign: "center",
              border: `1px solid ${colors.secondary}`,
              marginBottom: "30px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>📈</div>
            <p
              style={{
                color: colors.primary,
                fontSize: "0.8rem",
                fontWeight: "600",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Official Market Price Forecast
            </p>
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: "700",
                color: colors.gradientStart,
                marginBottom: "4px",
              }}
            >
              ₹ {typeof price === 'number' ? price.toLocaleString('en-IN') : price}
            </h1>
            <p style={{ color: colors.textLight, fontSize: "0.9rem" }}>
              per Quintal · Estimated for {form.Crops || "selected crop"} in {form.Year || "current year"}
            </p>
            <div
              style={{
                width: "100%",
                height: "2px",
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                marginTop: "20px",
                borderRadius: "1px",
              }}
            />
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#FFF5F5",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center",
              color: colors.error,
              border: `1px solid ${colors.error}`,
              fontSize: "14px",
              marginBottom: "30px",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Analytics Dashboard */}
        {(trendData.length > 0 || cropCompare.length > 0 || seasonData.length > 0) && (
          <div style={{ marginTop: "40px" }}>
            <div
              style={{
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              <h2
                style={{
                  color: colors.primary,
                  fontSize: "1.6rem",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                Market Intelligence Dashboard
              </h2>
              <p style={{ color: colors.textLight }}>
                Official data analytics & forecasting insights
              </p>
              <div
                style={{
                  width: "60px",
                  height: "2px",
                  background: colors.secondary,
                  margin: "12px auto 0",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
                gap: "30px",
              }}
            >
              {/* Monthly Trend Chart */}
              {trendData.length > 0 && (
                <div
                  style={{
                    background: colors.surface,
                    borderRadius: "16px",
                    border: `1px solid ${colors.border}`,
                    padding: "20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <h3
                    style={{
                      color: colors.primary,
                      fontSize: "1rem",
                      fontWeight: "600",
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>📊</span> Monthly Price Trend Analysis
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <CartesianGrid stroke="#E2D4C8" strokeDasharray="3 3" />
                      <XAxis dataKey="month" stroke={colors.textLight} />
                      <YAxis stroke={colors.textLight} />
                      <Tooltip
                        contentStyle={{
                          background: colors.surface,
                          border: `1px solid ${colors.border}`,
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke={colors.primary}
                        strokeWidth={2}
                        dot={{ fill: colors.secondary, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Crop Comparison Chart */}
              {cropCompare.length > 0 && (
                <div
                  style={{
                    background: colors.surface,
                    borderRadius: "16px",
                    border: `1px solid ${colors.border}`,
                    padding: "20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <h3
                    style={{
                      color: colors.primary,
                      fontSize: "1rem",
                      fontWeight: "600",
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>📊</span> Crop Price Comparison
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={cropCompare}>
                      <CartesianGrid stroke="#E2D4C8" strokeDasharray="3 3" />
                      <XAxis dataKey="crop" stroke={colors.textLight} />
                      <YAxis stroke={colors.textLight} />
                      <Tooltip
                        contentStyle={{
                          background: colors.surface,
                          border: `1px solid ${colors.border}`,
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="value" fill={colors.primary} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Seasonal Analysis Chart */}
              {seasonData.length > 0 && (
                <div
                  style={{
                    background: colors.surface,
                    borderRadius: "16px",
                    border: `1px solid ${colors.border}`,
                    padding: "20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <h3
                    style={{
                      color: colors.primary,
                      fontSize: "1rem",
                      fontWeight: "600",
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>🥧</span> Seasonal Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={seasonData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {seasonData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index === 0 ? colors.primary : index === 1 ? colors.secondary : colors.accent}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: colors.surface,
                          border: `1px solid ${colors.border}`,
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Growth Forecast Chart */}
              {trendData.length > 0 && (
                <div
                  style={{
                    background: colors.surface,
                    borderRadius: "16px",
                    border: `1px solid ${colors.border}`,
                    padding: "20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <h3
                    style={{
                      color: colors.primary,
                      fontSize: "1rem",
                      fontWeight: "600",
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>📈</span> Forecast Growth Analysis
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={trendData}>
                      <CartesianGrid stroke="#E2D4C8" strokeDasharray="3 3" />
                      <XAxis dataKey="month" stroke={colors.textLight} />
                      <YAxis stroke={colors.textLight} />
                      <Tooltip
                        contentStyle={{
                          background: colors.surface,
                          border: `1px solid ${colors.border}`,
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={colors.secondary}
                        fill={`${colors.primary}20`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: "50px",
            paddingTop: "30px",
            borderTop: `1px solid ${colors.border}`,
            textAlign: "center",
          }}
        >
          <p style={{ color: colors.textLight, fontSize: "12px" }}>
            © {new Date().getFullYear()} AgriPriceForecast — Official Agricultural Market Intelligence Platform
          </p>
          <p style={{ color: colors.textLight, fontSize: "11px", marginTop: "8px" }}>
            Data sources: Agricultural Market Committees & Weather Analytics
          </p>
        </div>
      </div>

      {/* Global styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        input:focus, select:focus {
          border-color: ${colors.primary} !important;
          box-shadow: 0 0 0 3px rgba(45,106,79,0.1) !important;
        }
        
        input:hover, select:hover {
          border-color: ${colors.secondary} !important;
        }
        
        option {
          background: ${colors.surface};
          color: ${colors.text};
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export default App;
