# 📌 Campus Aid Buddy — Smart Campus Support & Academic Assistance Platform

Campus Aid Buddy is a smart, role-based campus support system that integrates:

- **Student service request management**
- **Department-wise workflow routing**
- **Syllabus-aware AI Teacher assistance**
- **Digital lecture & video library**
- **QR-based campus navigation**
- **Location-attached ticket reporting**

The platform brings together students, tutors, faculty, non-teaching staff, HODs, wardens, maintenance, security, and administrators into one unified structured ecosystem.

This project follows a clean architecture approach with a separated backend service layer, ensuring modularity, scalability, and secure role-based access.

## 🚀 Key Features

### 🎫 Ticket-Based Campus Request & Issue Reporting

- Students & campus users can submit requests / complaints
- Department & category-based routing
- Auto-generated ticket ID & history log
- Status lifecycle:
  ```
  Submitted → In-Progress → Resolved → Closed → Escalated
  ```
- Role-controlled action permissions
- Transparent tracking & accountability

### 📍 Location-Attached Ticket Submission

- Captures GPS location only during submission
- Stores:
  - latitude / longitude
  - accuracy
  - timestamp
  - campus zone / mapped block (if configured)
- Prevents miscommunication about incident location
- Enables future heat-map insights

### 🧭 QR-Based Campus Navigation

- Each campus block / facility can have QR identity
- Scan → location details + navigation assistance
- Supports:
  - classrooms & labs
  - library
  - hostel blocks
  - admin & service facilities
- Optionally attaches scanned location to ticket

### 🎓 Syllabus-Aware AI Teacher (Hybrid Chat Mode)

- Teachers upload syllabus documents
- Content indexed and mapped by:
  - course
  - department
  - semester
  - subject
- Students ask academic questions
- AI responds:
  - ✔ syllabus-based explanations
  - ✔ context-aware replies
  - ✔ friendly conversational tone
  - ✔ fallback clarification prompts when ambiguous
- Helps reduce repeated doubt queries to faculty

### 🎥 Digital Lecture & Video Library

- Teachers upload recorded lecture videos
- Metadata mapped to:
  - department
  - course
  - semester
  - subject
  - topic / unit
- Students view mapped content from dashboard
- Secure storage access — no public links
- Supports learning continuity & revision access

### 🤖 Campus AI Assistant (Rule-Based)

- Campus-aware information guide
- Support routing hints
- Policy & help instructions
- FAQ-based structured replies
- Non-hallucinating & safety-aware

## 👥 Supported User Roles

The platform supports multiple campus stakeholders:

- **Students**
- **Teaching Staff**
- **Tutors**
- **Department Staff**
- **HOD**
- **Admin**
- **Hostel Warden**
- **Maintenance / Facility**
- **Security**
- **Transport Officer**
- **Lab Assistant**
- **Non-Teaching Staff**

Each role has a dedicated functional dashboard with role-specific actions and restricted visibility.

## 🧩 Architecture & Code Structure

This project uses a **backend-separated clean architecture**.

Backend logic is isolated from UI to ensure:
- ✔ modularity
- ✔ secure access abstraction
- ✔ easier scaling
- ✔ future microservice migration compatibility

### 🗂 Folder Structure (High-Level)

```
/backend
  /auth                 # User authentication and management
  /tickets              # Ticket operations and management
  /lectures             # Lecture upload and retrieval
  /syllabus             # Syllabus management
  /ai                   # AI service interactions
  /locations            # Campus location management
  /qr                   # QR code handling
  /notices              # Notice/announcement management
  firebase.ts           # Firebase configuration
  firestore.service.ts  # Generic Firestore operations
  storage.service.ts    # File storage operations
  routing.service.ts    # Ticket routing logic
  index.ts              # Main exports

/src (React Frontend UI)
  /components
    /dashboard          # Dashboard components
    /layout             # Layout components
    /tickets            # Ticket-related components
    /ui                 # Reusable UI components
  /contexts             # React contexts
  /hooks                # Custom hooks
  /lib                  # Utility libraries
  /pages                # Page components
  /services             # Frontend service wrappers
  /types                # TypeScript type definitions

/public                 # Static assets
  Campus_Aid_Buddyy_Logo_with_Open_Hand_Icon-removebg-preview.png
  11111.png
  new image .jpeg
  favicon.ico
```

**Frontend communicates only through backend service functions** — no direct Firebase calls from components.

## 🎨 Design System

The platform uses a modern color palette:
- **Primary**: Orange (`#ff8000`) - For buttons, highlights, and interactive elements
- **Secondary**: Sage Green (`#74aa95`) - For secondary elements and success states
- **Accent**: Black (`#000000`) - For text and high-contrast elements

## 🔒 Security & Access Control

- Strict role-based access enforcement
- Department-wise data isolation
- Students can access:
  - ✔ their tickets
  - ✔ mapped lectures
  - ✔ syllabus-based AI
- Teachers manage uploads & responses
- HOD & Admin receive workflow visibility
- Sensitive data never exposed publicly

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Firebase** for database and storage
- **Firestore** for document storage
- **Firebase Storage** for file uploads
- **Firebase Auth** for authentication

### Development Tools
- **ESLint** for code linting
- **TypeScript** for type safety
- **PostCSS** for CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campus-connect-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Update `backend/firebase.ts` with your Firebase configuration
   - Replace placeholder values with actual Firebase project credentials

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Demo Access
For testing purposes, you can use any email/password combination to login and explore the platform with different user roles.

## 🧠 Design Principles

This platform is designed to be:
- **Practical** for real-world campuses
- **Modular** & extensible
- **Scalable** across departments
- **Structured** & accountable
- **Student-centric** yet admin-efficient

No feature is conceptual — all modules support real workflows.

## 🌱 Future Enhancements (Architecture Ready)

- Ticket priority intelligence
- Issue heat-map analytics
- Response time metrics
- Notification & reminder engine
- Multi-campus rollout support
- AI-generated ticket summaries

These are supported by architecture without redesign.

## 🏆 Why This Platform Is Valuable

- ✔ Improves student service experience
- ✔ Reduces administrative workload
- ✔ Increases transparency & traceability
- ✔ Supports academic learning continuity
- ✔ Strengthens campus digital ecosystem

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨💻 Project Status

This project is under active enhancement.
New features are added while preserving:
- **Stability**
- **Clean architecture practices**
- **Backward compatibility**

---

**Built with ❤️ for better campus experiences**