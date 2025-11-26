# 📚 EduMaster - Online Course Platform

A comprehensive, modern online learning platform built with HTML, CSS, JavaScript, and Bootstrap 5. This platform provides a complete e-learning solution with features for students, instructors, and administrators.

## 🌟 Features

### 1️⃣ Landing / Home Page
- **Hero Banner** with search bar and featured categories
- **Popular Courses** section showcasing trending courses
- **Trending Instructors** display
- **Student Testimonials** section
- **Platform Features** highlighting key benefits (Learn Anywhere, Certificates, Lifetime Access)

### 2️⃣ Authentication Module
- **User Sign Up / Login** (Separate tabs for Students and Instructors)
- **Instructor Sign Up / Login**
- **Forgot Password** functionality
- **OTP Login** via phone number
- **Social Login** options (Google, Facebook)

### 3️⃣ User Dashboard (Students)
- **My Courses** - View enrolled courses with progress tracking
- **Wishlist** - Save favorite courses
- **Course Progress** - Track completion percentage
- **Certificates** - Download and share certificates
- **Watch History** - Recent course activities
- **Account Settings** - Manage profile information

### 4️⃣ Instructor Dashboard
- **Course Builder** - Create and manage courses
- **Upload Videos, Materials, Quizzes**
- **Course Earnings & Analytics** - Track revenue and statistics
- **Student Engagement Analytics** - Monitor student progress
- **Manage Announcements** - Send updates to students
- **Payment Withdrawal Request** - Request payouts

### 5️⃣ Course Module
- **Course Listings Page** with advanced filters
- **Category & Subcategory Filters**
- **Search & Sorting** functionality
- **Course Details Page** with:
  - Preview video
  - Detailed syllabus
  - Instructor information
  - Reviews & ratings
  - Course duration, level, language
  - Enroll/Buy button

### 6️⃣ Video Playback Module
- **HD Video Player** with standard controls
- **Lecture List Sidebar** - Navigate between lessons
- **Notes Section** - Take notes while learning
- **Auto-play Next Lesson** - Seamless learning experience
- **Speed Controls** - Adjust playback speed
- **Mobile Responsive Player**

### 7️⃣ Quiz & Assignment Module
- Multiple choice quizzes (integrated in course structure)
- Assignment submission capability
- Auto evaluation for MCQs
- Score tracking and progress monitoring

### 8️⃣ Payment & Checkout Module
- **Shopping Cart** - Add/remove courses
- **Checkout Page** with order summary
- **Apply Coupon** functionality
- **Payment Gateway Integration** (Razorpay, Stripe, PayPal ready)
- **Invoice Download** capability

### 9️⃣ Review & Rating Module
- Rate courses (1-5 stars)
- Write detailed reviews
- Like/dislike helpful reviews
- Review moderation

### 🔟 Admin Panel
- **Manage Users** (Students & Instructors)
- **Course Approval System** - Review and approve courses
- **Manage Categories & Subcategories**
- **Payment Management** - Track all transactions
- **Reports & Analytics Dashboard**
- **Coupon Management** - Create and manage discount codes
- **Homepage Content Manager**

### 1️⃣1️⃣ CMS Pages
- **About Us** - Platform information
- **Contact Us** - Contact form and information
- **FAQ** - Frequently asked questions
- **Privacy Policy** - Data protection information
- **Terms & Conditions** - Legal terms
- **Refund Policy** - Refund guidelines

### 1️⃣2️⃣ Notification Module
- **Email Notifications** (ready for integration)
- **In-app Notifications** - Toast notifications system
- **Course Completion Alerts**
- **Instructor Announcements**

### 1️⃣3️⃣ Support Module
- **Contact Form** - Submit support tickets
- **Help Center** - FAQ and articles
- **Live Chat** integration ready

## 📁 Project Structure

