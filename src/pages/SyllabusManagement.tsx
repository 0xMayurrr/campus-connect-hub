import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, CheckCircle, Trash2 } from 'lucide-react';

interface SyllabusFile {
  id: string;
  title: string;
  subject: string;
  department: string;
  semester: string;
  course: string;
  fileName: string;
  uploadedAt: Date;
  status: 'processing' | 'ready' | 'error';
}

export default function SyllabusManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [syllabusFiles, setSyllabusFiles] = useState<SyllabusFile[]>([
    {
      id: '1',
      title: 'Data Structures Syllabus',
      subject: 'Data Structures',
      department: 'Computer Science',
      semester: '3rd Semester',
      course: 'B.Tech CSE',
      fileName: 'ds_syllabus.pdf',
      uploadedAt: new Date(Date.now() - 86400000),
      status: 'ready'
    },
    {
      id: '2',
      title: 'Database Management Syllabus',
      subject: 'Database Management',
      department: 'Computer Science',
      semester: '4th Semester',
      course: 'B.Tech CSE',
      fileName: 'dbms_syllabus.pdf',
      uploadedAt: new Date(Date.now() - 172800000),
      status: 'ready'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    department: user?.department || '',
    semester: '',
    course: '',
    file: null as File | null
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file || !formData.title || !formData.subject) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields and select a file',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      const newSyllabus: SyllabusFile = {
        id: crypto.randomUUID(),
        title: formData.title,
        subject: formData.subject,
        department: formData.department,
        semester: formData.semester,
        course: formData.course,
        fileName: formData.file!.name,
        uploadedAt: new Date(),
        status: 'processing'
      };

      setSyllabusFiles(prev => [newSyllabus, ...prev]);
      
      // Simulate processing completion
      setTimeout(() => {
        setSyllabusFiles(prev => 
          prev.map(s => s.id === newSyllabus.id ? { ...s, status: 'ready' } : s)
        );
      }, 3000);

      setFormData({
        title: '',
        subject: '',
        department: user?.department || '',
        semester: '',
        course: '',
        file: null
      });

      toast({
        title: 'Syllabus uploaded!',
        description: 'Your syllabus is being processed and will be available to students soon.',
      });

      setIsUploading(false);
    }, 2000);
  };

  const handleDelete = (id: string) => {
    setSyllabusFiles(prev => prev.filter(s => s.id !== id));
    toast({
      title: 'Syllabus deleted',
      description: 'The syllabus file has been removed.',
    });
  };

  const getStatusBadge = (status: SyllabusFile['status']) => {
    switch (status) {
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>;
      case 'ready':
        return <Badge variant="default">Ready</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
    }
  };

  return (
    <DashboardLayout
      title="Syllabus Management"
      subtitle="Upload and manage course syllabus files for AI Teacher"
    >
      <div className="space-y-6">
        {/* Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle>Upload New Syllabus</CardTitle>
            <CardDescription>
              Upload syllabus files to enable AI Teacher assistance for your courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Syllabus Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Data Structures Syllabus"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Data Structures"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select value={formData.semester} onValueChange={(v) => setFormData({ ...formData, semester: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8].map(sem => (
                        <SelectItem key={sem} value={`${sem}rd Semester`}>
                          {sem}rd Semester
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    placeholder="e.g., B.Tech CSE"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Syllabus File *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <label htmlFor="file" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </label>
                    </Button>
                    <input
                      id="file"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <span className="text-sm text-muted">
                      {formData.file ? formData.file.name : 'No file chosen'}
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-2">
                    Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
                  </p>
                </div>
              </div>

              <Button type="submit" disabled={isUploading} className="w-full">
                {isUploading ? 'Uploading...' : 'Upload Syllabus'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Uploaded Syllabus Files */}
        <Card>
          <CardHeader>
            <CardTitle>My Syllabus Files</CardTitle>
            <CardDescription>
              Manage your uploaded syllabus files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {syllabusFiles.map((syllabus) => (
                <div
                  key={syllabus.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{syllabus.title}</h4>
                      <p className="text-sm text-muted">
                        {syllabus.subject} • {syllabus.semester} • {syllabus.fileName}
                      </p>
                      <p className="text-xs text-muted">
                        Uploaded {syllabus.uploadedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(syllabus.status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(syllabus.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {syllabusFiles.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No Syllabus Files</h3>
                  <p className="text-muted">Upload your first syllabus to get started.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}