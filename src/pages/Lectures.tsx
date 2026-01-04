import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Play, Clock, BookOpen, Filter } from 'lucide-react';

const lectures = [
  {
    id: '1',
    title: 'Introduction to Data Structures',
    subject: 'Data Structures',
    department: 'Computer Science',
    semester: '3rd Semester',
    duration: '45 mins',
    uploadedBy: 'Prof. Kumar',
    uploadedAt: new Date(Date.now() - 86400000),
    thumbnail: null,
  },
  {
    id: '2',
    title: 'Arrays and Linked Lists',
    subject: 'Data Structures',
    department: 'Computer Science',
    semester: '3rd Semester',
    duration: '52 mins',
    uploadedBy: 'Prof. Kumar',
    uploadedAt: new Date(Date.now() - 172800000),
    thumbnail: null,
  },
  {
    id: '3',
    title: 'SQL Basics and Queries',
    subject: 'Database Management',
    department: 'Computer Science',
    semester: '4th Semester',
    duration: '38 mins',
    uploadedBy: 'Prof. Sharma',
    uploadedAt: new Date(Date.now() - 259200000),
    thumbnail: null,
  },
  {
    id: '4',
    title: 'Normalization Techniques',
    subject: 'Database Management',
    department: 'Computer Science',
    semester: '4th Semester',
    duration: '41 mins',
    uploadedBy: 'Prof. Sharma',
    uploadedAt: new Date(Date.now() - 345600000),
    thumbnail: null,
  },
  {
    id: '5',
    title: 'OSI Model Overview',
    subject: 'Computer Networks',
    department: 'Computer Science',
    semester: '5th Semester',
    duration: '35 mins',
    uploadedBy: 'Prof. Patel',
    uploadedAt: new Date(Date.now() - 432000000),
    thumbnail: null,
  },
];

export default function Lectures() {
  const subjects = [...new Set(lectures.map(l => l.subject))];

  return (
    <DashboardLayout
      title="Video Lectures"
      subtitle="Access recorded lectures for your courses"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Button variant="default" size="sm">All</Button>
          {subjects.map((subject) => (
            <Button key={subject} variant="outline" size="sm">
              {subject}
            </Button>
          ))}
        </div>

        {/* Lectures Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lectures.map((lecture) => (
            <Card key={lecture.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-muted flex items-center justify-center">
                <Video className="w-12 h-12 text-muted-foreground/50" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </div>
                </div>
                <Badge className="absolute bottom-2 right-2 bg-foreground/80 text-background">
                  <Clock className="w-3 h-3 mr-1" />
                  {lecture.duration}
                </Badge>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-2">{lecture.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <BookOpen className="w-3 h-3" />
                  {lecture.subject}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">{lecture.uploadedBy}</span>
                  <Badge variant="outline">{lecture.semester}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {lectures.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Video className="w-12 h-12 text-muted mb-4" />
              <h3 className="font-semibold text-lg mb-2">No Lectures Available</h3>
              <p className="text-muted">Lectures will appear here once uploaded by your instructors.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
