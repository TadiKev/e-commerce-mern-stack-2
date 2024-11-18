import { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Login function
  const login = async () => {
    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in both email and password.");
      return;
    }

    console.log("Login function executed", formData);

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData?.success) {
        setSuccessMessage("Login successful! Redirecting...");
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        setErrorMessage(responseData.errors || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  // Signup function
  const signup = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    console.log("Sign up function executed", formData);

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData?.success) {
        setSuccessMessage("Signup successful! Redirecting...");
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        setErrorMessage(responseData.errors || "Something went wrong during signup.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === "Login") {
      login();
    } else {
      signup();
    }
  };

  return (
    <section className="max_padd_container flex items-center justify-center flex-col pt-32">
      <div className="max-w-[555px] h-auto bg-white shadow-lg rounded-lg px-10 py-12">
        <h3 className="text-2xl font-semibold text-center text-slate-900">{state}</h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
          {state === "Sign up" && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              placeholder="Your Name"
              className="h-12 w-full px-4 bg-slate-100 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="username"
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Your Email"
            className="h-12 w-full px-4 bg-slate-100 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Your Password"
            className="h-12 w-full px-4 bg-slate-100 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="current-password"
          />

          {/* Error message display */}
          {errorMessage && (
            <div className="mt-4 text-center text-red-600">
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Success message display */}
          {successMessage && (
            <div className="mt-4 text-center text-green-600">
              <p>{successMessage}</p>
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold w-full mt-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continue
          </button>
        </form>

        {/* Toggle between login and signup */}
        <p className="mt-6 text-center text-slate-600">
          {state === "Sign up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Create an account?{" "}
              <span
                onClick={() => setState("Sign up")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </>
          )}
        </p>

        {/* Terms and conditions */}
        <div className="mt-6 flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 rounded text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="terms" className="text-sm text-slate-600">
            By continuing, I agree to the{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              terms of use
            </span>{" "}
            &{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              privacy policy
            </span>
            .
          </label>
        </div>
      </div>
    </section>
  );
};

export default Login;
