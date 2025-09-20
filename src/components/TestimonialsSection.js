import React from 'react';

export default function TestimonialsSection() {
  // Storing testimonials in an array is the best practice.
  const testimonials = [
    { name: "Aicha Benali", role: "Responsable RH - Division Mining", text: "La solution a révolutionné notre approche de la gestion du personnel. La planification qui nous prenait des heures se fait maintenant en quelques clics." },
    { name: "Mohamed El Khattabi", role: "Chef de Service IT - Direction Centrale", text: "L'interface est remarquablement intuitive. Nos équipes ont adopté la solution sans formation complexe, ce qui est rare." },
    { name: "Youssef Hajji", role: "Technicien Senior - Site de Khouribga", text: "Enfin de la transparence dans les plannings ! Je peux anticiper mes astreintes et mieux organiser ma vie personnelle." },
  ];

  return (
    // A white background to finish the main content area.
    <section className="bg-white py-24">
      <div className="container mx-auto px-8">
        {/* ===== Section Title ===== */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">Témoignages de Nos Utilisateurs</h2>
        </div>
        
        {/* ===== Testimonials Grid ===== */}
        {/* A responsive grid that stacks on mobile and goes up to 3 columns on large screens. */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(t => (
            // Each testimonial is a "card" with padding, a border, and a shadow.
            <div key={t.name} className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-100">
              {/* The quote itself is italicized to stand out. */}
              <p className="text-gray-600 italic leading-relaxed">"{t.text}"</p>
              {/* The author's information is placed below. */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="font-bold text-green-700">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}