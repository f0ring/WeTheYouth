import React from "react";

const causesData = [
  {
    title: "Education for All",
    description:
      "We provide free education resources, sponsor underprivileged students, and organize community workshops to ensure every child has access to quality learning.",
  },
  {
    title: "Food & Clean Water",
    description:
      "Millions of people still lack access to clean drinking water. We build wells, distribute clean water filters, and run food drives to fight hunger and malnutrition.",
  },
  {
    title: "Healthcare & Medical Aid",
    description:
      "We arrange free health camps, provide medicines to remote areas, and raise funds for emergency medical treatments for those who cannot afford it.",
  },
  {
    title: "Environmental Sustainability",
    description:
      "Our team runs tree plantation programs, beach cleanups, and campaigns to reduce plastic usage and spread awareness about climate change.",
  },
];

const Causes = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold mb-4 text-center">Our Causes</h1>
      <p className="text-lg text-gray-700 text-center mb-10">
        We are dedicated to creating a better future by addressing key social
        and environmental challenges. Here are the major causes we support.
      </p>

      {/* Causes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {causesData.map((cause, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-6"
          >
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">
              {cause.title}
            </h2>
            <p className="text-gray-700 mb-4">{cause.description}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="text-center mt-12 bg-blue-50 p-6 rounded-2xl shadow-inner">
        <h2 className="text-2xl font-semibold mb-3">
          Want to be part of the change?
        </h2>
        <p className="text-gray-700 mb-4">
          Join us as a volunteer or donate to support these causes. Together we
          can make a difference.
        </p>
        <a
          href="/take-action"
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
        >
          Take Action
        </a>
      </div>
    </div>
  );
};

export default Causes;

