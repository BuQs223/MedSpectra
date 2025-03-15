"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ActivityIcon, HeartPulseIcon, CigaretteIcon as LungsIcon, ThermometerIcon } from "lucide-react"

interface PatientMedicalHistoryProps {
  patient: any
}

export function PatientMedicalHistory({ patient }: PatientMedicalHistoryProps) {
  // Sort visits by date (newest first)
  const sortedVisits = [...patient.visits].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Medical Timeline</CardTitle>
          <CardDescription>History of patient visits and medical events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

            <div className="space-y-8">
              {sortedVisits.map((visit, index) => (
                <div key={visit.id} className="relative pl-12">
                  {/* Timeline dot */}
                  <div className="absolute left-3.5 top-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                          <span className="font-medium">{new Date(visit.date).toLocaleDateString()}</span>
                        </div>
                        <p className="mt-1 text-muted-foreground text-sm">{visit.type}</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {visit.type}
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                      <p className="text-sm">{visit.notes}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Vital Signs</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-2 bg-gray-50 rounded-md">
                          <div className="flex items-center mb-1">
                            <ActivityIcon className="h-3 w-3 mr-1 text-blue-600" />
                            <p className="text-xs font-medium">Blood Pressure</p>
                          </div>
                          <p className="text-sm font-medium">{visit.vitalSigns.bloodPressure}</p>
                        </div>

                        <div className="p-2 bg-gray-50 rounded-md">
                          <div className="flex items-center mb-1">
                            <HeartPulseIcon className="h-3 w-3 mr-1 text-red-600" />
                            <p className="text-xs font-medium">Heart Rate</p>
                          </div>
                          <p className="text-sm font-medium">{visit.vitalSigns.heartRate} bpm</p>
                        </div>

                        <div className="p-2 bg-gray-50 rounded-md">
                          <div className="flex items-center mb-1">
                            <ThermometerIcon className="h-3 w-3 mr-1 text-amber-600" />
                            <p className="text-xs font-medium">Temperature</p>
                          </div>
                          <p className="text-sm font-medium">{visit.vitalSigns.temperature} °F</p>
                        </div>

                        <div className="p-2 bg-gray-50 rounded-md">
                          <div className="flex items-center mb-1">
                            <LungsIcon className="h-3 w-3 mr-1 text-green-600" />
                            <p className="text-xs font-medium">Respiratory Rate</p>
                          </div>
                          <p className="text-sm font-medium">{visit.vitalSigns.respiratoryRate} /min</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Medical Conditions</CardTitle>
            <CardDescription>Chronic and ongoing health issues</CardDescription>
          </CardHeader>
          <CardContent>
            {patient.medicalConditions.length > 0 ? (
              <div className="space-y-3">
                {patient.medicalConditions.map((condition: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-3" />
                      <span>{condition}</span>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Ongoing
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No medical conditions recorded</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medication History</CardTitle>
            <CardDescription>Current and past medications</CardDescription>
          </CardHeader>
          <CardContent>
            {patient.medications.length > 0 ? (
              <div className="space-y-4">
                {patient.medications.map((medication: any, index: number) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{medication.name}</p>
                      {medication.status && (
                        <Badge
                          variant="outline"
                          className={medication.status.toLowerCase() === "active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : medication.status.toLowerCase() === "stopped"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        >
                          {medication.status.charAt(0).toUpperCase() + medication.status.slice(1).toLowerCase()}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm">
                      {medication.dosage} • {medication.frequency}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Started on {medication.startDate && medication.startDate !== "Not specified"
                        ? new Date(medication.startDate).toLocaleDateString()
                        : "unknown date"}
                    </p>
                  </div>
                ))}

              </div>
            ) : (
              <p className="text-muted-foreground">No medications recorded</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Allergies and Reactions</CardTitle>
          <CardDescription>Known allergens and adverse reactions</CardDescription>
        </CardHeader>
        <CardContent>
          {patient.allergies.length > 0 ? (
            <div className="space-y-3">
              {patient.allergies.map((allergy: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-red-500 mr-3" />
                    <span>{allergy}</span>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Severe
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No known allergies</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

