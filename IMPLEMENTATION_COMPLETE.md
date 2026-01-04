# Campus Aid Buddy - Smart Campus Support Platform

A comprehensive, role-based campus support and academic assistance platform that streamlines student service requests, facility management, academic support, and campus operations.

## 🎯 Platform Overview

Campus Aid Buddy transforms traditional campus workflows into traceable, automated, and intelligent processes by providing:

- **Structured ticket-based request workflows**
- **Syllabus-aware AI teacher assistance** 
- **Digital lecture video library**
- **QR-based campus navigation**
- **Location-attached reporting**
- **Role-wise dashboards & accountability**

## ✅ Fully Implemented Features

### 🎫 1. Ticket-Based Campus Request System
- Complete ticket submission with categories, departments, and priorities
- Auto-generated ticket IDs with structured numbering (TKT240101)
- Full ticket lifecycle: Submitted → Under Review → In-Progress → Resolved → Closed
- Activity logging for complete audit trail
- Role-based ticket visibility and management
- **Automatic department routing** based on ticket category
- **Priority assignment** based on issue type
- **Escalation workflows** with time-based triggers

### 📍 2. Location-Attached Issue Reporting
- Real-time GPS location capture during ticket submission
- Latitude/longitude coordinates with accuracy tracking
- Campus zone mapping (North Campus, South Campus, Main Campus)
- Location display in ticket details
- Address resolution for better context

### 🗺️ 3. QR-Based Campus Navigation & Location Identification
- **Functional QR code scanner** with camera access
- QR code generation for campus locations
- Instant facility information on QR scan
- Google Maps navigation integration
- Location-based ticket submission from QR scans

### 🎓 4. Syllabus-Aware AI Teacher
- **Complete syllabus management system** for teachers
- File upload support (PDF, DOC, DOCX, TXT)
- **Intelligent content processing** and topic extraction
- **Context-aware responses** based on uploaded syllabus materials
- Subject-specific knowledge base
- Interactive chat interface with suggested questions

### 🎥 5. Digital Lecture & Video Learning Library
- Video lecture upload and management
- Department, course, and semester mapping
- Role-based access control (students view, teachers manage)
- Thumbnail generation and duration tracking
- Search and filter by subject/department

### 🤖 6. Campus AI Assistant (Rule-Based Help System)
- **Comprehensive knowledge base** for campus information
- Department routing guidance and contact information
- Facility information and operating hours
- Procedure guidance for common tasks
- Emergency contact directory
- FAQ system with suggested actions

### 👥 7. Multi-Role Access & Dashboards
Complete implementation for all specified roles:
- **Students**: Submit requests, track tickets, access lectures, use AI teacher
- **Teaching Staff**: Manage lectures, upload syllabus, handle academic queries
- **Tutors**: Handle student academic queries and guidance
- **Department Staff**: Process department-specific requests
- **HOD**: Oversight and escalation handling
- **Admin**: System-wide management and monitoring
- **Hostel Warden**: Hostel-related issue management
- **Maintenance Team**: Facility and maintenance request handling
- **Security Staff**: Security incident management
- **Transport Officer**: Transport-related request handling

### 🔄 8. Department & Workflow Routing Logic
- **Automatic ticket routing** based on category and department
- **Escalation triggers** based on time elapsed and priority
- **Role-based assignment** with proper authority mapping
- **Priority calculation** based on issue type and urgency

### 🔐 9. Security & Access Control
- **Firebase integration** for secure data storage
- **Role-based permissions** and data isolation
- **Secure file storage** for lectures and syllabus materials
- **Department-level access control**
- **Private ticket visibility** based on user role

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **React Router** for navigation
- **React Query** for state management

### Backend Services
- **Firebase Firestore** for real-time database
- **Firebase Storage** for file management
- **Firebase Authentication** for user management

### Key Services Implemented
- `QRCodeService` - QR code generation and parsing
- `SyllabusService` - Syllabus content processing and search
- `CampusAIService` - Rule-based AI assistant responses
- `DepartmentRoutingService` - Automatic ticket routing logic
- `FirebaseService` - Database operations and file management

## 📱 User Interfaces

### Student Dashboard
- Personal ticket statistics and recent submissions
- Quick access to submit requests, navigate campus, and use AI teacher
- Lecture library access for enrolled courses

### Staff/Teacher Dashboard  
- Assigned ticket management
- Lecture upload and syllabus management
- Department-specific workflows

### Admin Dashboard
- System-wide ticket monitoring
- User management and role assignment
- Campus location and QR code management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Firebase project setup
- Modern web browser with camera access (for QR scanning)

### Installation
```bash
# Install dependencies
npm install

# Configure Firebase
# Update src/lib/firebase.ts with your Firebase config

# Start development server
npm run dev
```

### Firebase Setup
1. Create a Firebase project
2. Enable Firestore Database
3. Enable Firebase Storage
4. Enable Authentication
5. Update configuration in `src/lib/firebase.ts`

## 🔧 Configuration

### Campus Locations
Update `src/data/campusLocations.ts` with your campus-specific:
- Building coordinates
- Department information
- Facility details

### Routing Rules
Modify `src/services/departmentRoutingService.ts` for:
- Custom department routing logic
- Escalation timeframes
- Priority assignments

## 📊 Key Features Comparison

| Feature | Status | Implementation |
|---------|--------|----------------|
| Ticket System | ✅ Complete | Full lifecycle with routing |
| Location Tracking | ✅ Complete | GPS + campus zone mapping |
| QR Navigation | ✅ Complete | Scanner + location mapping |
| AI Teacher | ✅ Complete | Syllabus-aware responses |
| Lecture Library | ✅ Complete | Upload + role-based access |
| Campus AI Assistant | ✅ Complete | Rule-based help system |
| Multi-Role Dashboards | ✅ Complete | All 12 roles implemented |
| Department Routing | ✅ Complete | Automatic assignment |
| Firebase Integration | ✅ Complete | Secure storage + auth |
| Escalation Workflows | ✅ Complete | Time-based triggers |

## 🎯 Platform Benefits

### For Students
- **Streamlined support** - Single platform for all campus needs
- **Transparent tracking** - Real-time ticket status updates
- **Academic assistance** - AI teacher for syllabus queries
- **Easy navigation** - QR codes for instant location info

### For Staff
- **Organized workflows** - Automatic ticket routing
- **Reduced workload** - AI handles repetitive queries
- **Better coordination** - Location-attached issue reports
- **Digital resources** - Centralized lecture management

### For Administration
- **Complete visibility** - System-wide monitoring
- **Accountability** - Full audit trails
- **Efficiency** - Automated processes
- **Scalability** - Cloud-based infrastructure

## 🔮 Future Enhancements

The platform architecture supports easy extension for:
- Smart ticket priority detection using ML
- Workload analytics and reporting
- Heat-map issue visualization
- SLA reminders and notification engine
- Response time benchmarking
- Cross-campus deployment support

## 📞 Support

For technical support or feature requests, use the Campus AI Assistant or submit a ticket through the platform.

---

**Campus Aid Buddy** - Transforming campus operations through intelligent automation and structured workflows.