import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Shield, Users, FileText, Clock, Star } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-20 md:py-28">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-blue-600 dark:text-blue-400">
                Connecting Patients and Medical Professionals
              </h1>
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-[600px]">
                Centralize patient data, streamline communication, and improve healthcare outcomes with our secure
                platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href="/services" passHref>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden bg-slate-200"
                    >
                      <Image src={`/placeholder.svg?height=32&width=32&text=${i}`} alt="User" width={32} height={32} />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Trusted by <span className="font-bold">2,000+</span> healthcare professionals
                </p>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Healthcare+Connect"
                  alt="Healthcare platform interface"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-700 p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-10 w-10 text-green-500" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">HIPAA Compliant</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Your data is secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Streamlining Healthcare Communication</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-[800px] mx-auto">
              Our platform offers a comprehensive solution for both patients and medical professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="h-10 w-10 text-blue-500" />,
                title: "Centralized Patient Records",
                description:
                  "Access all patient data in one secure location, including medical history, test results, and medications.",
              },
              {
                icon: <Users className="h-10 w-10 text-blue-500" />,
                title: "Direct Communication",
                description:
                  "Connect patients with their healthcare providers through secure messaging and virtual consultations.",
              },
              {
                icon: <Clock className="h-10 w-10 text-blue-500" />,
                title: "Timely Reviews",
                description:
                  "Medical professionals can quickly review patient data and provide feedback, reducing wait times.",
              },
              {
                icon: <Shield className="h-10 w-10 text-blue-500" />,
                title: "Data Security",
                description:
                  "HIPAA-compliant platform with end-to-end encryption to protect sensitive patient information.",
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-blue-500" />,
                title: "Improved Outcomes",
                description: "Better coordination leads to more accurate diagnoses and more effective treatment plans.",
              },
              {
                icon: <Star className="h-10 w-10 text-blue-500" />,
                title: "Patient Empowerment",
                description: "Patients gain better understanding and control over their healthcare journey.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">What Our Users Say</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-[800px] mx-auto">
              Hear from healthcare professionals and patients who use our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=48&width=48&text=DR"
                    alt="Dr. Sarah Johnson"
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Dr. Sarah Johnson</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Cardiologist</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 italic">
                "This platform has transformed how I manage patient care. Having all the data in one place allows me to
                make more informed decisions quickly, and the secure messaging feature has improved my communication
                with patients."
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=48&width=48&text=PT"
                    alt="Michael Rodriguez"
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Michael Rodriguez</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Patient</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 italic">
                "As someone managing a chronic condition, having all my medical information in one place has been
                life-changing. I can easily share my data with new specialists, and getting timely feedback from my
                doctors has reduced my anxiety."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Healthcare Communication?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-[800px] mx-auto">
            Join thousands of healthcare professionals and patients who are already benefiting from our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              Sign Up Now
            </Button>
            <Link href="/contact" passHref>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

