export default function AboutStudio() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Chennai's Premier Architectural Studio
            </h2>
            <p className="text-gray-600 mb-6">
              Deva Architecture is a leading architectural and interior design firm based in Chennai, with projects across Tamil Nadu and South India. Founded in 2005, our team of 30+ architects and designers brings local expertise and global perspectives to create innovative solutions for our clients.
            </p>
            <p className="text-gray-600 mb-8">
              Our approach combines traditional Indian architectural wisdom with contemporary design and sustainable practices. We believe in creating spaces that honor cultural context, enhance community, and harmonize with the local environment while delivering modern functionality.
            </p>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-4xl font-display font-bold text-accent">150+</p>
                <p className="text-sm uppercase tracking-wider">Completed Projects</p>
              </div>
              <div>
                <p className="text-4xl font-display font-bold text-accent">23</p>
                <p className="text-sm uppercase tracking-wider">Design Awards</p>
              </div>
              <div>
                <p className="text-4xl font-display font-bold text-accent">18</p>
                <p className="text-sm uppercase tracking-wider">Years Experience</p>
              </div>
              <div>
                <p className="text-4xl font-display font-bold text-accent">12</p>
                <p className="text-sm uppercase tracking-wider">Countries</p>
              </div>
            </div>
          </div>
          <div className="relative h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
              alt="Our studio working environment" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
