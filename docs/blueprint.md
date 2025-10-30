# **App Name**: Trackera POS

## Core Features:

- Restaurant & Branch Selection: Allows users to select a restaurant (defaulting to 'Shivraj Restaurant') and then a specific branch for login.
- Manager Authentication: Authenticates managers based on their unique Manager ID stored in Firestore, redirecting them to the Manager Dashboard upon successful validation.
- Staff Authentication: Authenticates staff members based on their unique Staff ID stored in Firestore, redirecting them to the Staff Dashboard upon successful validation.
- Menu Management: Enables managers to add, update, and manage menu items, including categories, dishes, and prices, with a default menu of Starters, Main Course, Desserts, and Beverages.
- Order Management: Allows staff to book tables, place customer orders (including multiple items per order), and modify or cancel orders before serving, with data saved for manager analytics and daily summaries for staff.
- Revenue and Analytics Dashboard: Displays total revenue across all branches for managers and branch-specific analytics (daily, weekly, monthly) using data stored in Firestore.
- Staff Management: Provides functionality for managers to add and manage staff members, assigning unique staff IDs for login and access to the system, updating Firestore accordingly.

## Style Guidelines:

- Primary color: Rich Blue (#2563EB) for buttons, links, and highlights.
- Secondary color: Dark Charcoal (#111827) for sidebar and navbar.
- Accent color: Emerald Green (#10B981) for revenue and success badges.
- Background color: Cool Gray (#F3F4F6) for page background.
- Card Background color: White (#FFFFFF) for cards and modals.
- Text Primary color: (#1E293B) for Headings.
- Text Secondary color: (#6B7280) for subtext and placeholders.
- Error color: (#DC2626) for error alerts.
- Warning color: (#F59E0B) for warnings or pending orders.
- Body and headline font: 'PT Sans' for a balance of modern aesthetics and readability. Note: currently only Google Fonts are supported.
- Adopts a POS-style UI similar to Petpooja, featuring a sidebar for managers (Dashboard, Branches, Menu, Revenue, Staff) and a button grid for staff (Add Order, Book Table, View Orders). The layout is designed to be responsive for tablet/desktop use.
- Utilizes clear and intuitive icons to represent different functions and menu items, enhancing the user experience.
- Subtle animations for order confirmations and menu transitions to provide a smooth and engaging user experience.