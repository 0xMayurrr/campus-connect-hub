import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Upload, Video, Play, Trash2, Edit, Clock } from 'lucide-react';

interface LectureVideo {
  id: string;
  title: string;
  description: string;
  department: string;
  course: string;
  semester: string;
  subject: string;
  topic: string;
  fileName: string;
  duration: string;
  uploadedAt: Date;
  isPublished: boolean;
}

export default function ManageLectures() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [lectures, setLectures] = useState<LectureVideo[]>([
    {
      id: '1',
      title: 'Introduction to Data Structures',
      description: 'Basic concepts and importance of data structures',
      department: 'Computer Science',
      course: 'B.Tech CSE',
      semester: '3rd Semester',
      subject: 'Data Structures',
      topic: 'Introduction',
      fileName: 'ds_intro.mp4',
      duration: '45 mins',
      uploadedAt: new Date(Date.now() - 86400000),
      isPublished: true
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: user?.department || '',
    course: '',
    semester: '',
    subject: '',
    topic: '',
    videoFile: null as File | null
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, videoFile: file });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.videoFile || !formData.title || !formData.subject) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields and select a video file',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      const newLecture: LectureVideo = {
        id: crypto.randomUUID(),
        title: formData.title,
        description: formData.description,
        department: formData.department,
        course: formData.course,
        semester: formData.semester,
        subject: formData.subject,
        topic: formData.topic,
        fileName: formData.videoFile!.name,
        duration: '0 mins', // Would be calculated after processing
        uploadedAt: new Date(),
        isPublished: false
      };

      setLectures(prev => [newLecture, ...prev]);
      
      setFormData({
        title: '',
        description: '',
        department: user?.department || '',
        course: '',
        semester: '',
        subject: '',
        topic: '',
        videoFile: null
      });

      toast({
        title: 'Lecture uploaded!',
        description: 'Your video is being processed and will be available to students soon.',
      });

      setIsUploading(false);
    }, 3000);
  };

  const togglePublish = (id: string) => {
    setLectures(prev => 
      prev.map(lecture => 
        lecture.id === id 
          ? { ...lecture, isPublished: !lecture.isPublished }
          : lecture
      )
    );
    
    const lecture = lectures.find(l => l.id === id);
    toast({
      title: lecture?.isPublished ? 'Lecture unpublished' : 'Lecture published',
      description: lecture?.isPublished 
        ? 'Students can no longer access this lecture'
        : 'Students can now access this lecture',
    });
  };

  const deleteLecture = (id: string) => {
    setLectures(prev => prev.filter(l => l.id !== id));
    toast({
      title: 'Lecture deleted',
      description: 'The lecture has been removed from the system.',
    });
  };

  return (
    <DashboardLayout
      title="Manage Lectures"
      subtitle="Upload and manage video lectures for your courses"
    >
      <div className="space-y-6">
        {/* Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle>Upload New Lecture</CardTitle>
            <CardDescription>
              Upload video lectures to make them available to students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Lecture Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Introduction to Arrays"
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

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the lecture content..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    placeholder="e.g., B.Tech CSE"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
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
                  <Label htmlFor="topic">Topic/Unit</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Unit 1"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video">Video File *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <label htmlFor="video" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Video
                      </label>
                    </Button>
                    <input
                      id="video"
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <span className="text-sm text-muted">
                      {formData.videoFile ? formData.videoFile.name : 'No file chosen'}
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-2">
                    Supported formats: MP4, AVI, MOV (Max 500MB)
                  </p>
                </div>
              </div>

              <Button type="submit" disabled={isUploading} className="w-full">
                {isUploading ? 'Uploading...' : 'Upload Lecture'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Uploaded Lectures */}
        <Card>
          <CardHeader>
            <CardTitle>My Lectures</CardTitle>
            <CardDescription>
              Manage your uploaded lecture videos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lectures.map((lecture) => (
                <div
                  key={lecture.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                      <Video className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">{lecture.title}</h4>
                      <p className="text-sm text-muted">
                        {lecture.subject} • {lecture.semester} • {lecture.fileName}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-muted" />
                        <span className="text-xs text-muted">{lecture.duration}</span>
                        <span className="text-xs text-muted">•</span>
                        <span className="text-xs text-muted">
                          {lecture.uploadedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={lecture.isPublished ? 'default' : 'secondary'}>
                      {lecture.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublish(lecture.id)}
                    >
                      {lecture.isPublished ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteLecture(lecture.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {lectures.length === 0 && (
                <div className="text-center py-8">
                  <Video className="w-12 h-12 text-muted mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No Lectures Uploaded</h3>
                  <p className="text-muted">Upload your first lecture to get started.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}