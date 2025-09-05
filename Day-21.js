//task-21 of hackathon ...

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Hi, I'm Bhojraj Mahajan 👋</h1>
        <p className="text-lg text-gray-300 mb-6">Frontend Developer | UI Enthusiast | Learner</p>
        <Button className="rounded-2xl px-6 py-3 text-lg shadow-lg">
          View My Work
        </Button>
      </section>

      {/* Projects Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "E-Commerce Store", desc: "Full online store with cart & checkout." },
            { title: "Chat App", desc: "Real-time messaging app with WebSockets." },
            { title: "Weather App", desc: "Location-based weather forecast app." }
          ].map((project, idx) => (
            <Card key={idx} className="bg-gray-800 shadow-xl rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.desc}</p>
                <Button variant="secondary">View Project</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-gray-400 mb-4">Feel free to connect with me on:</p>
        <div className="flex justify-center gap-6">
          <a href="https://github.com/" target="_blank" className="hover:text-blue-400">GitHub</a>
          <a href="https://linkedin.com/" target="_blank" className="hover:text-blue-400">LinkedIn</a>
          <a href="mailto:yourmail@example.com" className="hover:text-blue-400">Email</a>
        </div>
      </section>
    </div>
  );
}
