import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  FileText,
  MessageSquare,
  Calendar,
  BarChart,
  Lock,
  Bell,
  Smartphone,
  Users,
  ClipboardList,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-blue-600 dark:text-blue-400 mb-6">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-[800px] mb-8">
              Discover how our platform connects patients and medical professionals through innovative features and
              services.
            </p>
          </div>
        </div>
      </section>

      {/* User Tabs */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <Tabs defaultValue="patients" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="patients">For Patients</TabsTrigger>
                <TabsTrigger value="professionals">For Medical Professionals</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="patients" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Empowering Patients</h2>
                  <div className="space-y-4 text-slate-700 dark:text-slate-300">
                    <p>
                      Our platform puts you in control of your healthcare journey by providing easy access to your
                      medical information and direct communication with your healthcare providers.
                    </p>
                    <p>
                      No more fragmented records or waiting days for test results. With Healthcare Connect, you can view
                      your complete medical history, receive timely feedback from your doctors, and actively participate
                      in your care decisions.
                    </p>
                  </div>
                </div>
                <div className="order-1 md:order-2 relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=Patient+Features"
                    alt="Patient features"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    icon: <FileText className="h-8 w-8 text-blue-500" />,
                    title: "Centralized Medical Records",
                    description:
                      "Access your complete medical history, test results, and prescriptions in one secure location.",
                  },
                  {
                    icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
                    title: "Secure Messaging",
                    description:
                      "Communicate directly with your healthcare providers through our encrypted messaging system.",
                  },
                  {
                    icon: <Calendar className="h-8 w-8 text-blue-500" />,
                    title: "Appointment Management",
                    description: "Schedule, reschedule, or cancel appointments with ease and receive reminders.",
                  },
                  {
                    icon: <Bell className="h-8 w-8 text-blue-500" />,
                    title: "Medication Reminders",
                    description: "Set up personalized reminders for medications and treatment plans.",
                  },
                  {
                    icon: <Smartphone className="h-8 w-8 text-blue-500" />,
                    title: "Mobile Access",
                    description: "Access your health information anytime, anywhere through our mobile app.",
                  },
                  {
                    icon: <Lock className="h-8 w-8 text-blue-500" />,
                    title: "Privacy Controls",
                    description: "Manage who can access your medical information with granular privacy settings.",
                  },
                ].map((feature, index) => (
                  <Card key={index} className="border-blue-100 dark:border-slate-700">
                    <CardHeader>
                      <div className="mb-2">{feature.icon}</div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="professionals" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=Professional+Features"
                    alt="Professional features"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Enhancing Medical Practice</h2>
                  <div className="space-y-4 text-slate-700 dark:text-slate-300">
                    <p>
                      Our platform streamlines your workflow by providing comprehensive patient information at your
                      fingertips, enabling more informed clinical decisions.
                    </p>
                    <p>
                      With Healthcare Connect, you can review patient data efficiently, communicate securely with
                      patients, and collaborate with other healthcare providers—all while maintaining HIPAA compliance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    icon: <ClipboardList className="h-8 w-8 text-green-500" />,
                    title: "Comprehensive Patient Profiles",
                    description:
                      "View complete patient histories, test results, and treatment plans in a unified interface.",
                  },
                  {
                    icon: <MessageSquare className="h-8 w-8 text-green-500" />,
                    title: "Secure Communication",
                    description: "Exchange HIPAA-compliant messages with patients and other healthcare providers.",
                  },
                  {
                    icon: <BarChart className="h-8 w-8 text-green-500" />,
                    title: "Analytics Dashboard",
                    description: "Track patient outcomes and practice metrics with customizable analytics tools.",
                  },
                  {
                    icon: <Users className="h-8 w-8 text-green-500" />,
                    title: "Team Collaboration",
                    description: "Collaborate with specialists and other providers on complex cases.",
                  },
                  {
                    icon: <Calendar className="h-8 w-8 text-green-500" />,
                    title: "Scheduling System",
                    description: "Manage your appointments and patient follow-ups efficiently.",
                  },
                  {
                    icon: <Lock className="h-8 w-8 text-green-500" />,
                    title: "Compliance Tools",
                    description:
                      "Ensure all patient interactions meet regulatory requirements with built-in compliance features.",
                  },
                ].map((feature, index) => (
                  <Card key={index} className="border-green-100 dark:border-slate-700">
                    <CardHeader>
                      <div className="mb-2">{feature.icon}</div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-[800px] mx-auto">
              Our platform connects patients and medical professionals through a simple, secure process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Patient Data Upload</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Patients securely upload their medical information or connect existing health records to our platform.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Medical Review</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Healthcare professionals access and review patient data, providing feedback and recommendations.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Secure Communication</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Patients and providers communicate through our secure messaging system to discuss findings and next
                steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Flexible Pricing Options</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-[800px] mx-auto">
              Choose the plan that best fits your needs and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg overflow-hidden shadow-sm border border-slate-200 dark:border-slate-600">
              <div className="p-6 border-b border-slate-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Basic</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">$29</span>
                  <span className="ml-1 text-slate-600 dark:text-slate-400">/month</span>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">For individual patients</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {["Personal health record", "Secure messaging", "Appointment scheduling", "Medication reminders"].map(
                    (feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                      </li>
                    ),
                  )}
                </ul>
                <Button className="w-full mt-6">Get Started</Button>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg overflow-hidden shadow-lg border border-blue-200 dark:border-blue-800 transform scale-105">
              <div className="p-6 border-b border-blue-200 dark:border-blue-800 bg-blue-100 dark:bg-blue-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Professional</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">$99</span>
                  <span className="ml-1 text-slate-600 dark:text-slate-400">/month</span>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">For healthcare providers</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {[
                    "Patient management dashboard",
                    "Secure messaging",
                    "Appointment scheduling",
                    "Analytics and reporting",
                    "Team collaboration",
                    "HIPAA compliance tools",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg overflow-hidden shadow-sm border border-slate-200 dark:border-slate-600">
              <div className="p-6 border-b border-slate-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Enterprise</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">Custom</span>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">For healthcare organizations</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {[
                    "All Professional features",
                    "Custom integrations",
                    "Dedicated support",
                    "Advanced security features",
                    "Custom analytics",
                    "On-premise deployment option",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Healthcare Experience?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-[800px] mx-auto">
            Join thousands of patients and healthcare providers who are already using our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              Get Started
            </Button>
            <Link href="/contact" passHref>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

