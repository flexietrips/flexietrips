"use client";

import Counter from "@/components/Counter";
import SectionTitle from "@/components/SectionTitle";
import Testimonial from "@/components/slider/Testimonial";
import { destinations, plans, staticDestinations } from "@/constants";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";
import { User, Mail, Phone, CalendarDays, Users, MapPin } from "lucide-react";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
const page = () => {
  const [travelDate, setTravelDate] = useState(null);
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  });

  const placeholderStyle = {
    color: "#000",
  };

  // Modified form submission function in your React component
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });

    // Get form values
    const formData = new FormData(e.target);
    const formProps = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      travelDate: travelDate ? travelDate.toISOString().split("T")[0] : "",
      travelers: formData.get("travelers"),
      origin: formData.get("origin"),
    };

    // The Google Apps Script web app URL you copied when deploying
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyJ6Kw9OoiyW9b-Fx90vWcXGl1ZODAvpt_J-U5HwCwBYp1LAYrvYoOvyOvfgW9q8QB_oQ/exec";

    // Create a unique callback name
    const callbackName = "jsonpCallback" + Date.now();

    // Create promise for JSONP
    const jsonpPromise = new Promise((resolve, reject) => {
      // Define the callback function
      window[callbackName] = (response) => {
        if (response.result === "success") {
          resolve(response);
        } else {
          reject(new Error(response.error || "Form submission failed"));
        }
        // Clean up the global function when done
        delete window[callbackName];
      };

      // Set timeout to handle network errors
      setTimeout(() => {
        reject(new Error("Request timed out"));
        delete window[callbackName];
      }, 10000);
    });

    try {
      // Build query string from form data
      const queryParams = new URLSearchParams({
        ...formProps,
        callback: callbackName,
      }).toString();

      // Create script element for JSONP
      const script = document.createElement("script");
      script.src = `${scriptURL}?${queryParams}`;
      document.body.appendChild(script);

      // Wait for response
      await jsonpPromise;

      // Reset form on success
      e.target.reset();
      setTravelDate(null);
      setFormStatus({ submitting: false, submitted: true, error: null });

      // Clean up script tag
      document.body.removeChild(script);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: "Failed to submit form. Please try again later.",
      });
    }
  };
  return (
    <ReveloLayout header={1} footer={1}>
      {/* Hero Area Start */}
      <section className="hero-area bgc-black pt-200  ">
        <div className="container-fluid">
          {/* <h1
            className="hero-title"
            data-aos="flip-up"
            data-aos-delay={50}
            data-aos-duration={1500}
            data-aos-offset={50}
          >
            Your <span className="tailored-span">personalized</span> travel
            companion
          </h1> */}

          <div className="main-hero-image bgs-cover">
            <video
              src="/banner.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
                // filter: "blur(2px)",
              }}
            />
          </div>
        </div>
        {/* <SearchFilter /> */}
      </section>
      {/* Hero Area End */}
      {/* Destinations Area start */}
      <section className="destinations-area bgc-black pt-100 pb-70 rel z-1">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div
                className="section-title text-white text-center counter-text-wrap mb-70"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <SectionTitle
                  title={
                    <>
                      Discover the <span className="highlight">World's</span>{" "}
                      Treasures with flexiEtrips
                    </>
                  }
                  countValue={34500}
                  subtitle1={"One site"}
                  subtitle2={"most popular experience you’ll remember"}
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center g-4">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="col-xxl-3 col-xl-4 col-md-6"
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay={plan.delay}
                data-aos-offset="50"
              >
                <div className="destination-item h-100 d-flex flex-column">
                  <div className="image">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="img-fluid"
                      height={500}
                    />
                  </div>
                  <div className="content flex-grow-1 d-flex flex-column justify-content-between p-3">
                    <div>
                      <span className="location d-flex align-items-center gap-2 mb-2">
                        <img
                          src={plan.icons}
                          alt={`${plan.name} Icon`}
                          width="24"
                        />
                        <strong className="text-white">{plan.name}</strong>
                      </span>
                      <p className="mb-0">{plan.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Form Card */}
            <div
              className="col-xxl-3 col-xl-4 col-md-6"
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="200"
              data-aos-offset="50"
            >
              <div className="destination-item h-100 d-flex flex-column p-3">
                <h5 className="mb-3 text-white">Plan Your Trip</h5>

                {formStatus.submitted && (
                  <div className="alert alert-success" role="alert">
                    Thank you! Your trip request has been submitted. We'll
                    contact you soon.
                  </div>
                )}

                {formStatus.error && (
                  <div className="alert alert-danger" role="alert">
                    {formStatus.error}
                  </div>
                )}

                <form
                  className="d-flex flex-column gap-3"
                  onSubmit={handleSubmit}
                >
                  <div className="input-group">
                    <span className="input-group-text bg-secondary text-white border-0">
                      <User size={18} />
                    </span>
                    <input
                      type="text"
                      name="name"
                      className="form-control border-0"
                      placeholder="Name"
                      required
                      style={placeholderStyle}
                    />
                  </div>

                  <div className="input-group">
                    <span className="input-group-text bg-secondary text-white border-0">
                      <Mail size={18} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="form-control border-0"
                      placeholder="Email"
                      required
                      style={placeholderStyle}
                    />
                  </div>

                  <div className="input-group">
                    <span className="input-group-text bg-secondary text-white border-0">
                      <Phone size={18} />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control border-0"
                      placeholder="Phone Number"
                      required
                      style={placeholderStyle}
                    />
                  </div>

                  <div
                    className="input-group"
                    style={{ flexWrap: "nowrap", width: "100%" }}
                  >
                    <span className="input-group-text bg-secondary text-white border-0">
                      <CalendarDays size={18} />
                    </span>
                    <DatePicker
                      selected={travelDate}
                      onChange={(date) => setTravelDate(date)}
                      placeholderText="Select Travel Date"
                      className="form-control border-0"
                      required
                      wrapperClassName="w-100"
                      popperPlacement="bottom-start"
                    />
                  </div>

                  <div className="input-group">
                    <span className="input-group-text bg-secondary text-white border-0">
                      <Users size={18} />
                    </span>
                    <input
                      type="number"
                      name="travelers"
                      className="form-control border-0"
                      placeholder="No. of Travelers"
                      min="1"
                      required
                      style={placeholderStyle}
                    />
                  </div>

                  <div className="input-group">
                    <span className="input-group-text bg-secondary text-white border-0">
                      <MapPin size={18} />
                    </span>
                    <input
                      type="text"
                      name="origin"
                      className="form-control border-0"
                      placeholder="Traveling To"
                      required
                      style={placeholderStyle}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning mt-auto"
                    disabled={formStatus.submitting}
                  >
                    {formStatus.submitting
                      ? "Submitting..."
                      : "Request Callback"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Destinations Area end */}
      {/* About Us Area start */}
      <section className="about-us-area py-100 rpb-90 rel z-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-6">
              <div
                className="about-us-content rmb-55"
                data-aos="fade-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="section-title mb-25">
                  <h2>
                    Travel with Confidence Top Reasons to Choose Our Agency
                  </h2>
                </div>
                <p>
                  Travel with confidence when you choose our agency. We offer
                  personalized service, expert guidance, and handpicked
                  experiences to ensure every journey is seamless and
                  unforgettable. From secure bookings to 24/7 support, we
                  prioritize your comfort and satisfaction, making your
                  adventures worry-free and truly exceptional from start to
                  finish.
                </p>
                <div className="divider counter-text-wrap mt-45 mb-55">
                  <span>
                    We have{" "}
                    <span>
                      <span
                        className="count-text plus"
                        data-speed={3000}
                        data-stop={8}
                      >
                        <Counter end={8} />
                      </span>{" "}
                      Years
                    </span>{" "}
                    of experience
                  </span>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="counter-item counter-text-wrap">
                      <span
                        className="count-text k-plus"
                        data-speed={3000}
                        data-stop={100}
                      >
                        <Counter end={100} />
                      </span>
                      <span className="counter-title">Popular Destination</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="counter-item counter-text-wrap">
                      <span
                        className="count-text m-plus"
                        data-speed={3000}
                        data-stop={1}
                      >
                        <Counter end={1} />
                      </span>
                      <span className="counter-title">Satisfied Clients</span>
                    </div>
                  </div>
                </div>
                <Link href="destination1" className="theme-btn mt-10 style-two">
                  <span data-hover="Explore Destinations">
                    Explore Destinations
                  </span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
            <div
              className="col-xl-7 col-lg-6"
              data-aos="fade-right"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="about-us-image">
                <div className="shape">
                  <img src="assets/images/about/shape1.png" alt="Shape" />
                </div>
                <div className="shape">
                  <img src="assets/images/about/shape2.png" alt="Shape" />
                </div>
                <div className="shape">
                  <img src="assets/images/about/shape3.png" alt="Shape" />
                </div>
                <div className="shape">
                  <img src="assets/images/about/shape4.png" alt="Shape" />
                </div>
                <div className="shape">
                  <img src="assets/images/about/shape5.png" alt="Shape" />
                </div>
                <div className="shape">
                  <img src="assets/images/about/shape6.png" alt="Shape" />
                </div>
                <div className="shape">
                  <img src="assets/images/about/shape7.png" alt="Shape" />
                </div>
                <img src="assets/images/about/about.png" alt="About" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Us Area end */}
      {/* Popular Destinations Area start */}
      <section className="popular-destinations-area rel z-1">
        <div className="container-fluid">
          <div className="popular-destinations-wrap br-20 bgc-lighter pt-100 pb-70">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div
                  className="section-title text-center counter-text-wrap mb-70"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <SectionTitle
                    title={
                      <>
                        <span className="highlight">Popular</span> flexiEtrips
                      </>
                    }
                    subtitle2="Explore the three of the most captivating Himalayan destinations."
                  />
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row justify-content-center">
                {staticDestinations.map((destination, index) => (
                  <div className="col-xl-3 col-md-6" key={index}>
                    <div className="destination-item style-two">
                      <div className="image">
                        <a href="#" className="heart">
                          <i className="fas fa-heart" />
                        </a>
                        <img src={destination.image} alt="Destination" />
                      </div>
                      <div className="content">
                        <h6>
                          <Link href={destination.link}>
                            {destination.title}
                          </Link>
                        </h6>
                        <span className="time">{destination.description}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* <div className="col-md-6">
                  <div
                    className="destination-item style-two"
                    data-aos="flip-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="image">
                      <a href="#" className="heart">
                        <i className="fas fa-heart" />
                      </a>
                      <img
                        src="assets/images/destinations/destination4.jpg"
                        alt="Destination"
                      />
                    </div>
                    <div className="content">
                      <h6>
                        <Link href="destination-details">
                          Reserve of Canada, Canada
                        </Link>
                      </h6>
                      <span className="time">
                        5352+ tours &amp; 856+ Activity
                      </span>
                      <a href="#" className="more">
                        <i className="fas fa-chevron-right" />
                      </a>
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-xl-3 col-md-6">
                  <div
                    className="destination-item style-two"
                    data-aos="flip-up"
                    data-aos-delay={100}
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="image">
                      <a href="#" className="heart">
                        <i className="fas fa-heart" />
                      </a>
                      <img
                        src="assets/images/destinations/destination5.jpg"
                        alt="Destination"
                      />
                    </div>
                    <div className="content">
                      <h6>
                        <Link href="destination-details">
                          Dubai united states
                        </Link>
                      </h6>
                      <span className="time">
                        5352+ tours &amp; 856+ Activity
                      </span>
                      <a href="#" className="more">
                        <i className="fas fa-chevron-right" />
                      </a>
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-xl-3 col-md-6">
                  <div
                    className="destination-item style-two"
                    data-aos="flip-up"
                    data-aos-delay={200}
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="image">
                      <a href="#" className="heart">
                        <i className="fas fa-heart" />
                      </a>
                      <img
                        src="assets/images/destinations/destination6.jpg"
                        alt="Destination"
                      />
                    </div>
                    <div className="content">
                      <h6>
                        <Link href="destination-details">Milos, Greece</Link>
                      </h6>
                      <span className="time">
                        5352+ tours &amp; 856+ Activity
                      </span>
                      <a href="#" className="more">
                        <i className="fas fa-chevron-right" />
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Popular Destinations Area end */}
      {/* Features Area start */}
      <section className="features-area pt-100 pb-45 rel z-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6">
              <div
                className="features-content-part mb-55"
                data-aos="fade-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="section-title mb-60">
                  <h2>
                    <span className="highlight">Group Tours:</span>Explore the
                    Himalayas Together
                  </h2>
                </div>
                <div className="features-customer-box">
                  <div className="image">
                    <img
                      src="assets/images/features/features-box.jpg"
                      alt="Features"
                    />
                  </div>
                  <div className="content">
                    <div className="feature-authors mb-15">
                      <img
                        src="assets/images/features/feature-author1.jpg"
                        alt="Author"
                      />
                      <img
                        src="assets/images/features/feature-author2.jpg"
                        alt="Author"
                      />
                      <img
                        src="assets/images/features/feature-author3.jpg"
                        alt="Author"
                      />
                      <span>4k+</span>
                    </div>
                    <h6>850K+ Happy Customer</h6>
                    <div className="divider style-two counter-text-wrap my-25">
                      <span>
                        <span
                          className="count-text plus"
                          data-speed={3000}
                          data-stop={25}
                        >
                          0
                        </span>{" "}
                        Years
                      </span>
                    </div>
                    <p>We pride ourselves offering personalized itineraries</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-xl-6"
              data-aos="fade-right"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="row pb-25">
                <div className="col-md-6">
                  <div className="feature-item">
                    <div className="icon">
                      <i className="flaticon-tent" />
                    </div>
                    <div className="content">
                      <h5>
                        <Link href="tour-details">Shared Adventures</Link>
                      </h5>
                      <p>
                        Join a group of adventurous travelers for an
                        unforgettable Himalayan journey, led by our expert
                        guides for a safe and enriching experience.
                      </p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="icon">
                      <i className="flaticon-tent" />
                    </div>
                    <div className="content">
                      <h5>
                        <Link href="tour-details">Cultural Immersion</Link>
                      </h5>
                      <p>
                        Immerse yourself in the local culture, traditions, and
                        history through engaging group interactions and
                        expert-led guided experiences.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="feature-item mt-20">
                    <div className="icon">
                      <i className="flaticon-tent" />
                    </div>
                    <div className="content">
                      <h5>
                        <Link href="tour-details">New Friendships</Link>
                      </h5>
                      <p>
                        Build lasting friendships with fellow travelers as you
                        explore the breathtaking beauty of the Himalayas
                        together.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Area end */}
      {/* Hotel Area start */}
      <section className="hotel-area bgc-black py-100 rel z-1">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div
                className="section-title text-white text-center counter-text-wrap mb-70"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <SectionTitle
                  title={
                    <>
                      Discover the <span className="highlight">World's</span>{" "}
                      Class Top travel plans
                    </>
                  }
                  countValue={34500}
                  subtitle1={"One site"}
                  subtitle2={"most popular experience you’ll remember"}
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xxl-6 col-xl-8 col-lg-10">
              <div
                className="destination-item style-three"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="image">
                  <div className="ratting">
                    <i className="fas fa-star" /> 4.8
                  </div>
                  <a href="#" className="heart">
                    <i className="fas fa-heart" />
                  </a>
                  <img
                    src="assets/images/destinations/hotel1.jpg"
                    alt="Hotel"
                  />
                </div>
                <div className="content">
                  <span className="location">
                    <i className="fal fa-map-marker-alt" /> Ao Nang, Thailand
                  </span>
                  <h5>
                    <Link href="destination-details">
                      The brown bench near swimming pool Hotel
                    </Link>
                  </h5>
                  <ul className="list-style-one">
                    <li>
                      <i className="fal fa-bed-alt" /> 2 Bed room
                    </li>
                    <li>
                      <i className="fal fa-hat-chef" /> 1 kitchen
                    </li>
                    <li>
                      <i className="fal fa-bath" /> 2 Wash room
                    </li>
                    <li>
                      <i className="fal fa-router" /> Internet
                    </li>
                  </ul>
                  <div className="destination-footer">
                    <span className="price">
                      <span>$85.00</span>/per night
                    </span>
                    <a href="#" className="read-more">
                      Book Now <i className="fal fa-angle-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-8 col-lg-10">
              <div
                className="destination-item style-three"
                data-aos="fade-up"
                data-aos-delay={50}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="image">
                  <div className="ratting">
                    <i className="fas fa-star" /> 4.8
                  </div>
                  <a href="#" className="heart">
                    <i className="fas fa-heart" />
                  </a>
                  <img
                    src="assets/images/destinations/hotel2.jpg"
                    alt="Hotel"
                  />
                </div>
                <div className="content">
                  <span className="location">
                    <i className="fal fa-map-marker-alt" /> Kigali, Rwanda
                  </span>
                  <h5>
                    <Link href="destination-details">
                      Green trees and body of water Marriott Hotel
                    </Link>
                  </h5>
                  <ul className="list-style-one">
                    <li>
                      <i className="fal fa-bed-alt" /> 2 Bed room
                    </li>
                    <li>
                      <i className="fal fa-hat-chef" /> 1 kitchen
                    </li>
                    <li>
                      <i className="fal fa-bath" /> 2 Wash room
                    </li>
                    <li>
                      <i className="fal fa-router" /> Internet
                    </li>
                  </ul>
                  <div className="destination-footer">
                    <span className="price">
                      <span>$85.00</span>/per night
                    </span>
                    <a href="#" className="read-more">
                      Book Now <i className="fal fa-angle-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-8 col-lg-10">
              <div
                className="destination-item style-three"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="content">
                  <span className="location">
                    <i className="fal fa-map-marker-alt" /> Ao Nang, Thailand
                  </span>
                  <h5>
                    <a href="#">Painted house surrounded with trees Hotel</a>
                  </h5>
                  <ul className="list-style-one">
                    <li>
                      <i className="fal fa-bed-alt" /> 2 Bed room
                    </li>
                    <li>
                      <i className="fal fa-hat-chef" /> 1 kitchen
                    </li>
                    <li>
                      <i className="fal fa-bath" /> 2 Wash room
                    </li>
                    <li>
                      <i className="fal fa-router" /> Internet
                    </li>
                  </ul>
                  <div className="destination-footer">
                    <span className="price">
                      <span>$85.00</span>/per night
                    </span>
                    <a href="#" className="read-more">
                      Book Now <i className="fal fa-angle-right" />
                    </a>
                  </div>
                </div>
                <div className="image">
                  <div className="ratting">
                    <i className="fas fa-star" /> 4.8
                  </div>
                  <a href="#" className="heart">
                    <i className="fas fa-heart" />
                  </a>
                  <img
                    src="assets/images/destinations/hotel3.jpg"
                    alt="Hotel"
                  />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-8 col-lg-10">
              <div
                className="destination-item style-three"
                data-aos="fade-up"
                data-aos-delay={50}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="content">
                  <span className="location">
                    <i className="fal fa-map-marker-alt" /> Ao Nang, Thailand
                  </span>
                  <h5>
                    <a href="#">house pool Jungle Pool Indonesia Hotel</a>
                  </h5>
                  <ul className="list-style-one">
                    <li>
                      <i className="fal fa-bed-alt" /> 2 Bed room
                    </li>
                    <li>
                      <i className="fal fa-hat-chef" /> 1 kitchen
                    </li>
                    <li>
                      <i className="fal fa-bath" /> 2 Wash room
                    </li>
                    <li>
                      <i className="fal fa-router" /> Internet
                    </li>
                  </ul>
                  <div className="destination-footer">
                    <span className="price">
                      <span>$85.00</span>/per night
                    </span>
                    <a href="#" className="read-more">
                      Book Now <i className="fal fa-angle-right" />
                    </a>
                  </div>
                </div>
                <div className="image">
                  <div className="ratting">
                    <i className="fas fa-star" /> 4.8
                  </div>
                  <a href="#" className="heart">
                    <i className="fas fa-heart" />
                  </a>
                  <img
                    src="assets/images/destinations/hotel4.jpg"
                    alt="Hotel"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hotel-more-btn text-center mt-40">
            <Link href="destination2" className="theme-btn style-four">
              <span data-hover="Explore More Hotel">Explore More Hotel</span>
              <i className="fal fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>
      {/* Hotel Area end */}
      {/* Mobile App Area start */}
      {/* <section className="mobile-app-area py-100 rel z-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div
                className="mobile-app-content rmb-55"
                data-aos="fade-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="section-title mb-30">
                  <h2>
                    We Are Available On the Store Get Our Mobile Apps Very
                    Easily
                  </h2>
                </div>
                <p>
                  We go above and beyond to make your travel dreams a reality.
                  Trust us to handle the details so you can creating
                  unforgettable memories. Explore the world with confidence
                </p>
                <ul className="list-style-two mt-35 mb-30">
                  <li>Experience Agency</li>
                  <li>Professional Team</li>
                  <li>Low Cost Travel</li>
                  <li>Online Support 24/7</li>
                </ul>
                <div className="google-play-app-store">
                  <a href="#">
                    <img
                      src="assets/images/mobile-app/g-play.jpg"
                      alt="Google Play"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="assets/images/mobile-app/a-store.jpg"
                      alt="App Store"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="mobile-app-images">
                <div className="bg">
                  <img src="assets/images/mobile-app/phone-bg.png" alt="BG" />
                </div>
                <div className="images">
                  <img
                    src="assets/images/mobile-app/phone2.png"
                    alt="Phone"
                    data-aos="fade-down-left"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  />
                  <img src="assets/images/mobile-app/phone.png" alt="Phone" />
                  <img
                    src="assets/images/mobile-app/phone3.png"
                    alt="Phone"
                    data-aos="fade-up-right"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Mobile App Area end */}
      {/* Testimonials Area start */}
      <section className="testimonials-area py-100 rel z-1">
        <div className="container">
          <div className="testimonials-wrap bgc-lighter">
            <div className="row">
              <div
                className="col-lg-5 rel"
                data-aos="fade-right"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div
                  className="testimonial-left-image rmb-55"
                  style={{
                    backgroundImage:
                      "url(assets/images/testimonials/testimonial-left.jpg)",
                  }}
                />
              </div>
              <div className="col-lg-7">
                <div
                  className="testimonial-right-content"
                  data-aos="fade-left"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <div className="section-title mb-55">
                    <h2>
                      <span>5280</span> Global Clients Say About Us Services
                    </h2>
                  </div>
                  <Testimonial />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Area end */}
      {/* CTA Area start */}
      <section className="cta-area pt-100 rel z-1">
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-xl-4 col-md-6"
              data-aos="zoom-in-down"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div
                className="cta-item"
                style={{ backgroundImage: "url(assets/images/cta/cta1.jpg)" }}
              >
                <span className="category">Tent Camping</span>
                <h2>Explore the world best tourism</h2>
                <Link
                  href="tour-details"
                  className="theme-btn style-two bgc-secondary"
                >
                  <span data-hover="Explore Tours">Explore Tours</span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
            <div
              className="col-xl-4 col-md-6"
              data-aos="zoom-in-down"
              data-aos-delay={50}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div
                className="cta-item"
                style={{ backgroundImage: "url(assets/images/cta/cta2.jpg)" }}
              >
                <span className="category">Sea Beach</span>
                <h2>World largest Sea Beach in Thailand</h2>
                <Link href="tour-details" className="theme-btn style-two">
                  <span data-hover="Explore Tours">Explore Tours</span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
            <div
              className="col-xl-4 col-md-6"
              data-aos="zoom-in-down"
              data-aos-delay={100}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div
                className="cta-item"
                style={{ backgroundImage: "url(assets/images/cta/cta3.jpg)" }}
              >
                <span className="category">Water Falls</span>
                <h2>Largest Water falls Bali, Indonesia</h2>
                <Link
                  href="tour-details"
                  className="theme-btn style-two bgc-secondary"
                >
                  <span data-hover="Explore Tours">Explore Tours</span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Area end */}
      {/* Blog Area start */}
      <section className="blog-area py-70 rel z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div
                className="section-title text-center counter-text-wrap mb-70"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <SectionTitle
                  title={
                    <>
                      Read Latest <span className="highlight">News & Blog</span>{" "}
                    </>
                  }
                  subtitle2="most popular experience you’ll remember"
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-4 col-md-6">
              <div
                className="blog-item"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="content">
                  <Link href="blog" className="category">
                    Travel
                  </Link>
                  <h5>
                    <Link href="blog-details">
                      Ultimate Guide to Planning Your Dream Vacation with
                      flexiEtrips Travel Agency
                    </Link>
                  </h5>
                  <ul className="blog-meta">
                    <li>
                      <i className="far fa-calendar-alt" />{" "}
                      <a href="#">25 February 2024</a>
                    </li>
                    <li>
                      <i className="far fa-comments" />{" "}
                      <a href="#">Comments (5)</a>
                    </li>
                  </ul>
                </div>
                <div className="image">
                  <img src="assets/images/blog/blog1.jpg" alt="Blog" />
                </div>
                <Link href="blog-details" className="theme-btn">
                  <span data-hover="Book Now">Read More</span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div
                className="blog-item"
                data-aos="fade-up"
                data-aos-delay={50}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="content">
                  <Link href="blog" className="category">
                    Travel
                  </Link>
                  <h5>
                    <Link href="blog-details">
                      Unforgettable Adventures Travel Agency Bucket List
                      Experiences
                    </Link>
                  </h5>
                  <ul className="blog-meta">
                    <li>
                      <i className="far fa-calendar-alt" />{" "}
                      <a href="#">25 February 2024</a>
                    </li>
                    <li>
                      <i className="far fa-comments" />{" "}
                      <a href="#">Comments (5)</a>
                    </li>
                  </ul>
                </div>
                <div className="image">
                  <img src="assets/images/blog/blog2.jpg" alt="Blog" />
                </div>
                <Link href="blog-details" className="theme-btn">
                  <span data-hover="Book Now">Read More</span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div
                className="blog-item"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="content">
                  <Link href="blog" className="category">
                    Travel
                  </Link>
                  <h5>
                    <Link href="blog-details">
                      Exploring Culture and way Cuisine Travel Agency's they
                      Best Foodie Destinations
                    </Link>
                  </h5>
                  <ul className="blog-meta">
                    <li>
                      <i className="far fa-calendar-alt" />{" "}
                      <a href="#">25 February 2024</a>
                    </li>
                    <li>
                      <i className="far fa-comments" />{" "}
                      <a href="#">Comments (5)</a>
                    </li>
                  </ul>
                </div>
                <div className="image">
                  <img src="assets/images/blog/blog3.jpg" alt="Blog" />
                </div>
                <Link href="blog-details" className="theme-btn">
                  <span data-hover="Book Now">Read More</span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ReveloLayout>
  );
};
export default page;
