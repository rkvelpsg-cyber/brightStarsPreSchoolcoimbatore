import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="page-section page-section-blue py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
            Visit us or reach out to learn more about our programs
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="glass-card rounded-3xl border-2 border-white/55 p-5 shadow-lg sm:p-8">
              <h3 className="mb-6 text-xl font-bold text-gray-900 sm:text-2xl">
                Birla Open Minds Preschool And Day Care
              </h3>

              <div className="space-y-6">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="bg-blue-100 rounded-xl p-3 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Address
                    </h4>
                    <p className="break-words text-gray-600">
                      No6, Annapurneshwari layout Beside 7 Hills PG for gents,
                      Nimbekaipura, Bengaluru East, Nimbekayipura, Karnataka
                      560049
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-start gap-4">
                  <div className="bg-purple-100 rounded-xl p-3 flex-shrink-0">
                    <Phone className="w-6 h-6 text-purple-500" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <p className="break-words text-gray-600">+91-7204039777</p>
                  </div>
                </div>

                <div className="flex min-w-0 items-start gap-4">
                  <div className="bg-pink-100 rounded-xl p-3 flex-shrink-0">
                    <Mail className="w-6 h-6 text-pink-500" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="break-all text-gray-600">
                      info@birlaopenmindspreschool.com
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-start gap-4">
                  <div className="bg-green-100 rounded-xl p-3 flex-shrink-0">
                    <Clock className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      School Hours
                    </h4>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 4:00 PM
                    </p>
                    <p className="text-gray-600">
                      Saturday: 8:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 p-5 text-white shadow-lg sm:p-8">
              <h3 className="mb-3 text-xl font-bold sm:text-2xl">
                Schedule a School Visit
              </h3>
              <p className="mb-6 text-white/90">
                Come see our facilities and meet our wonderful teachers. We'd
                love to show you around!
              </p>
              <button className="px-6 py-3 bg-white text-purple-600 rounded-full font-medium hover:shadow-lg transition-all transform hover:scale-105">
                Book a Tour
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="glass-card h-[320px] overflow-hidden rounded-3xl border-2 border-white/55 shadow-lg sm:h-[420px] lg:h-[600px]">
            <iframe
              src="https://maps.google.com/maps?q=No6%2C%20Annapurneshwari%20layout%20Beside%207%20Hills%20PG%20for%20gents%2C%20Nimbekaipura%2C%20Bengaluru%20East%2C%20Nimbekayipura%2C%20Karnataka%20560049&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Birla Open Minds Preschool And Day Care Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
