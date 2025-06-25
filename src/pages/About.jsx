import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="min-h-[90vh] bg-gradient-to-r from-blue-100 via-white to-blue-100 flex items-center justify-center px-6 py-16">
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-blue-700 mb-6">
            We're Building The Future of Job Applications
          </h1>
          <p className="text-lg text-gray-700">
            Simplifying the hiring journey for both companies and job seekers
            through smart and intuitive tools.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              We started as a group of passionate developers who noticed how
              hard it was to apply for jobs efficiently. We decided to build a
              platform that puts job seekers first — simple, fast, and
              effective. From submitting resumes to getting hired — we're with
              you every step of the way.
            </p>
          </div>
          <div className="bg-white h-64 rounded-xl shadow-lg border border-blue-100 flex items-center justify-center text-blue-600 text-2xl font-semibold">
            💼 Your Dream Job Awaits
          </div>
        </div>
      </section>

      {/* Mission Timeline */}
      <section className="bg-white py-20 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-600">Our Mission</h2>
          <p className="text-gray-600 mt-2">What drives us every day</p>
        </div>
        <div className="relative border-l-4 border-blue-500 pl-6 max-w-3xl mx-auto space-y-10">
          <div>
            <h3 className="text-xl font-semibold text-blue-700">
              Empower Job Seekers
            </h3>
            <p className="text-gray-600">
              Give applicants the tools they need to stand out and succeed.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-700">
              Simplify Hiring
            </h3>
            <p className="text-gray-600">
              Make the hiring process smoother for employers with effective
              tools.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-700">
              Build Connections
            </h3>
            <p className="text-gray-600">
              Bridge the gap between top talent and meaningful work
              opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 px-6 bg-blue-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-700">Meet The Team</h2>
          <p className="text-gray-600 mt-2">
            We're builders, dreamers, and doers.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 text-center"
            >
              <div className="h-24 w-24 mx-auto bg-blue-200 rounded-full mb-4" />
              <h3 className="font-semibold text-blue-700 text-lg">
                Team Member {i}
              </h3>
              <p className="text-gray-600 text-sm">Frontend Developer</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Quote */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="text-2xl italic text-gray-700">
            “We’re not just building software — we’re building hope for every
            job seeker out there.”
          </blockquote>
          <p className="mt-4 text-blue-600 font-bold">— The JobConnect Team</p>
        </div>
      </section>
    </div>
  );
};

export default About;
