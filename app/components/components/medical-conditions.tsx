"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  Clock,
  CheckCircle,
  Eye,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText,
  Pill,
  Activity,
  History,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

// Define types for our data
interface Medication {
  name: string
  dosage: string
  frequency: string
  startDate: string
  endDate: string | null
}

interface Reading {
  date: string
  value: string
  notes: string
}

interface LabResult {
  date: string
  name: string
  result: string
  notes: string
}

interface Note {
  date: string
  author: string
  content: string
}

interface Condition {
  id: number
  name: string
  status: string
  severity: string
  diagnosedDate: string
  description: string
  treatment: string
  nextCheckup: string
  diagnosedBy: string
  symptoms: string[]
  medications: Medication[]
  readings: Reading[]
  labResults: LabResult[]
  notes: Note[]
}

// Enhanced mock data for medical conditions with more details
const conditionsData: Condition[] = [
  {
    id: 1,
    name: "Hypertension",
    status: "active",
    severity: "moderate",
    diagnosedDate: "2023-05-15",
    description:
      "High blood pressure condition requiring regular monitoring and medication. Current readings show systolic pressure averaging 145 mmHg and diastolic pressure averaging 90 mmHg.",
    treatment:
      "Daily medication (Lisinopril 10mg), reduced sodium diet, regular exercise, and stress management techniques.",
    nextCheckup: "2023-08-15",
    diagnosedBy: "Dr. Sarah Johnson",
    symptoms: ["Occasional headaches", "Fatigue", "Shortness of breath"],
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "2022-03-10", endDate: null },
      {
        name: "Hydrochlorothiazide",
        dosage: "12.5mg",
        frequency: "Once daily",
        startDate: "2022-03-10",
        endDate: "2022-09-15",
      },
    ],
    readings: [
      { date: "2023-06-01", value: "142/88", notes: "Morning reading" },
      { date: "2023-05-15", value: "145/90", notes: "After doctor visit" },
      { date: "2023-05-01", value: "150/92", notes: "Before medication adjustment" },
    ],
    labResults: [
      { date: "2023-05-15", name: "Kidney Function Panel", result: "Normal", notes: "All values within range" },
      {
        date: "2023-01-10",
        name: "Electrolyte Panel",
        result: "Normal",
        notes: "Sodium slightly elevated but within range",
      },
    ],
    notes: [
      {
        date: "2023-05-15",
        author: "Dr. Sarah Johnson",
        content: "Patient responding well to current medication regimen. Continue monitoring.",
      },
      {
        date: "2023-01-10",
        author: "Dr. Sarah Johnson",
        content: "Initial diagnosis. Starting on Lisinopril 10mg daily.",
      },
    ],
  },
  {
    id: 2,
    name: "Type 2 Diabetes",
    status: "active",
    severity: "moderate",
    diagnosedDate: "2022-11-03",
    description:
      "Insulin resistance resulting in elevated blood glucose levels. Recent HbA1c test shows a level of 7.2%, which is above the target range but showing improvement from previous readings.",
    treatment:
      "Metformin 1000mg twice daily, dietary modifications focusing on low glycemic index foods, regular blood glucose monitoring, and 30 minutes of daily exercise.",
    nextCheckup: "2023-07-22",
    diagnosedBy: "Dr. Michael Chen",
    symptoms: ["Increased thirst", "Frequent urination", "Fatigue", "Blurred vision"],
    medications: [
      { name: "Metformin", dosage: "1000mg", frequency: "Twice daily", startDate: "2022-11-03", endDate: null },
    ],
    readings: [
      { date: "2023-06-10", value: "HbA1c: 7.2%", notes: "Improved from previous" },
      { date: "2023-03-15", value: "HbA1c: 7.8%", notes: "Needs improvement" },
      { date: "2022-11-03", value: "HbA1c: 8.5%", notes: "Initial diagnosis" },
    ],
    labResults: [
      {
        date: "2023-06-10",
        name: "Comprehensive Metabolic Panel",
        result: "Abnormal",
        notes: "Glucose elevated at 145 mg/dL",
      },
      { date: "2023-06-10", name: "HbA1c", result: "Abnormal", notes: "7.2% (Target <6.5%)" },
      { date: "2022-11-03", name: "Glucose Tolerance Test", result: "Abnormal", notes: "Confirmed diabetes diagnosis" },
    ],
    notes: [
      {
        date: "2023-06-10",
        author: "Dr. Michael Chen",
        content: "Patient showing improvement with medication and lifestyle changes. Continue current regimen.",
      },
      {
        date: "2022-11-03",
        author: "Dr. Michael Chen",
        content: "Diagnosed with Type 2 Diabetes. Starting on Metformin and lifestyle modifications.",
      },
    ],
  },
  {
    id: 3,
    name: "Seasonal Allergies",
    status: "recurring",
    severity: "mild",
    diagnosedDate: "2020-03-10",
    description:
      "Allergic rhinitis triggered by pollen, typically occurring in spring and early summer. Symptoms include sneezing, nasal congestion, and itchy eyes.",
    treatment:
      "Over-the-counter antihistamines as needed, nasal corticosteroid spray during high pollen seasons, and avoiding outdoor activities during peak pollen times.",
    nextCheckup: "As needed during allergy season",
    diagnosedBy: "Dr. Emily Rodriguez",
    symptoms: ["Sneezing", "Nasal congestion", "Itchy eyes", "Runny nose"],
    medications: [
      { name: "Cetirizine", dosage: "10mg", frequency: "Once daily as needed", startDate: "2020-03-10", endDate: null },
      {
        name: "Fluticasone Nasal Spray",
        dosage: "50mcg",
        frequency: "1 spray per nostril daily",
        startDate: "2021-04-15",
        endDate: null,
      },
    ],
    readings: [],
    labResults: [
      {
        date: "2020-03-10",
        name: "Allergy Panel",
        result: "Positive",
        notes: "Positive for tree and grass pollen allergies",
      },
    ],
    notes: [
      {
        date: "2022-05-20",
        author: "Dr. Emily Rodriguez",
        content: "Patient reports good control with current medication regimen during allergy season.",
      },
      {
        date: "2021-04-15",
        author: "Dr. Emily Rodriguez",
        content: "Added nasal corticosteroid spray to regimen for better symptom control.",
      },
      {
        date: "2020-03-10",
        author: "Dr. Emily Rodriguez",
        content: "Initial diagnosis of seasonal allergies. Recommended OTC antihistamines.",
      },
    ],
  },
  {
    id: 4,
    name: "Lower Back Pain",
    status: "resolved",
    severity: "moderate",
    diagnosedDate: "2022-01-20",
    description:
      "Lumbar strain resulting from improper lifting technique. MRI showed no disc herniation or structural abnormalities. Pain was primarily localized to the L4-L5 region.",
    treatment:
      "Physical therapy (completed 12 sessions), core strengthening exercises, proper ergonomics education, and temporary use of NSAIDs for pain management.",
    nextCheckup: "No follow-up required unless symptoms return",
    diagnosedBy: "Dr. James Wilson",
    symptoms: ["Lower back pain", "Stiffness", "Limited range of motion", "Pain with certain movements"],
    medications: [
      {
        name: "Ibuprofen",
        dosage: "600mg",
        frequency: "As needed for pain",
        startDate: "2022-01-20",
        endDate: "2022-03-15",
      },
    ],
    readings: [],
    labResults: [
      {
        date: "2022-01-25",
        name: "Lumbar MRI",
        result: "Normal",
        notes: "No disc herniation or structural abnormalities",
      },
    ],
    notes: [
      {
        date: "2022-04-10",
        author: "Dr. James Wilson",
        content: "Patient reports complete resolution of symptoms after physical therapy and home exercises.",
      },
      {
        date: "2022-01-20",
        author: "Dr. James Wilson",
        content: "Diagnosed with lumbar strain. Referred to physical therapy and prescribed NSAIDs for pain.",
      },
    ],
  },
]