```
EduMaster/
├── index.html              # Landing page
├── login.html              # Login page
├── signup.html             # Sign up page
├── forgot-password.html    # Password recovery
├── otp-login.html          # OTP authentication
├── courses.html            # Course listings
├── course-detail.html      # Individual course page
├── course-player.html      # Video player
├── student-dashboard.html  # Student dashboard
├── instructor-dashboard.html # Instructor dashboard
├── admin-dashboard.html    # Admin panel
├── cart.html               # Shopping cart
├── checkout.html           # Checkout page
├── about.html              # About page
├── contact.html            # Contact page
├── faq.html                # FAQ page
├── privacy.html            # Privacy policy
├── terms.html              # Terms & conditions
├── refund.html             # Refund policy
├── css/
│   ├── style.css           # Global styles
│   ├── home.css            # Home page styles
│   ├── auth.css            # Authentication styles
│   ├── courses.css         # Course listings styles
│   ├── course-detail.css   # Course detail styles
│   ├── dashboard.css       # Dashboard styles
│   └── player.css          # Video player styles
├── js/
│   ├── app.js              # Global app utilities
│   ├── home.js             # Home page functionality
│   ├── auth.js             # Authentication logic
│   ├── courses.js          # Course listings logic
│   ├── course-detail.js    # Course detail functionality
│   ├── student-dashboard.js # Student dashboard logic
│   ├── instructor-dashboard.js # Instructor dashboard logic
│   ├── admin-dashboard.js  # Admin panel logic
│   ├── cart.js             # Shopping cart functionality
│   ├── checkout.js         # Checkout process
│   └── player.js           # Video player controls
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. **Clone or download** this repository
2. **Open** `index.html` in your web browser
3. **Or**, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Access** the application at `http://localhost:8000`

## 🎨 Design Features

- **Modern UI/UX** - Clean, intuitive interface
- **Responsive Design** - Works on all devices (desktop, tablet, mobile)
- **Bootstrap 5** - Latest Bootstrap framework
- **Custom Styling** - Unique design with gradient accents
- **Smooth Animations** - Enhanced user experience
- **Accessibility** - WCAG compliant design

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript (ES6+)** - Interactive functionality
- **Bootstrap 5.3.2** - UI framework
- **Bootstrap Icons** - Icon library
- **Google Fonts (Poppins)** - Typography

## 📱 Key Functionalities

### Local Storage
The application uses browser `localStorage` for:
- Shopping cart persistence
- Wishlist management
- User preferences
- Watch progress tracking

### Responsive Navigation
- Mobile-friendly hamburger menu
- Fixed navigation bar
- Dropdown menus for categories

### Interactive Features
- Real-time search and filtering
- Dynamic course loading
- Progress tracking
- Rating and review system
- Notification system (toast messages)

## 🔐 Demo Credentials

Since this is a front-end demo, authentication is simulated. You can:
- Create any email/password combination for testing
- All data persists in localStorage
- No backend connection required

## 🎯 Future Enhancements

To make this a full-stack application, you would need:
- **Backend API** (Node.js, Python, PHP, etc.)
- **Database** (MySQL, MongoDB, PostgreSQL)
- **Authentication Service** (JWT, OAuth)
- **Payment Gateway Integration** (Stripe, PayPal, Razorpay)
- **Video Hosting** (AWS S3, CloudFront, or specialized services)
- **Email Service** (SendGrid, Mailgun)

## 📝 Customization

### Colors
Edit `css/style.css` to change the color scheme:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... */
}
```

### Content
- Update course data in `js/home.js` and `js/courses.js`
- Modify testimonials in `index.html`
- Change platform features as needed

## 🤝 Contributing

This is a demo project. Feel free to:
- Fork the repository
- Add new features
- Improve the design
- Fix bugs
- Enhance functionality

## 📄 License

This project is open source and available for educational and commercial use.

## 🙏 Acknowledgments

- Bootstrap team for the amazing framework
- Unsplash for placeholder images
- UI Avatars for profile picture generation
- All open-source contributors

## 📞 Support

For questions or support:
- Email: support@edumaster.com
- Contact form: [contact.html](contact.html)

---

**Built with ❤️ using HTML, CSS, JavaScript, and Bootstrap 5**

