"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { supabase } from "@/utils/supabase"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast" // For showing toast notifications

// List of countries for the dropdown
const countries = [
  "Australia",
  "Canada",
  "France",
  "Germany",
  "India",
  "Italy",
  "Japan",
  "Spain",
  "United Kingdom",
  "United States",
  "Other",
]

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  birthDate: z.string().refine(
    (date) => {
      const today = new Date()
      const birthDate = new Date(date)
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 18
    },
    { message: "You must be at least 18 years old." },
  ),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender.",
  }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  role: z.enum(["user", "doctor"], {
    required_error: "Please select a role.",
  }),
})

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [debugInfo, setDebugInfo] = useState(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthDate: "",
      gender: undefined,
      city: "",
      country: "",
      role: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      
      // Step 1: Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
          },
        },
      });
      
      if (authError) throw authError;
      
      // Step 2: Create user entry in the 'users' table
      if (authData?.user) {
        // First, check if users table exists
        console.log(values.role)
        if(values.role == 'user')
        {
          const userData = { 
            supabase_id: authData.user.id,  // Change from user_id to supabase_id
            email: values.email,
            first_name: values.firstName,
            last_name: values.lastName,
            date_of_birth: values.birthDate,
            gender: values.gender,
            city: values.city,
            country: values.country,
            role: values.role === 'user' ? 'patient' : 'doctor', // Map 'user' to 'patient'
            created_at: new Date().toISOString(),
          };
          const pacientData = { 
            user_id: authData.user.id,  // Change from user_id to supabase_id
            storage_id:"test",
          };
          
          const { error: profileError } = await supabase
            .from('user')
            .insert([userData])
            .select();
          
            
          const { data, error } = await supabase
          .from('patient')
          .insert([
            pacientData
          ])
          .select()
          console.log(error)
        
        if (profileError) {
          console.error("Error creating user profile:", profileError);
          // Store detailed error information for debugging
          
          throw new Error(`Failed to create user profile: ${profileError.message}`);
        }

        }else{
          console.log("else")
          const doctorData = {
            user_id: authData.user.id,
            specialization_id: "7f9114b1-43f1-4ff8-870a-5eb78de8c063",
            hospital: "Arad",
          }
          console.log(doctorData)
          const userDataelse = { 
            supabase_id: authData.user.id,  // Change from user_id to supabase_id
            email: values.email,
            first_name: values.firstName,
            last_name: values.lastName,
            date_of_birth: values.birthDate,
            gender: values.gender,
             city: values.city,
            country: values.country,
            role: 'doctor', // Since this is in the else block, we know it's a doctor
            created_at: new Date().toISOString(),
          };
          console.log(userDataelse)
          const { error: profileError } = await supabase
            .from('user')
            .insert([userDataelse])
            .select();
          
            
          const { data, error } = await supabase
          .from('doctor')
          .insert([
            doctorData
          ])
          .select()
          console.log(profileError)
          console.log(error)
        
        if (profileError) {
          console.error("Error creating user profile:", profileError);
          // Store detailed error information for debugging
          
          throw new Error(`Failed to create user profile: ${profileError.message}`);
        }
        }
      } else {
        throw new Error("No user was created during signup");
      }
      
      // Step 3: Show verification screen if email confirmation is required
      if (authData.user && !authData.user.email_confirmed_at) {
        setVerifying(true);
        toast({
          title: "Verification Email Sent",
          description: "Please check your inbox and verify your email address to continue.",
        });
      } else {
        // If no email verification is required, redirect to dashboard
        toast({
          title: "Account Created",
          description: "Your account has been created successfully!",
        });
        router.push("/dashboard");
      }
      
    } catch (error: any) {
      console.error("Error during signup:", error);
      toast({
        title: "Error",
        description: error.message || "There was a problem creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // If debug information is available and we're in development
  const showDebugInfo = process.env.NODE_ENV === 'development' && debugInfo;

  // If verification screen is shown
  if (verifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Verify Your Email</CardTitle>
            <CardDescription className="text-center">
              We've sent a verification link to your email. Please check your inbox and click the link to verify your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="text-center mb-4">
              Once verified, you can proceed to login.
            </p>
            <Button
              onClick={() => router.push("/login")}
              className="mt-2"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center text-primary mb-6 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
              <CardDescription className="text-center">Fill in your details to get started</CardDescription>
            </CardHeader>
            <CardContent>
              {showDebugInfo && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded text-sm overflow-auto max-h-32">
                  <strong>Debug Info:</strong> {debugInfo}
                </div>
              )}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Birth Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="male" />
                              </FormControl>
                              <FormLabel className="font-normal">Male</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="female" />
                              </FormControl>
                              <FormLabel className="font-normal">Female</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Bucuresti" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="user" />
                              </FormControl>
                              <FormLabel className="font-normal">User</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="doctor" />
                              </FormControl>
                              <FormLabel className="font-normal">Doctor</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}