# API Documentation

This document provides a comprehensive overview of the APIs available in the system, starting with the Admin block.

## Base URL
The base URL for all API endpoints is:
`https://your-domain.com/api`

## Authentication
All admin APIs require authentication using Laravel Sanctum. Include the Bearer token in the `Authorization` header.
`Authorization: Bearer <your_token>`

---

## Admin APIs

### 1. Language Management
Manage the languages supported by the system.

#### **Get All Languages**
- **Method:** `GET`
- **Path:** `/admin/languages`
- **Description:** Retrieve a list of all languages.
- **Query Parameters:**
    - `include_deleted` (optional, boolean): Show soft-deleted languages.
    - `status` (optional, integer): Filter by active (`1`) or inactive (`0`) status.
- **Response (200 OK):**
```json
{
    "success": true,
    "message": "Languages retrieved successfully",
    "total": 10,
    "data": [
        {
            "id": 1,
            "name_en": "English",
            "name_ar": "الإنجليزية",
            "status": 1,
            "created_at": "...",
            "updated_at": "...",
            "deleted_at": null
        }
    ]
}
```

#### **Create Language**
- **Method:** `POST`
- **Path:** `/admin/languages`
- **Description:** Create a new language.
- **Request Body:**
```json
{
    "name_en": "English",
    "name_ar": "الإنجليزية",
    "status": 1
}
```
- **Validation Rules:**
    - `name_en`: required, string, unique in languages.
    - `name_ar`: required, string, unique in languages.
    - `status`: optional, boolean (default: 1).

#### **Get Language Details**
- **Method:** `GET`
- **Path:** `/admin/languages/{id}`
- **Description:** Retrieve details of a specific language by ID.

#### **Update Language**
- **Method:** `PUT`
- **Path:** `/admin/languages/{id}`
- **Description:** Update an existing language.
- **Request Body:** (Fields are optional)
```json
{
    "name_en": "Updated Name",
    "name_ar": "اسم محدث",
    "status": 0
}
```

#### **Soft Delete Language**
- **Method:** `DELETE`
- **Path:** `/admin/languages/{id}`
- **Description:** Soft delete a language. Cannot delete if assigned to teachers.

#### **Hard Delete Language**
- **Method:** `DELETE`
- **Path:** `/admin/languages/{id}/force`
- **Description:** Permanently delete a language from the database.

#### **Restore Language**
- **Method:** `POST`
- **Path:** `/admin/languages/{id}/restore`
- **Description:** Restore a soft-deleted language.

---

### 2. Education Management

#### **2.1 Education Levels**
Manage the education levels in the system.

- **Get All Education Levels:** `GET /admin/education-levels`
    - Query Params: `status` (0|1), `include_deleted` (boolean)
- **Create Education Level:** `POST /admin/education-levels`
    - Body: `{ "name_en": "Level Name", "name_ar": "اسم المستوى", "description": "...", "status": 1 }`
- **Get Education Level Details:** `GET /admin/education-levels/{id}`
- **Update Education Level:** `PUT /admin/education-levels/{id}`
- **Soft Delete Education Level:** `DELETE /admin/education-levels/{id}`
- **Hard Delete Education Level:** `DELETE /admin/education-levels/{id}/force`
- **Restore Education Level:** `POST /admin/education-levels/{id}/restore`

#### **2.2 Classes**
Manage the classes within education levels.

- **Get All Classes:** `GET /admin/classes`
    - Query Params: `education_level_id`, `status`, `include_deleted`
- **Create Class:** `POST /admin/classes`
    - Body: `{ "name_en": "Class Name", "name_ar": "اسم الفصل", "education_level_id": 1, "status": 1 }`
- **Get Class Details:** `GET /admin/classes/{id}`
- **Update Class:** `PUT /admin/classes/{id}`
- **Soft Delete Class:** `DELETE /admin/classes/{id}`
- **Hard Delete Class:** `DELETE /admin/classes/{id}/force`
- **Restore Class:** `POST /admin/classes/{id}/restore`

#### **2.3 Subjects**
Manage the subjects within classes.

- **Get All Subjects:** `GET /admin/subjects`
    - Query Params: `class_id`, `education_level_id`, `service_id`, `status`, `include_deleted`
- **Create Subject:** `POST /admin/subjects`
    - Body: `{ "name_en": "Subject Name", "name_ar": "اسم المادة", "class_id": 1, "education_level_id": 1, "service_id": 1, "status": 1 }`
- **Get Subject Details:** `GET /admin/subjects/{id}`
- **Update Subject:** `PUT /admin/subjects/{id}`
- **Soft Delete Subject:** `DELETE /admin/subjects/{id}`
- **Hard Delete Subject:** `DELETE /admin/subjects/{id}/force`
- **Restore Subject:** `POST /admin/subjects/{id}/restore`

---

### 3. Course Management
Admin oversight of courses created by teachers.

- **Get All Courses:** `GET /admin/courses`
    - Query Params: `status`, `teacher_id`, `category_id`, `service_id`, `approval_status`, `page`, `per_page`, `search`
- **Get Course Details:** `GET /admin/courses/{id}`
- **Approve Course:** `PUT /admin/courses/{id}/approve`
- **Reject Course:** `PUT /admin/courses/{id}/reject`
    - Body: `{ "rejection_reason": "Reason for rejection" }`
- **Update Course Status:** `PUT /admin/courses/{id}/status`
    - Body: `{ "status": boolean }`
- **Toggle Featured Status:** `PUT /admin/courses/{id}/feature`
    - Body: `{ "is_featured": boolean }`
