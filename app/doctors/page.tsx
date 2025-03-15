import { getDoctors } from '@/app/server/doctors';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, XCircle } from "lucide-react";

export default async function DoctorsPage() {
  // Fetch doctors from Supabase
  const { doctors, error } = await getDoctors();
  
  // Helper function to get doctor's full name
  const getDoctorName = (doctor: any) => {
    return `${doctor.first_name || ''} ${doctor.last_name || ''}`.trim() || 'Unknown Doctor';
  };
  
  // Helper function to get doctor's initials for avatar
  const getDoctorInitials = (doctor: any) => {
    const firstName = doctor.first_name || '';
    const lastName = doctor.last_name || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };
  
  // Helper function to get status badge
  const getStatusBadge = (status: string = 'pending') => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50">
            <CheckCircle className="mr-1 h-3 w-3" /> Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50">
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
    }
  };
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Doctors</h1>
      
      {error ? (
        <div className="bg-red-50 p-4 rounded-md text-red-700">
          Error loading doctors: {error.message}
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">No doctors found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor: any) => (
            <Card key={doctor.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-gray-200">
                      <AvatarImage src={doctor.avatar_url || ''} alt={getDoctorName(doctor)} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getDoctorInitials(doctor)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{getDoctorName(doctor)}</CardTitle>
                      <CardDescription>{doctor.specialty || 'General Practitioner'}</CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(doctor.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Email:</span> {doctor.email || 'Not provided'}
                  </div>
                  {doctor.phone && (
                    <div className="text-sm">
                      <span className="font-medium">Phone:</span> {doctor.phone}
                    </div>
                  )}
                  {doctor.created_at && (
                    <div className="text-sm">
                      <span className="font-medium">Joined:</span> {new Date(doctor.created_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 