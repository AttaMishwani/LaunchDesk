import React from "react";

const About = () => {
  return (
    <div className="bg-[var(--color-bgc)] text-[var(--color-textLight)] font-sans">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center px-6 py-20 bg-[var(--color-bgc)] text-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl sm:text-6xl font-black text-[var(--color-primary)] mb-6 leading-tight animate-pulse">
            🎯 Find Jobs. <br className="sm:hidden" /> Not Stress.
          </h1>
          <p className="text-lg sm:text-xl text-[var(--color-textMuted)] max-w-xl mx-auto">
            We're not LinkedIn — we're LinkedLit. Built for real ones who want
            real jobs with ✨zero cringe✨.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
              Our Story 📖
            </h2>
            <p className="text-[var(--color-textMuted)] leading-relaxed text-[17px]">
              Once upon a deadline, a bunch of devs got tired of broken job
              portals, spammy listings, and ghosted applications. So we built
              JobConnect — a chill, smart platform that actually works. No
              fluff. No fuss. Just jobs.
            </p>
          </div>
          <div className="bg-[var(--color-cardBg)] h-64 rounded-xl shadow-md border border-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary)] text-2xl font-semibold hover:scale-[1.02] transition-all">
            🔥 Real tools. Real people. Real jobs.
          </div>
        </div>
      </section>

      {/* Mission Timeline */}
      <section className="py-20 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">
            Our Mission 👾
          </h2>
          <p className="text-[var(--color-textMuted)] mt-2 text-base">
            What gets us hyped daily.
          </p>
        </div>
        <div className="relative border-l-4 border-[var(--color-primary)] pl-6 max-w-3xl mx-auto space-y-12">
          {[
            {
              title: "📢 Boost Job Seekers",
              text: "Help you stand out with a fire resume & zero anxiety.",
            },
            {
              title: "💻 Make Hiring Less Mid",
              text: "A hiring process that doesn’t feel like solving quantum physics.",
            },
            {
              title: "🤝 Connect You With Vibes",
              text: "We link real talent with real teams. No fake vibes allowed.",
            },
          ].map(({ title, text }, i) => (
            <div key={i}>
              <h3 className="text-xl font-semibold text-[var(--color-primary)]">
                {title}
              </h3>
              <p className="text-[var(--color-textMuted)]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 px-6 bg-[var(--color-cardBg)]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">
            The Cool Nerds Behind It 😎
          </h2>
          <p className="text-[var(--color-textMuted)] mt-2">
            No CEOs. Just G.O.A.T.s.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {["👩‍💻", "🧑‍🚀", "🧙‍♂️"].map((emoji, i) => (
            <div
              key={i}
              className="bg-[var(--color-bgc)] border border-[var(--color-cardBg)] rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 text-center"
            >
              <div className="text-5xl mb-4">{emoji}</div>
              <h3 className="font-semibold text-[var(--color-primary)] text-lg">
                Dev #{i + 1}
              </h3>
              <p className="text-[var(--color-textMuted)] text-sm">
                Frontend Ninja
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Quote */}
      <section className="py-20 px-6 bg-[var(--color-bgc)]">
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="text-2xl italic text-[var(--color-textLight)]">
            “This ain't just an app — it’s your glow up moment.”
          </blockquote>
          <p className="mt-4 text-[var(--color-primary)] font-bold">
            — Team JobConnect ⚡
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
