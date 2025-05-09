interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export default function DesignProcess() {
  const processSteps: ProcessStep[] = [
    {
      number: "01",
      title: "Discover",
      description: "We begin with deep research, site analysis, and client consultation to understand project goals and context."
    },
    {
      number: "02",
      title: "Design",
      description: "Our team develops conceptual designs, refines through feedback, and produces detailed plans and visualizations."
    },
    {
      number: "03",
      title: "Develop",
      description: "Turning designs into reality through detailed technical documentation, material specification, and coordination."
    },
    {
      number: "04",
      title: "Deliver",
      description: "We oversee construction, installation, and final details to ensure faithful execution of the design vision."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our Design Process</h2>
          <p className="text-gray-600">
            We follow a comprehensive design methodology that ensures every project receives thorough attention from concept to completion.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-white rounded-full mb-6">
                <span className="text-2xl font-bold">{step.number}</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