export function MedicalConditions() {
  const [conditions] = useState<Condition[]>(conditionsData)
  const [activeTab, setActiveTab] = useState<string>("all")
  const [expandedCondition, setExpandedCondition] = useState<number | null>(null)
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const filteredConditions = conditions.filter((condition) => {
    if (activeTab === "all") return true
    return condition.status === activeTab
  })

  const toggleExpand = (id: number) => {
    setExpandedCondition(expandedCondition === id ? null : id)
  }

  const openConditionModal = (condition: Condition) => {
    setSelectedCondition(condition)
    setIsModalOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50">
            <AlertCircle className="mr-1 h-3 w-3" /> Active
          </Badge>
        )
      case "recurring":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50">
            <Clock className="mr-1 h-3 w-3" /> Recurring
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50">
            <CheckCircle className="mr-1 h-3 w-3" /> Resolved
          </Badge>
        )
      default:
        return null
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "mild":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
            Mild
          </Badge>
        )
      case "moderate":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50">
            Moderate
          </Badge>
        )
      case "severe":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50">
            Severe
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="all"
        className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            All Conditions
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="resolved"
            className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            Resolved
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-6">
        {filteredConditions.map((condition) => (
          <Card key={condition.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col">
                    <CardTitle className="text-xl">{condition.name}</CardTitle>
                    <CardDescription>
                      Diagnosed on {new Date(condition.diagnosedDate).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {getStatusBadge(condition.status)}
                  {getSeverityBadge(condition.severity)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Description</h4>
                  <p className="text-sm text-muted-foreground mt-1">{condition.description}</p>
                </div>

                <div>
                      <h4 className="text-sm font-medium text-gray-700">Treatment Plan</h4>
                      <p className="text-sm text-muted-foreground mt-1">{condition.treatment}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Next Checkup</h4>
                      <p className="text-sm text-muted-foreground mt-1">{condition.nextCheckup}</p>
                    </div>
                <div className="flex justify-between items-center mt-4">
                  

                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-gray-200"
                    onClick={() => openConditionModal(condition)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Full Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredConditions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg shadow-sm border border-gray-200">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <p className="text-lg font-medium text-gray-900">No {activeTab} conditions found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {activeTab === "active"
                ? "You don't have any active medical conditions at the moment."
                : "No conditions match the current filter."}
            </p>
          </div>
        )}
      </div>

      {/* Detailed Condition Modal - View Only */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl">
                {selectedCondition?.name}
                <span className="ml-3 inline-flex">
                  {selectedCondition && getStatusBadge(selectedCondition.status)}
                </span>
              </DialogTitle>
            </div>
            <DialogDescription>
              Diagnosed on {selectedCondition && new Date(selectedCondition.diagnosedDate).toLocaleDateString()} by{" "}
              {selectedCondition?.diagnosedBy}
            </DialogDescription>
          </DialogHeader>

          {selectedCondition && (
            <div className="space-y-6">
              {/* Overview Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" /> Overview
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Severity</p>
                    <p className="text-sm mt-1 flex items-center">{getSeverityBadge(selectedCondition.severity)}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">Status</p>
                    <p className="text-sm mt-1">{getStatusBadge(selectedCondition.status)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Description</p>
                  <p className="text-sm mt-1">{selectedCondition.description}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Treatment Plan</p>
                  <p className="text-sm mt-1">{selectedCondition.treatment}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Next Checkup</p>
                    <p className="text-sm mt-1">{selectedCondition.nextCheckup}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">Diagnosed By</p>
                    <p className="text-sm mt-1">{selectedCondition.diagnosedBy}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Symptoms Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" /> Symptoms
                </h3>

                <div className="flex flex-wrap gap-2">
                  {selectedCondition.symptoms.map((symptom, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Medications Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Pill className="h-5 w-5 mr-2 text-primary" /> Medications
                </h3>

                <div className="space-y-4">
                  {selectedCondition.medications.map((medication, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-md">
                      <div className="flex justify-between">
                        <p className="font-medium">
                          {medication.name} ({medication.dosage})
                        </p>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {medication.endDate ? "Completed" : "Active"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{medication.frequency}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Started: {new Date(medication.startDate).toLocaleDateString()}
                        {medication.endDate && ` • Ended: ${new Date(medication.endDate).toLocaleDateString()}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Readings/Measurements Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" /> Readings & Measurements
                </h3>

                {selectedCondition.readings.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCondition.readings.map((reading, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{reading.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(reading.date).toLocaleDateString()}
                            </p>
                          </div>
                          {reading.notes && <p className="text-sm text-muted-foreground">{reading.notes}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 bg-gray-50 rounded-md">
                    <p className="text-muted-foreground">No readings recorded for this condition</p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Lab Results Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" /> Lab Results
                </h3>

                {selectedCondition.labResults.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCondition.labResults.map((result, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{result.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(result.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant="outline"
                              className={
                                result.result === "Normal" || result.result === "Negative"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                              }
                            >
                              {result.result}
                            </Badge>
                            {result.notes && <p className="text-sm text-muted-foreground mt-1">{result.notes}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 bg-gray-50 rounded-md">
                    <p className="text-muted-foreground">No lab results recorded for this condition</p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Notes Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <History className="h-5 w-5 mr-2 text-primary" /> Progress Notes
                </h3>

                <div className="space-y-4">
                  {selectedCondition.notes.map((note, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-md">
                      <p className="text-sm text-muted-foreground mb-2">
                        {new Date(note.date).toLocaleDateString()} by {note.author}
                      </p>
                      <p>{note.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
