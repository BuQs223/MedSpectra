import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Lightbulb, Target, Award, Users } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-blue-600 dark:text-blue-400 mb-6">
              About Healthcare Connect
            </h1>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-[800px] mb-8">
              We're on a mission to transform healthcare by connecting patients and medical professionals through
              secure, accessible technology.
            </p>
            <div className="relative w-full max-w-4xl h-[300px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=300&width=1200&text=Our+Team"
                alt="Healthcare Connect Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p>
                  Healthcare Connect was founded in 2020 by a team of healthcare professionals and technology experts
                  who recognized the need for better communication between patients and medical providers.
                </p>
                <p>
                  After witnessing firsthand the challenges of fragmented patient data and delayed communication, our
                  founders set out to create a platform that would centralize information and streamline the healthcare
                  experience.
                </p>
                <p>
                  What began as a simple secure messaging system has evolved into a comprehensive platform that serves
                  thousands of healthcare professionals and patients across the country.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Our+Journey"
                alt="Our journey"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Mission and Values</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-[800px] mx-auto">
              We're guided by a commitment to improving healthcare outcomes through technology and human connection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="h-10 w-10 text-red-500" />,
                title: "Patient-Centered Care",
                description: "We believe that healthcare technology should empower patients and put their needs first.",
              },
              {
                icon: <Shield className="h-10 w-10 text-blue-500" />,
                title: "Security & Privacy",
                description: "Protecting sensitive health information is our top priority, with no compromises.",
              },
              {
                icon: <Lightbulb className="h-10 w-10 text-yellow-500" />,
                title: "Innovation",
                description: "We continuously improve our platform to address evolving healthcare challenges.",
              },
              {
                icon: <Target className="h-10 w-10 text-green-500" />,
                title: "Accessibility",
                description:
                  "We're committed to making healthcare more accessible to everyone, regardless of location.",
              },
              {
                icon: <Users className="h-10 w-10 text-purple-500" />,
                title: "Collaboration",
                description: "We foster meaningful connections between patients and healthcare providers.",
              },
              {
                icon: <Award className="h-10 w-10 text-orange-500" />,
                title: "Excellence",
                description: "We strive for excellence in everything we do, from user experience to customer support.",
              },
            ].map((value, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Meet Our Leadership Team</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-[800px] mx-auto">
              Our diverse team brings together expertise in healthcare, technology, and business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Emily Chen",
                role: "Co-Founder & CEO",
                bio: "Former cardiologist with 15 years of clinical experience",
                image: "/placeholder.svg?height=300&width=300&text=EC",
              },
              {
                name: "Michael Rodriguez",
                role: "Co-Founder & CTO",
                bio: "Software engineer with background in healthcare IT security",
                image: "/placeholder.svg?height=300&width=300&text=MR",
              },
              {
                name: "Dr. James Wilson",
                role: "Chief Medical Officer",
                bio: "Board-certified internist and digital health advocate",
                image: "/placeholder.svg?height=300&width=300&text=JW",
              },
              {
                name: "Sarah Johnson",
                role: "Chief Product Officer",
                bio: "Former patient advocate with expertise in UX design",
                image: "/placeholder.svg?height=300&width=300&text=SJ",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-[300px]">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 mb-2">{member.role}</p>
                  <p className="text-slate-600 dark:text-slate-300">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Us in Transforming Healthcare</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-[800px] mx-auto">
            Whether you're a healthcare provider or a patient, we invite you to experience the benefits of our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              Get Started
            </Button>
            <Link href="/contact" passHref>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

