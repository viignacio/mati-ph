import React from 'react'

export function TestimonialsBlockUI({ data, dictionary }: any) {
  return (
    <section className="py-24 bg-surface-container-highest">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-on-surface mb-12 text-center">{data.heading}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.testimonials?.map((testimonial: any, index: number) => (
            <div key={testimonial._key || index} className="p-8 bg-surface rounded-2xl shadow-sm">
              <p className="text-lg italic text-on-surface mb-6">"{testimonial.quote}"</p>
              <div>
                <p className="font-bold font-sans text-on-surface">{testimonial.author}</p>
                {testimonial.role && <p className="text-sm font-sans text-on-surface-variant">{testimonial.role}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