- **Delete Course:** `DELETE /admin/courses/{id}`
    - Condition: Cannot delete if it has student enrollments.
- **Get Pending Approval Courses:** `GET /admin/courses/pending-approval`

---

### 4. Dashboard / System
System health and overall statistics.

- **Get System Stats:** `GET /admin/stats`
    - Response: `{ "users": 100, "teachers": 20, "courses": 50, "bookings": 200 }`
- **System Health Check:** `GET /admin/health`
    - Response: `{ "database": "ok", "app": "production", "timestamp": "..." }`
- **Run Scheduler:** `POST /admin/run-scheduler` (Manual trigger for Laravel scheduler)
- **Clear Cache:** `POST /admin/clear-cache` (Clears application cache)

---

### 5. Users Management
Admin control over all users, including teachers and students.

- **Get All Users:** `GET /admin/users`
    - Query Params: `role_id`
- **Get Teacher List:** `GET /admin/teachers`
    - Specific endpoint for retrieving all teachers with their services.
- **Get User/Teacher Details:** `GET /admin/users/{id}` or `GET /admin/teachers/{id}`
- **Create User:** `POST /admin/users`
    - Body: `{ "first_name": "...", "email": "...", "password": "...", "role_id": ... }`
- **Update User:** `PUT /admin/users/{id}`
- **Delete User:** `DELETE /admin/users/{id}`
- **Reset User Password:** `PUT /admin/users/{id}/reset-password`
    - Generates and returns a new random password.
- **Verify Teacher:** `PUT /admin/users/{id}/verify-teacher`
    - Sets the teacher's profile as verified.
- **Suspend/Activate User:** 
    - `PUT /admin/users/{id}/suspend`
    - `PUT /admin/users/{id}/activate`

---

### 6. Bookings & Payments

#### **6.1 Bookings**
- **Get All Bookings:** `GET /admin/bookings`
    - Query Params: `status`
- **Get Booking Details:** `GET /admin/bookings/{id}`
- **Mark Booking as Paid:** `POST /admin/bookings/{id}/mark-paid`
    - Manually confirms a booking.
- **Refund Booking:** `POST /admin/bookings/{id}/refund`
    - Marks a booking as refunded.

#### **6.2 Payments**
- **Get All Payments:** `GET /admin/payments`
    - Query Params: `status`
- **Get Payment Details:** `GET /admin/payments/{id}`
- **Reconcile Payment:** `POST /admin/payments/{id}/reconcile`
    - Marks a payment as reconciled.

---

### 7. Disputes
Management of disputes between students and teachers.

- **Get All Disputes:** `GET /admin/disputes`
- **Get Dispute Details:** `GET /admin/disputes/{id}`
- **Resolve Dispute:** `POST /admin/disputes/{id}/resolve`
    - Body: `{ "resolution": "string", "amount": number, "notes": "string" }`

---

### 8. Support Tickets
Customer support management.

- **Get All Support Tickets:** `GET /admin/support-tickets`
    - Query Params: `status` (open, in_progress, resolved, closed), `per_page`, `sort_by`, `order`
- **Get Support Ticket Stats:** `GET /admin/support-tickets/stats`
- **Get Ticket Details:** `GET /admin/support-tickets/{id}`
- **Reply to Ticket:** `POST /admin/support-tickets/{id}/reply`
    - Body: `{ "message": "string" }`
- **Resolve Ticket:** `POST /admin/support-tickets/{id}/resolve`
    - Body: `{ "resolution_message": "string" }`
- **Update Ticket Status:** `PUT /admin/support-tickets/{id}/status`
    - Body: `{ "status": "string", "internal_note": "string" }`
- **Close Ticket:** `POST /admin/support-tickets/{id}/close`
- **Delete Ticket:** `DELETE /admin/support-tickets/{id}`
    - Permanently removes the ticket and its replies.

---

### 9. Institute Registration
Management of teacher-led institutes.

- **Get All Institutes:** `GET /admin/institutes`
    - Query Params: `status` (pending, approved, rejected), `per_page`
- **Get Institute Stats:** `GET /admin/institutes/stats`
- **Get Institute Details:** `GET /admin/institutes/{id}`
- **Approve Institute:** `POST /admin/institutes/{id}/approve`
    - Optional Body: `{ "commission_percentage": number }`
- **Reject Institute:** `POST /admin/institutes/{id}/reject`
    - Body: `{ "rejection_reason": "string" }`
- **Update Institute:** `PUT /admin/institutes/{id}`
- **Delete Institute:** `DELETE /admin/institutes/{id}`

---

### 10. Payouts
Managing teacher payouts.

- **Get All Payouts:** `GET /admin/payouts`
- **Create Payout Record:** `POST /admin/payouts`
    - Body: `{ "teacher_id": number, "amount": number, "currency": "string", "method": "string", "notes": "string" }`
- **Mark Payout as Sent:** `POST /admin/payouts/{id}/mark-sent`

---

### 11. Gallery
Managing the public gallery/media.

- **Get All Gallery Items:** `GET /admin/gallery`
- **Upload Gallery Item:** `POST /admin/gallery`
    - Body (multipart/form-data): `{ "file": image, "title": "string" }`
- **Delete Gallery Item:** `DELETE /admin/gallery/{id}`

---

### 12. System Tasks
Manual system triggers.

- **Run Scheduler:** `POST /admin/run-scheduler`
- **Clear Cache:** `POST /admin/clear-cache`
    - Clears application, config, and route caches.
    
