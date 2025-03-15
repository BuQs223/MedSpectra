"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  FileText,
  Download,
  Printer,
  Plus,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PatientReportsProps {
  patient: any
}

export function PatientReports({ patient }: PatientReportsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReport, setSelectedReport] = useState<any | null>(null)
  const [expandedReport, setExpandedReport] = useState<string | null>(null)
  const [addReportDialogOpen, setAddReportDialogOpen] = useState(false)

  // New report form state
  const [reportType, setReportType] = useState("")
  const [reportSummary, setReportSummary] = useState("")

  const filteredReports = patient.reports.filter((report: any) => {
    return (
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleAddReport = () => {
    // In a real app, you would send this to an API
    console.log("Adding new report:", { reportType, reportSummary })

    // Reset form and close dialog
    setReportType("")
    setReportSummary("")
    setAddReportDialogOpen(false)

    // Show success message
    alert("Report added successfully")
  }

  const toggleExpandReport = (reportId: string) => {
    setExpandedReport(expandedReport === reportId ? null : reportId)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
          <div>
            <CardTitle>Medical Reports</CardTitle>
            <CardDescription>View and manage test results and medical reports</CardDescription>
          </div>
          <Dialog open={addReportDialogOpen} onOpenChange={setAddReportDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Report</DialogTitle>
                <DialogDescription>Enter the details of the new medical report</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Blood Test">Blood Test</SelectItem>
                      <SelectItem value="Urinalysis">Urinalysis</SelectItem>
                      <SelectItem value="X-Ray">X-Ray</SelectItem>
                      <SelectItem value="MRI">MRI</SelectItem>
                      <SelectItem value="CT Scan">CT Scan</SelectItem>
                      <SelectItem value="Echocardiogram">Echocardiogram</SelectItem>
                      <SelectItem value="EKG">EKG</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea
                    id="summary"
                    placeholder="Enter a brief summary of the report..."
                    value={reportSummary}
                    onChange={(e) => setReportSummary(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="file">Attach Report File (Optional)</Label>
                  <Input id="file" type="file" />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setAddReportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddReport} disabled={!reportType || !reportSummary}>
                  Save Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="relative w-full max-w-sm mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search reports..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredReports.length > 0 ? (
            <div className="space-y-4">
              {filteredReports.map((report: any) => (
                <Card key={report.id} className="overflow-hidden">
                  <div className="p-4 cursor-pointer" onClick={() => toggleExpandReport(report.id)}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">{report.type}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(report.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {report.type}
                        </Badge>
                        {expandedReport === report.id ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <p className="mt-2">{report.summary}</p>
                  </div>

                  {expandedReport === report.id && (
                    <div className="border-t px-4 py-3">
                      <h4 className="text-sm font-medium mb-2">Results</h4>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Test</TableHead>
                              <TableHead>Result</TableHead>
                              <TableHead>Reference Range</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {report.results.map((result: any, index: number) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{result.name}</TableCell>
                                <TableCell>{result.value}</TableCell>
                                <TableCell>{result.range}</TableCell>
                                <TableCell>
                                  {result.flag === "H" && (
                                    <Badge className="bg-amber-50 text-amber-700 border-amber-200">
                                      <AlertCircle className="mr-1 h-3 w-3" /> High
                                    </Badge>
                                  )}
                                  {result.flag === "L" && (
                                    <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                                      <AlertCircle className="mr-1 h-3 w-3" /> Low
                                    </Badge>
                                  )}
                                  {result.flag === "N" && (
                                    <Badge className="bg-green-50 text-green-700 border-green-200">
                                      <CheckCircle className="mr-1 h-3 w-3" /> Normal
                                    </Badge>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Printer className="mr-2 h-4 w-4" />
                          Print
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FileText className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-lg font-medium text-gray-900">No reports found</p>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm ? "Try adjusting your search criteria" : "Add medical reports to get started"}
              </p>
              {!searchTerm && (
                <Button onClick={() => setAddReportDialogOpen(true)} variant="outline" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Report
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

