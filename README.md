
---

##  HNG Stage 2 Ticket Management App (Vue 3)

A full-featured **Ticket Management Web Application** built with **Vue 3 (Vite)**, **CSS**, and **LocalStorage**, developed as part of the **HNG 13 Frontend Stage 2 Task**.

This version replicates the **React implementation** with identical features, layout, and functionality — demonstrating consistency across frameworks.

---

## Overview
The app simulates a real-world ticketing system with:
- Authentication (Login/Signup)
- Protected routes (Dashboard, Tickets)
- Ticket CRUD (Create, Read, Update, Delete)
- Persistent sessions via LocalStorage
- Fully responsive, accessible design identical to the React version

---

## Features
### Landing Page
- Hero section with **wavy SVG background**
- Decorative circles and box-style feature sections
- Centered layout (max-width: 1440px)
- Buttons: “Login” and “Get Started”

### Authentication
- Login and Signup pages
- Validation for empty fields and invalid emails
- Error and success notifications
- Session key: `ticketapp_session`
- Redirect to Dashboard on valid login

### Dashboard
- Displays ticket stats (Total, Open, Closed)
- Navigation links to Tickets
- Logout clears session and redirects to Home

### Ticket Management
- Create, view, edit, delete tickets
- Real-time validation feedback
- Inline and toast-based alerts
- Color-coded ticket statuses:
  -  Open
  -  In Progress
  -  Closed

---

## Technologies Used
- **Vue 3 (Composition API)**
- **Vite**
- **Vue Router**
- **Vanilla CSS**
- **LocalStorage**

---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/xlisrael/hng13-stage2-ticketapp-vue.git
   cd hng13-stage2-ticketapp-vue
   npm run dev
